import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';
import { EASE } from '@/lib/constants';

interface DiagramNode {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  accent?: boolean;
}

const W = 120;
const H = 58;

const nodes: DiagramNode[] = [
  { id: 'client', label: 'Client', sub: 'Web · Mobile', x: 24, y: 231, w: W, h: H, accent: true },
  { id: 'gateway', label: 'API Gateway', sub: 'Auth · Routing', x: 214, y: 231, w: 138, h: H },
  { id: 'lb', label: 'Load Balancer', sub: 'Distribute', x: 420, y: 231, w: 138, h: H },
  { id: 's1', label: 'Service', sub: 'Catalog', x: 628, y: 120, w: W, h: H },
  { id: 's2', label: 'Service', sub: 'Orders', x: 628, y: 231, w: W, h: H },
  { id: 's3', label: 'Service', sub: 'Search', x: 628, y: 342, w: W, h: H },
  { id: 'cache', label: 'Cache', sub: 'Redis', x: 820, y: 120, w: W, h: H, accent: true },
  { id: 'db', label: 'Database', sub: 'Primary', x: 820, y: 231, w: W, h: H, accent: true },
  { id: 'queue', label: 'Queue', sub: 'Kafka', x: 820, y: 342, w: W, h: H, accent: true },
];

const edges: [string, string][] = [
  ['client', 'gateway'],
  ['gateway', 'lb'],
  ['lb', 's1'],
  ['lb', 's2'],
  ['lb', 's3'],
  ['s1', 'cache'],
  ['s2', 'db'],
  ['s3', 'queue'],
  ['s2', 'cache'],
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

/** Cubic bezier from the right edge of `a` to the left edge of `b`. */
function edgePath(aId: string, bId: string): string {
  const a = byId(aId);
  const b = byId(bId);
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const x2 = b.x;
  const y2 = b.y + b.h / 2;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

/**
 * "Beyond the Code": a stylised, living architecture diagram with data
 * packets flowing client → gateway → services → data layer.
 */
export default function TechShowcase() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="tech" aria-label="System architecture" className="relative py-[14vh]">
      <div className="container-editorial">
        <SectionHeading
          index="06"
          eyebrow="Systems"
          title="Beyond the Code"
          subtitle="How I think about scalable systems: data moving cleanly through the layers that keep products fast and reliable."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE.outExpo }}
          className="mt-16 overflow-x-auto rounded-2xl border border-white/[0.07] bg-ink-900/60 p-4 sm:p-8"
        >
          <svg
            viewBox="0 0 964 460"
            className="mx-auto w-full min-w-[680px] max-w-5xl"
            role="img"
            aria-label="Architecture: client to API gateway to load balancer to services to cache, database and queue"
          >
            <defs>
              <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2a8bf2" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#2a8bf2" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2a8bf2" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Edges */}
            {edges.map(([a, b], i) => {
              const d = edgePath(a, b);
              return (
                <g key={`${a}-${b}`}>
                  <path
                    id={`path-${a}-${b}`}
                    d={d}
                    fill="none"
                    stroke="url(#edgeGrad)"
                    strokeWidth={1.4}
                  />
                  {!reducedMotion && (
                    <circle r={3} fill="#2a8bf2">
                      <animateMotion
                        dur={`${2.6 + (i % 3) * 0.6}s`}
                        begin={`${i * 0.35}s`}
                        repeatCount="indefinite"
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#path-${a}-${b}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        dur={`${2.6 + (i % 3) * 0.6}s`}
                        begin={`${i * 0.35}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((n) => (
              <g key={n.id}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx={12}
                  fill="#111111"
                  stroke={n.accent ? 'rgba(42,139,242,0.4)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={1}
                />
                {n.accent && (
                  <circle cx={n.x + 14} cy={n.y + 14} r={2.5} fill="#2a8bf2" />
                )}
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 - 4}
                  textAnchor="middle"
                  className="fill-chalk"
                  style={{ font: '600 14px "Space Grotesk", sans-serif' }}
                >
                  {n.label}
                </text>
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 14}
                  textAnchor="middle"
                  style={{ font: '400 10px Inter, sans-serif', fill: '#9a9a9a' }}
                >
                  {n.sub}
                </text>
              </g>
            ))}

            {/* Layer captions */}
            {(
              [
                ['Edge', 84],
                ['Routing', 489],
                ['Compute', 688],
                ['State', 880],
              ] as const
            ).map(([label, x]) => (
              <text
                key={label}
                x={x}
                y={432}
                textAnchor="middle"
                style={{
                  font: '500 10px Inter, sans-serif',
                  fill: '#5c5c5c',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {label.toUpperCase()}
              </text>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
