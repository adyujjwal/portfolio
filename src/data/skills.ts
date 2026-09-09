export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

/**
 * Skills grouped by category. Rendered as an interactive constellation;
 * nodes are laid out and connected by category. Edit freely.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: ['React', 'Redux', 'Angular', 'Android'],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: ['Spring Boot', 'Node.js', 'Microservices', 'REST APIs', 'Distributed Systems'],
  },
  {
    id: 'cloud',
    label: 'Cloud & Data',
    skills: ['AWS', 'Redis', 'DynamoDB', 'Docker', 'CI/CD'],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    skills: ['LLM Engineering', 'RAG', 'Agentic AI', 'LangGraph'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    skills: ['System Design', 'Scalability', 'Performance', 'Architecture'],
  },
];

/** Flat list with category reference; convenient for the network graph. */
export interface SkillNode {
  name: string;
  category: string;
  categoryLabel: string;
}

export const skillNodes: SkillNode[] = skillCategories.flatMap((c) =>
  c.skills.map((name) => ({ name, category: c.id, categoryLabel: c.label })),
);
