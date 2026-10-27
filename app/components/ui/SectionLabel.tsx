interface SectionLabelProps {
  label: string;
  title: string;
  /** id for the heading so the section can reference it with aria-labelledby */
  id?: string;
  center?: boolean;
}

export default function SectionLabel({ label, title, id, center = false }: SectionLabelProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="mb-2 font-mono text-[0.6rem] sm:text-sm uppercase tracking-[0.25em] text-accent">{label}</p>
      <h2 id={id} className="whitespace-pre-line font-mono text-[clamp(1.6rem,3.5vw,3rem)] font-bold leading-[1.1] text-fg">
        {title}
      </h2>
    </div>
  );
}
