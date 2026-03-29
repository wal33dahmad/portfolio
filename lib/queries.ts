import { cache } from "react";
import { getSupabaseClient } from "./supabase";
import type {
  PersonalInfo,
  Project,
  ExperienceItem,
  SkillDomain,
  Education,
  Certification,
  Testimonial,
} from "./types";

export interface PageData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  skillDomains: SkillDomain[];
  education: Education;
  certifications: Certification[];
  testimonials: Testimonial[];
}

/** Single RPC call — all non-project page data. Cached per request. */
export const getPageData = cache(async (): Promise<PageData> => {
  const { data, error } = await getSupabaseClient().rpc("get_page_data");
  if (error) throw new Error(`get_page_data: ${error.message}`);
  return data as PageData;
});

/** Projects fetched separately so they stream independently. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const { data, error } = await getSupabaseClient()
    .from("projects")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`projects: ${error.message}`);
  return data as Project[];
});
