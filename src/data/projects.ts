export interface Project {
  index: string; // e.g. "01"
  name: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  /** Accent used for the project's ambient lighting/visual. */
  tint: string;
  /** Optional project image/screenshot shown in the visual panel. */
  image?: string;
  github?: string; // TODO: replace placeholders
  demo?: string;
}

/**
 * Selected work. Fully data-driven; the showcase layout, hover states and
 * alternating composition all read from this array. Replace the placeholder
 * copy and links with real project details.
 */
export const projects: Project[] = [
  {
    index: '01',
    name: 'MockOffer',
    category: 'AI · Full-Stack',
    description:
      'An AI-powered mock coding interview platform to practice company-specific questions from Google, Meta, and Amazon, with instant feedback on complexity, correctness, and code quality.',
    problem:
      'Interview prep is scattered, and generic practice questions rarely reflect how specific companies actually evaluate candidates.',
    solution:
      'A Monaco-based code editor with company-tagged problem sets and an AI reviewer that grades solutions on time and space complexity, correctness, and code quality in real time.',
    impact:
      'One place to practice targeted interview questions and get instant, actionable feedback on every submission.',
    stack: ['TypeScript', 'React', 'Monaco Editor', 'AI Feedback', 'Node.js'],
    tint: '#0a75e0',
    image: '/logos/mock_offer.gif',
    github: 'https://github.com/adyujjwal/MockOffer',
    demo: 'https://mockoffer.live',
  },
  {
    index: '02',
    name: 'WalkLens',
    category: 'AR · Computer Vision',
    description:
      'An augmented reality platform that turns a simple QR scan into interactive product walkthroughs and support material.',
    problem:
      'Product walkthroughs and support content are hard to reach at the exact moment users need them, standing in front of the product.',
    solution:
      'A QR-driven AR experience that overlays contextual guides and support material onto real products, letting users learn by pointing their camera.',
    impact:
      'Faster, self-serve product onboarding and support without digging through manuals.',
    stack: ['Python', 'Augmented Reality', 'QR', 'Computer Vision'],
    tint: '#2a8bf2',
    image: '/logos/walk_lens.gif',
    github: 'https://github.com/adyujjwal/WalkLens',
  },
  {
    index: '03',
    name: 'Virtra',
    category: 'Metaverse · Web',
    description:
      'A metaverse hotel booking solution that lets guests explore and reserve rooms inside an immersive virtual environment.',
    problem:
      'Traditional hotel booking is flat and text-heavy, so guests cannot get a real feel for a space before they book.',
    solution:
      'An interactive metaverse where users walk through virtual hotels and book rooms directly from the immersive 3D experience.',
    impact:
      'A more immersive way to preview and book stays before ever arriving.',
    stack: ['JavaScript', 'Metaverse', 'WebGL', '3D'],
    tint: '#0a75e0',
    image: '/logos/virtra.gif',
    github: 'https://github.com/adyujjwal/Virtra',
  },
];
