/**
 * Social + contact links.
 */
export const socialLinks = {
  email: 'adway.ujjwal@outlook.com',
  linkedin: 'https://www.linkedin.com/in/adwayujjwal',
  github: 'https://github.com/adwayujjwal', // TODO: confirm your GitHub handle
  leetcode: 'https://leetcode.com/u/adwayujwal/',
  topmate: 'https://topmate.io/adwayujjwal',
  website: 'https://adwayujjwal.netlify.app',
  resume: '/adway-resume.pdf', // TODO: drop resume into /public
} as const;

export const CONTACT_EMAIL_HREF = `mailto:${socialLinks.email}`;
