import { Mail, Linkedin, Github, Code2, CalendarClock } from 'lucide-react';
import { socialLinks, CONTACT_EMAIL_HREF } from '@/data/socialLinks';

const links = [
  { label: 'Book a 1:1', href: socialLinks.topmate, icon: CalendarClock, external: true },
  { label: 'GitHub', href: socialLinks.github, icon: Github, external: true },
  { label: 'LeetCode', href: socialLinks.leetcode, icon: Code2, external: true },
  { label: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin, external: true },
  { label: 'Email', href: CONTACT_EMAIL_HREF, icon: Mail, external: false },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] py-14">
      <div className="container-editorial">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-semibold tracking-editorial text-chalk">
                ADWAY
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
            <p className="mt-3 text-sm text-chalk-muted">Senior Software Engineer · Walmart</p>

            {/* Status */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-chalk-muted">
                Available for interesting conversations
              </span>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="flex flex-col gap-3 md:items-end">
            {links.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                data-cursor="open"
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="group inline-flex items-center gap-2 text-sm text-chalk-muted transition-colors hover:text-chalk"
              >
                <Icon size={15} className="opacity-60 transition-opacity group-hover:opacity-100" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.05] pt-6 text-xs text-chalk-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Adway. All rights reserved.</span>
          <span>Designed &amp; built with intent.</span>
        </div>
      </div>
    </footer>
  );
}
