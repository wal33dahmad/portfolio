import sharp from "sharp";
import path from "path";
import fs from "fs";

const PROFILES = {
  mobile: { width: 560, height: 1248, position: "center" as const },
  // For screens mounted horizontally — a portrait crop would keep only ~24%
  // of a landscape source's width.
  "mobile-landscape": { width: 1248, height: 560, position: "center" as const },
  web: { width: 1000, height: 625, position: "top" as const },
};

type ProfileName = keyof typeof PROFILES;

function parseArgs(): { files: string[]; type: ProfileName } {
  const args = process.argv.slice(2);
  const typeIndex = args.indexOf("--type");
  const names = Object.keys(PROFILES) as ProfileName[];

  if (typeIndex === -1) {
    console.error(`Usage: tsx scripts/convert-images.ts --file <path> [--file <path> ...] --type <${names.join("|")}>`);
    process.exit(1);
  }

  const type = args[typeIndex + 1] as ProfileName;
  if (!names.includes(type)) {
    console.error(`Error: --type must be one of ${names.join(", ")}, got "${type}"`);
    process.exit(1);
  }

  // Collect all --file values
  const files: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file" && args[i + 1]) {
      files.push(args[i + 1]);
    }
  }

  if (files.length === 0) {
    console.error("Error: at least one --file is required");
    process.exit(1);
  }

  return { files, type };
}

async function convertImage(file: string, type: ProfileName) {
  const inputPath = path.isAbsolute(file)
    ? file
    : path.resolve("public/images/projects", file);

  if (!fs.existsSync(inputPath)) {
    console.error(`  ✗ not found — ${inputPath}`);
    return;
  }

  const profile = PROFILES[type];
  const basename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(path.dirname(inputPath), `${basename}.webp`);
  const inputSize = fs.statSync(inputPath).size;

  await sharp(inputPath)
    .resize(profile.width, profile.height, { fit: "cover", position: profile.position })
    .webp({ quality: 82 })
    .toFile(outputPath);

  const outputSize = fs.statSync(outputPath).size;
  const savings = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

  console.log(`✓ ${path.basename(outputPath)}`);
  console.log(`  ${profile.width}×${profile.height} WebP`);
  console.log(`  ${(inputSize / 1024).toFixed(0)} KB → ${(outputSize / 1024).toFixed(0)} KB  (-${savings}%)`);
}

async function main() {
  const { files, type } = parseArgs();
  for (const file of files) {
    await convertImage(file, type);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
