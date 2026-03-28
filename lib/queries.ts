import { supabase } from "./supabase";
import type {
  PersonalInfo,
  Project,
  ExperienceItem,
  SkillDomain,
  Education,
  Certification,
  Testimonial,
} from "./types";

export async function getPersonalInfo(): Promise<PersonalInfo> {
  const { data, error } = await supabase
    .from("personal_info")
    .select("*")
    .single();
  if (error) throw new Error(`Failed to fetch personal_info: ${error.message}`);
  return data as PersonalInfo;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`Failed to fetch projects: ${error.message}`);
  return data as Project[];
}

export async function getExperience(): Promise<ExperienceItem[]> {
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`Failed to fetch experience: ${error.message}`);
  return data as ExperienceItem[];
}

export async function getSkills(): Promise<SkillDomain[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`Failed to fetch skills: ${error.message}`);
  return data as SkillDomain[];
}

export async function getEducation(): Promise<Education> {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .single();
  if (error) throw new Error(`Failed to fetch education: ${error.message}`);
  return data as Education;
}

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`Failed to fetch certifications: ${error.message}`);
  return data as Certification[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("order", { ascending: true });
  if (error) throw new Error(`Failed to fetch testimonials: ${error.message}`);
  return data as Testimonial[];
}
