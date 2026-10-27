import type { ReactNode, MouseEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-sm px-6 py-2.5 sm:px-7 sm:py-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] transition duration-200 ease-out";

const variants = {
  primary: "bg-accent text-bg hover:bg-accent-dim hover:shadow-[0_0_20px_var(--glow)]",
  outline: "border border-accent text-accent hover:bg-accent/10 hover:shadow-[0_0_20px_var(--glow)]",
};

export default function Button({ href, children, variant = "primary", external, onClick, className = "" }: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
