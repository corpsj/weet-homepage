"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const heroModels = [
  {
    id: "s",
    category: "S",
    name: "3X6 집",
    price: "1,800만",
    tagline: "작지만 위트있게",
    description: "나만의 작은 공간, 위트있게 시작하세요",
    ctaPrimary: { label: "자세히 보기", href: "/products#s" },
    ctaSecondary: { label: "상담 신청", href: "#consultation" },
    bgGradient: "from-amber-900/40 to-black/60",
    bgBase: "bg-neutral-900",
  },
  {
    id: "m",
    category: "M",
    name: "3X9 집",
    price: "2,800만",
    tagline: "딱 좋은 크기, 딱 좋은 삶",
    description: "넉넉하지만 부담 없는 공간",
    ctaPrimary: { label: "자세히 보기", href: "/products#m" },
    ctaSecondary: { label: "상담 신청", href: "#consultation" },
    bgGradient: "from-stone-900/40 to-black/60",
    bgBase: "bg-neutral-900",
  },
  {
    id: "l",
    category: "L",
    name: "18평 단독주택",
    price: "4,500만",
    tagline: "넉넉하게, 위트있게",
    description: "가족을 위한 첫 번째 집",
    ctaPrimary: { label: "자세히 보기", href: "/products#l" },
    ctaSecondary: { label: "상담 신청", href: "#consultation" },
    bgGradient: "from-gray-900/40 to-black/60",
    bgBase: "bg-neutral-950",
  },
  {
    id: "xl",
    category: "XL",
    name: "30평 단독주택",
    price: "7,500만",
    tagline: "여유있게, 격이 다르게",
    description: "넓고 프리미엄한 모듈러 하우스",
    ctaPrimary: { label: "자세히 보기", href: "/products#xl" },
    ctaSecondary: { label: "상담 신청", href: "#consultation" },
    bgGradient: "from-neutral-900/40 to-black/60",
    bgBase: "bg-black",
  },
];

export default function FullscreenHero() {
  const [activeSection, setActiveSection] = useState<string>("s");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto snap-y snap-mandatory bg-black relative"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
        {heroModels.map((model) => (
          <button
            key={`nav-${model.id}`}
            type="button"
            onClick={() => scrollToSection(model.id)}
            aria-label={`${model.name} 섹션으로 이동`}
            className="group flex items-center gap-4"
          >
            <span
              className={cn(
                "text-xs font-medium tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                activeSection === model.id && "opacity-100"
              )}
            >
              {model.category}
            </span>
            <div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeSection === model.id
                  ? "bg-primary scale-125"
                  : "bg-white/30 group-hover:bg-white/60"
              )}
            />
          </button>
        ))}
      </div>

      {heroModels.map((model, index) => (
        <section
          key={model.id}
          id={model.id}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          aria-label={model.name}
          className={cn(
            "h-screen w-full snap-start snap-always relative flex flex-col justify-end lg:justify-end pb-[10vh] lg:pb-32 px-6 lg:px-24",
            model.bgBase
          )}
        >
          <div
            className={cn(
              "absolute inset-0 z-0 bg-gradient-to-br opacity-80",
              model.bgGradient
            )}
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center justify-center px-3 py-1 bg-primary rounded-full mb-4 lg:mb-6"
            >
              <span className="text-black text-xs font-bold tracking-widest">
                {model.category}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-2 lg:mb-4 tracking-tight"
            >
              {model.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xl md:text-2xl text-white/80 font-light mb-4 lg:mb-6"
            >
              {model.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg md:text-xl text-white/70 mb-8 lg:mb-12 font-medium"
            >
              ₩{model.price}부터
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                href={model.ctaPrimary.href}
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-primary text-black rounded-full font-semibold text-sm transition-transform hover:scale-105"
              >
                {model.ctaPrimary.label}
              </Link>
              <Link
                href={model.ctaSecondary.href}
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 border border-white/30 text-white bg-transparent rounded-full font-semibold text-sm transition-all hover:bg-white/10"
              >
                {model.ctaSecondary.label}
              </Link>
            </motion.div>
          </div>

          {index === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
            >
              <span className="text-white/60 text-xs mb-2">스크롤하여 더 보기</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-white/60" />
              </motion.div>
            </motion.div>
          )}
        </section>
      ))}
    </div>
  );
}
