"use client";

import { useEffect, useRef } from "react";
import { loadGsap } from "../lib/gsapClient";
import { personal } from "../lib/data";
import SectionLabel from "./SectionLabel";
import { useLanguage } from "./LanguageProvider";

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="1.5">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2bffb1" strokeWidth="1.5">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const contactItems = [
  {
    icon: <MailIcon />,
    label: "lucianavanelli13@gmail.com",
    href: null,
  },
  {
    icon: <PinIcon />,
    label: "Arroyo Seco, Santa Fe — Argentina",
    href: null,
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await loadGsap({ registerScrollTrigger: true });

      const els = sectionRef.current?.querySelectorAll(".contact-item");
      if (!els) return;

      els.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };

    animate();
  }, []);

  return (
    <section id="contacto" className="py-24 relative overflow-hidden" ref={sectionRef}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_#2bffb108_0%,_transparent_70%)] filter blur-[60px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="contact-item opacity-0">
          <SectionLabel label={t.contact.sectionLabel} title={t.contact.title} center />
        </div>

        <p className="contact-item mt-4 mx-auto mb-12 max-w-[420px] text-[#8a9990] text-[0.875rem] sm:text-base leading-[1.7] opacity-0">
          {t.contact.description}
        </p>

        {/* CTA Buttons */}
        <div className="contact-item flex flex-wrap justify-center gap-4 mb-16 opacity-0">
          <a
            href={`mailto:${personal.email}`}
            className="inline-block rounded-sm bg-[#2bffb1] px-6 py-2 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-['Space Mono',monospace] font-bold uppercase tracking-[0.12em] text-[#0d0f0e] transition duration-200 ease-out hover:bg-[#00e5a0] hover:shadow-[0_0_20px_#2bffb140]"
          >
            {t.buttons.email}
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm border border-[#2bffb1] bg-transparent px-6 py-2 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-['Space Mono',monospace] font-bold uppercase tracking-[0.12em] text-[#2bffb1] transition duration-200 ease-out hover:bg-[#2bffb110] hover:shadow-[0_0_20px_#2bffb130]"
          >
            {t.buttons.linkedin}
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-sm border border-[#2bffb1] bg-transparent px-6 py-2 sm:px-7 sm:py-3 text-[10px] sm:text-xs font-['Space Mono',monospace] font-bold uppercase tracking-[0.12em] text-[#2bffb1] transition duration-200 ease-out hover:bg-[#2bffb110] hover:shadow-[0_0_20px_#2bffb130]"
          >
            {t.buttons.github}
          </a>
        </div>

        {/* Contact info cards */}
        <div className="contact-item flex flex-wrap justify-center gap-4 opacity-0">
          {contactItems.map((item) => {
            const content = (
              <div className="flex items-center gap-3 rounded-sm border border-[#1a1e1c] bg-[#131614] px-5 py-3 transition-colors duration-200 hover:border-[#2bffb140]">
                {item.icon}
                <span className="font-['Space Mono',monospace] text-[0.65rem] sm:text-xs text-[#8a9990] transition-colors duration-200">
                  {item.label}
                </span>
              </div>
            );

            return item.href ? (
              <a key={item.label} href={item.href}>
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
