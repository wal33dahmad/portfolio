/* Brand constants — hero-only copy that has no column in `personal_info`.
   Kept in code rather than the DB: the `get_page_data` RPC lives only in the
   hosted Supabase project, so adding columns there is unverifiable from here. */

export const HERO_TECH = [
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "TypeScript",
  "AI/LLMs",
] as const;

export const PROOF_POINTS = ["5+ years", "150K+ users", "50K+ fleets"] as const;
