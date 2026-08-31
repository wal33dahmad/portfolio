import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Storage writes bypass RLS only with the service_role key.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET = "project-images";

async function upload() {
  const dir = path.resolve(process.cwd(), "screenshots");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webp"));

  if (files.length === 0) {
    console.error(`No .webp files in ${dir} — run "npm run convert-image" first.`);
    process.exit(1);
  }

  for (const file of files) {
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(file, fs.readFileSync(path.join(dir, file)), {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) {
      console.error(`  ✗ ${file} — ${error.message}`);
      continue;
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(file);
    console.log(`✓ ${file}`);
    console.log(`  ${data.publicUrl}`);
  }
}

upload().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
