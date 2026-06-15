import type { LucideIcon } from "lucide-react";

export interface TextItem {
  text: string;
}

export interface IncludedService {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface DocumentRequirement {
  applicantType: string;
  icon: LucideIcon;
  documents: string[];
}

export interface TimelineMetric {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface WhyChooseFeature {
  title: string;
  description?: string;
  icon: LucideIcon;
}

export interface ServiceTestimonial {
  name: string;
  designation: string;
  content: string;
  avatar: string;
}
