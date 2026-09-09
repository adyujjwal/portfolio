export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  current?: boolean;
  /** One-line positioning statement. */
  summary: string;
  /** Bulleted themes / responsibilities. Keep factual, no invented metrics. */
  highlights: string[];
  /** Technical keywords that animate in. */
  keywords: string[];
  /** Optional logo in /public/logos; falls back to a branded monogram. */
  logo?: string;
  /** Brand color for the monogram fallback + accents. */
  brandColor: string;
  /** Monogram initials for the fallback badge. */
  initials: string;
}

/**
 * Work history. Edit freely; the timeline UI is data-driven.
 * Placeholders are marked with TODO where exact details go later.
 */
export const experience: ExperienceEntry[] = [
  {
    company: 'Walmart',
    role: 'Senior Software Engineer · Catalog',
    period: '2026 - Present',
    location: 'Bengaluru, India',
    current: true,
    logo: '/logos/walmart-spark.svg',
    brandColor: '#0071ce',
    initials: 'W',
    summary:
      'Joining Walmart’s Catalog team to build large-scale, high-throughput systems that power product data across one of the world’s largest retailers.',
    highlights: [
      'Engineering catalog systems that serve product data at massive scale and traffic.',
      'Focused on distributed systems, reliability, performance and clean API design.',
      'Bringing full-stack and AI/LLM experience to catalog data and automation.',
    ],
    keywords: [
      'Java',
      'React',
      'Node.js',
      'Microservices',
      'Cloud Architecture',
      'GCP',
      'Azure',
      'NoSQL',
      'RDBMS',
      'CI/CD',
      'Catalog',
      'Distributed Systems',
    ],
  },
  {
    company: 'SAP',
    role: 'Software Developer 2 · SAP Concur',
    period: '2021 - 2026',
    location: 'Bengaluru, India',
    logo: '/logos/sap.jpeg',
    brandColor: '#0a6ed1',
    initials: 'SAP',
    summary:
      'Grew from Associate to Software Developer 2 on SAP Concur, shipping AI-powered, distributed systems for enterprise spend management at global scale.',
    highlights: [
      'Built GenAI inference pipelines on SAP AI Core with Gemini 2.5 Flash, with multi-model fallback and structured-output validation for invoice OCR, expense classification and policy extraction.',
      'Delivered end-to-end virtual card issuance integrating Mastercard & Amex APIs, with lifecycle management and automatic deactivation.',
      'Developed an event-driven invoice capture platform processing 1M+ invoices daily across US, EU and APJ datacenters using AWS SQS, S3 and DynamoDB.',
      'Migrated the Concur Invoice UI from Ext JS to React/Redux and backend to Spring Boot microservices, for 40% faster initial load and 30% better system performance.',
    ],
    keywords: [
      'Java',
      'Spring Boot',
      'React',
      'GenAI',
      'AWS',
      'Microservices',
      'Redis',
      'Distributed Systems',
    ],
  },
  {
    company: 'Enquero',
    role: 'Software Engineer',
    period: '2020 - 2021',
    location: 'Bengaluru, India',
    logo: '/logos/enquero-logo.png',
    brandColor: '#12a594',
    initials: 'E',
    summary:
      'Built partner-onboarding platforms end to end, with responsive Angular UIs backed by Spring Boot services and third-party integrations.',
    highlights: [
      'Developed modular Angular components for onboarding, document submission and real-time progress monitoring.',
      'Built Spring Boot services for partner data management, validations and workflow orchestration.',
      'Integrated Cisco internal systems and DocuSign to automate compliance workflows, with GDPR-compliant, role-based dashboards.',
    ],
    keywords: ['Angular', 'Spring Boot', 'Workflows', 'DocuSign', 'GDPR'],
  },
  {
    company: 'Gotisheel Technologies',
    role: 'Android Developer Intern',
    period: '2019',
    location: 'Bengaluru, India',
    logo: '/logos/gotisheel_logo.jpeg',
    brandColor: '#7c5cff',
    initials: 'G',
    summary:
      'Designed and built EzRoadTrips, an Android travel app for planning road trips with interactive maps and live cab booking.',
    highlights: [
      'Implemented the EzRoadTrips Android UI in Java and XML for intuitive trip planning.',
      'Integrated itinerary / route-planning APIs and Mapbox for interactive route visualization.',
      'Built a live cab seat-booking system backed by Firebase Realtime Database for real-time, multi-user updates.',
    ],
    keywords: ['Android', 'Java', 'Mapbox', 'Firebase', 'Maps'],
  },
];
