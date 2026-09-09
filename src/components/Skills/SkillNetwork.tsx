import { useEffect, useRef } from 'react';
import { skillCategories } from '@/data/skills';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';

interface Node {
  name: string;
  category: number;
  catLabel: string;
  x: number;
  y: number;
  bx: number; // base x (0..1)
  by: number; // base y (0..1)
  driftPhase: number;
  r: number;
}

const ACCENT = '#2a8bf2';

/**
 * Interactive "engineering constellation".
 * Skills are laid out in soft category clusters, connected within their group.
 * The pointer subtly parallaxes nodes; hovering a cluster highlights its
 * related skills and dims the rest. Rendered on a 2D canvas for smoothness.
 */
export default function SkillNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1, y: -1, active: false };
    let activeCat = -1;

    // Build nodes in category clusters positioned around a circle.
    const nodes: Node[] = [];
    const catCount = skillCategories.length;
    skillCategories.forEach((cat, ci) => {
      const angle = (ci / catCount) * Math.PI * 2 - Math.PI / 2;
      const clusterR = 0.3;
      const cx = 0.5 + Math.cos(angle) * clusterR;
      const cy = 0.5 + Math.sin(angle) * clusterR * 0.86;
      cat.skills.forEach((name, si) => {
        const a = (si / cat.skills.length) * Math.PI * 2 + ci;
        const spread = 0.1 + (si % 2) * 0.03;
        nodes.push({
          name,
          category: ci,
          catLabel: cat.label,
          bx: cx + Math.cos(a) * spread,
          by: cy + Math.sin(a) * spread,
          x: 0,
          y: 0,
          driftPhase: Math.random() * Math.PI * 2,
          r: 3.2,
        });
      });
    });

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -1;
      mouse.y = -1;
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    let raf = 0;
    let t = 0;

    const render = () => {
      t += 0.006;
      ctx.clearRect(0, 0, width, height);

      // Resolve node screen positions with idle drift + pointer parallax.
      let hoveredCat = -1;
      let hoveredDist = Infinity;
      for (const n of nodes) {
        const drift = reducedMotion ? 0 : Math.sin(t + n.driftPhase) * 6;
        n.x = n.bx * width + (reducedMotion ? 0 : Math.cos(t + n.driftPhase) * 6);
        n.y = n.by * height + drift;
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          // gentle attraction parallax
          const pull = Math.max(0, 1 - d / 260) * 14;
          n.x += (dx / (d || 1)) * pull;
          n.y += (dy / (d || 1)) * pull;
          if (d < hoveredDist && d < 80) {
            hoveredDist = d;
            hoveredCat = n.category;
          }
        }
      }
      activeCat = hoveredCat;

      // Connections within each category.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (a.category !== b.category) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 190) continue;
          const isActive = activeCat === a.category;
          const base = (1 - d / 190) * (isActive ? 0.55 : 0.14);
          ctx.strokeStyle = isActive
            ? `rgba(42,139,242,${base})`
            : `rgba(245,245,245,${base})`;
          ctx.lineWidth = isActive ? 1 : 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Faint inter-cluster links to the centre for cohesion.
      // (skipped for a cleaner look)

      // Nodes + labels.
      for (const n of nodes) {
        const isActive = activeCat === n.category;
        const dimmed = activeCat !== -1 && !isActive;
        const r = n.r * (isActive ? 1.8 : 1);

        // glow
        if (isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(42,139,242,0.12)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? ACCENT : dimmed ? 'rgba(245,245,245,0.25)' : 'rgba(245,245,245,0.8)';
        ctx.fill();

        // label
        ctx.font =
          '500 12px "Space Grotesk", system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const labelAlpha = isActive ? 1 : dimmed ? 0.2 : 0.55;
        ctx.fillStyle = isActive
          ? `rgba(245,245,245,${labelAlpha})`
          : `rgba(154,154,154,${labelAlpha})`;
        ctx.fillText(n.name, n.x, n.y + r + 6);
      }

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapRef}
      className="relative h-[68vh] min-h-[480px] w-full"
      role="img"
      aria-label="Interactive network of engineering skills grouped by category"
    >
      <canvas ref={canvasRef} className="absolute inset-0" data-cursor="hover" />
    </div>
  );
}
