export interface Principle {
  index: string;
  title: string;
  statement: string;
}

/** The "How I Think" engineering philosophy. */
export const principles: Principle[] = [
  {
    index: '01',
    title: 'Simplicity',
    statement: 'Complex systems should feel simple to the people using them.',
  },
  {
    index: '02',
    title: 'Scale',
    statement: "Design for today's requirements while leaving room for tomorrow.",
  },
  {
    index: '03',
    title: 'Ownership',
    statement: 'Good engineering means caring about the system beyond the code.',
  },
  {
    index: '04',
    title: 'Curiosity',
    statement: 'The best engineers never stop learning.',
  },
];
