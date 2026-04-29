interface SectionLabelProps {
  label: string;
  title: string;
  center?: boolean;
}

export default function SectionLabel({ label, title, center = false }: SectionLabelProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="font-['Space Mono',monospace] mb-2 text-[0.6rem] sm:text-sm uppercase tracking-[0.25em] text-[#2bffb1]">
        {label}
      </p>
      <h2 className="font-['Space Mono',monospace] text-[clamp(1.6rem,3.5vw,3rem)] font-bold leading-[1.1] text-[#e8ede9]">
        {title}
      </h2>
    </div>
  );
}
