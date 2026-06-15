import {
  FileText,
  UserCircle,
  Laptop,
  Briefcase,
  Building2,
  ShieldCheck,
  PencilLine,
  Inbox,
  BadgeCheck,
  IdCard,
  User,
  Users,
  Factory,
  Send,
  Clock,
  Zap,
  UserCheck,
  Lock,
  Headphones,
} from "lucide-react";
import type {
  TextItem,
  IncludedService,
  ProcessStep,
  DocumentRequirement,
  TimelineMetric,
  WhyChooseFeature,
  ServiceTestimonial,
} from "./types";

export const solutionIntro =
  "We simplify the entire income tax registration process so you can focus on your business while we handle FBR compliance.";

export const commonProblems: TextItem[] = [
  { text: "Confusing FBR registration process" },
  { text: "NTN application delays" },
  { text: "Incorrect or incomplete information" },
  { text: "Lack of expert guidance" },
  { text: "Unnecessary visits to FBR offices" },
];

export const solutions: TextItem[] = [
  { text: "Expert guidance at every step" },
  { text: "Accurate documentation & submission" },
  { text: "Fast processing and follow-ups" },
  { text: "100% compliance with FBR requirements" },
];

export const includedServices: IncludedService[] = [
  {
    title: "NTN Registration",
    description:
      "Complete NTN registration with FBR for individuals and businesses.",
    icon: FileText,
  },
  {
    title: "FBR Profile Creation",
    description:
      "Professional setup of your FBR online profile and credentials.",
    icon: UserCircle,
  },
  {
    title: "Freelancer Tax Registration",
    description:
      "Specialized registration support for freelancers and professionals.",
    icon: Laptop,
  },
  {
    title: "Salaried Individual Registration",
    description:
      "Hassle-free income tax registration for salaried employees.",
    icon: Briefcase,
  },
  {
    title: "Business Tax Registration",
    description:
      "Full business and company tax registration with FBR compliance.",
    icon: Building2,
  },
  {
    title: "Taxpayer Status Activation",
    description:
      "Activation of active taxpayer status for maximum tax benefits.",
    icon: ShieldCheck,
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Share Your Details",
    description:
      "Provide your CNIC, contact details, and business information securely.",
    icon: PencilLine,
  },
  {
    step: 2,
    title: "We Prepare Your Application",
    description:
      "Our experts prepare and review your complete FBR registration application.",
    icon: Inbox,
  },
  {
    step: 3,
    title: "FBR Verification & Approval",
    description:
      "We submit your application and follow up with FBR until approval.",
    icon: ShieldCheck,
  },
  {
    step: 4,
    title: "Receive Your NTN",
    description:
      "Get your NTN certificate and active taxpayer status confirmation.",
    icon: IdCard,
  },
];

export const documentRequirements: DocumentRequirement[] = [
  {
    applicantType: "Individual (Sole Proprietor)",
    icon: User,
    documents: [
      "CNIC Copy",
      "Active Mobile Number",
      "Email Address",
      "Residential Address Proof",
    ],
  },
  {
    applicantType: "Freelancer / Professional",
    icon: Users,
    documents: [
      "CNIC Copy",
      "Bank Account Details / Proof",
      "Email Address",
      "Freelance Work Proof (Optional)",
    ],
  },
  {
    applicantType: "Business / Company",
    icon: Factory,
    documents: [
      "CNIC of Owners/Directors",
      "Business Name & Nature",
      "Business Address Proof",
      "Incorporation Documents",
      "Bank Account Details",
    ],
  },
];

export const timelineMetrics: TimelineMetric[] = [
  {
    label: "Application Submission",
    value: "Same Day",
    icon: Send,
  },
  {
    label: "FBR Processing",
    value: "1 - 3 Working Days",
    icon: Clock,
  },
  {
    label: "NTN Issuance",
    value: "After Approval",
    icon: ShieldCheck,
  },
];

export const fastProcessingText =
  "Fast Processing Available. We ensure quick submission and timely follow-ups.";

export const whyChooseFeatures: WhyChooseFeature[] = [
  {
    title: "Experienced Tax Consultants",
    description: "Seasoned professionals with deep FBR knowledge.",
    icon: UserCheck,
  },
  {
    title: "100% FBR Compliance",
    description: "Every submission meets current FBR requirements.",
    icon: ShieldCheck,
  },
  {
    title: "Quick Processing",
    description: "Fast turnaround with proactive follow-ups.",
    icon: Zap,
  },
  {
    title: "Support for Freelancers & Businesses",
    description: "Tailored solutions for every taxpayer type.",
    icon: Users,
  },
  {
    title: "Secure Documentation",
    description: "Your data is handled with complete confidentiality.",
    icon: Lock,
  },
  {
    title: "Dedicated Client Support",
    description: "Personal assistance from start to NTN issuance.",
    icon: Headphones,
  },
];

export const serviceTestimonials: ServiceTestimonial[] = [
  {
    name: "Muhammad Bilal",
    designation: "Freelancer",
    content:
      "Navigate Business made my NTN registration incredibly easy. Their team handled everything professionally and I received my NTN within days.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Sana Farooq",
    designation: "Business Owner",
    content:
      "Excellent service! They guided me through the entire FBR registration process. Highly recommended for anyone needing tax registration in Pakistan.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Adeel Khan",
    designation: "Salaried Professional",
    content:
      "Professional, fast, and reliable. I was struggling with FBR registration on my own until I found Navigate Business. Worth every penny.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Fatima Ahmed",
    designation: "Freelancer",
    content:
      "As a freelancer, I was always confused about taxes. This team simplified everything and got my registration done without any hassle.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Usman Choudhry",
    designation: "Small Business Owner",
    content:
      "Professional, efficient, and incredibly helpful. Highly recommended for all tax-related registration needs in Pakistan.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Ali Raza",
    designation: "Accountant",
    content:
      "Outstanding service! They made the entire tax filing and registration process seamless and stress-free for my clients.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  },
];
