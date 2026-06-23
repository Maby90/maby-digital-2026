import React from 'react';

const items = ['Agenti multi-step', 'Automazioni', 'Tool use & MCP', 'RAG · knowledge base', 'Orchestrazione', 'Claude Code skills', 'Pipeline event-driven'];

// Seamless infinite marquee: two identical tracks scroll left; when the first
// fully exits, the second is already in place. Pauses under reduced-motion.
export default function Marquee() {
  const Track = ({ aria }) => (
    <div className="marquee-track flex shrink-0 items-center gap-10 pr-10" aria-hidden={aria}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="font-display text-2xl md:text-4xl font-medium tracking-tight text-fg/70">{t}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_rgb(var(--mint))]" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/30 py-6 md:py-8" aria-label="Capacità">
      <div className="marquee flex w-max">
        <Track />
        <Track aria />
      </div>
    </section>
  );
}
