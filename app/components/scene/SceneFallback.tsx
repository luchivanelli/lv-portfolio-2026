/** Static stand-in for browsers without WebGL. Pure CSS, no JS cost. */
export default function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative h-[60vmin] w-[60vmin] translate-x-[25vw] max-md:translate-x-0">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_65%)] blur-2xl" />
        <div className="absolute inset-[18%] rounded-full border border-accent/30" />
        <div className="absolute inset-[30%] rounded-full border border-accent/15" />
      </div>
    </div>
  );
}
