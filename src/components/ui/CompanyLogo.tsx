import { useEffect, useState } from 'react';
import { asset } from '@/lib/asset';

interface CompanyLogoProps {
  name: string;
  initials: string;
  brandColor: string;
  logo?: string;
  size?: number;
}

/**
 * Company mark shown next to a role. Probes for a bundled logo file and renders
 * it on a light chip when present; otherwise a branded monogram badge. The probe
 * (HEAD request) means no broken-image requests when the file is absent.
 * Decorative: the company name is always adjacent, so it's aria-hidden.
 */
export default function CompanyLogo({
  name,
  initials,
  brandColor,
  logo,
  size = 46,
}: CompanyLogoProps) {
  const [ok, setOk] = useState(false);
  const src = logo ? asset(logo) : undefined;

  useEffect(() => {
    if (!src) {
      setOk(false);
      return;
    }
    let alive = true;
    fetch(src, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || '';
        const valid = res.ok && !type.includes('text/html');
        if (alive) setOk(valid);
      })
      .catch(() => alive && setOk(false));
    return () => {
      alive = false;
    };
  }, [src]);

  return (
    <span
      aria-hidden
      title={name}
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10"
      style={{ width: size, height: size, background: ok ? '#ffffff' : '#0f1116' }}
    >
      {ok && src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain p-2"
          onError={() => setOk(false)}
        />
      ) : (
        <span
          className="font-display font-bold leading-none"
          style={{ color: brandColor, fontSize: initials.length > 1 ? size * 0.3 : size * 0.42 }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}
