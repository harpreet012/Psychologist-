export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  whoItMayHelp: string[];
  whatToExpect: string[];
  longDescription: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Mood {
  id: string;
  emoji: string;
  label: string;
  message: string;
  practice: string;
  href: string;
  linkLabel: string;
}

export interface TrustPoint {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
