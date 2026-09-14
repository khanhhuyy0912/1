export type Language = 'vi' | 'en';

export interface Project {
  id: string;
  slug: string;
  title: {
    vi: string;
    en: string;
  };
  subtitle: {
    vi: string;
    en: string;
  };
  category: 'fullstack' | 'cloud' | 'frontend' | 'ai';
  year: string;
  featured: boolean;
  thumbnail: string;
  gallery: string[];
  overview: {
    vi: string;
    en: string;
  };
  problem: {
    vi: string;
    en: string;
  };
  solution: {
    vi: string;
    en: string;
  };
  myRole: {
    vi: string;
    en: string;
  };
  results: {
    metric: string;
    label: {
      vi: string;
      en: string;
    };
  }[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  metricsSummary?: string;
}

export interface SkillCategory {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 to 100
    experience: string;
    description: {
      vi: string;
      en: string;
    };
    icon?: string;
  }[];
}

export interface Experience {
  id: string;
  role: {
    vi: string;
    en: string;
  };
  company: string;
  location: string;
  period: string;
  type: 'full-time' | 'contract';
  description: {
    vi: string;
    en: string;
  };
  achievements: {
    vi: string[];
    en: string[];
  };
  techStack: string[];
}

export interface Education {
  id: string;
  degree: {
    vi: string;
    en: string;
  };
  institution: string;
  period: string;
  details: {
    vi: string;
    en: string;
  };
  gpa?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    vi: string;
    en: string;
  };
  summary: {
    vi: string;
    en: string;
  };
  publishedAt: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  content: {
    vi: {
      intro: string;
      sections: {
        heading: string;
        body: string;
        codeSnippet?: {
          language: string;
          code: string;
        };
      }[];
      conclusion: string;
    };
    en: {
      intro: string;
      sections: {
        heading: string;
        body: string;
        codeSnippet?: {
          language: string;
          code: string;
        };
      }[];
      conclusion: string;
    };
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: {
    vi: string;
    en: string;
  };
  linkedin?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
