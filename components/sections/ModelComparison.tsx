"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CountUp } from "@/components/ui/CountUp";

const comparisonModels = [
  {
    category: "S",
    name: "3X6 집",
    area: "5.4평 (17.8㎡)",
    price: "1,800만원~",
    rooms: "원룸",
    bathrooms: "1",
    recommended: "1인 가구 / 세컨하우스 / 농막",
    popular: false,
  },
  {
    category: "M",
    name: "3X9 집",
    area: "8.1평 (26.7㎡)",
    price: "2,800만원~",
    rooms: "1~2룸",
    bathrooms: "1",
    recommended: "1~2인 가구 / 체류형 쉼터",
    popular: true,
  },
  {
    category: "L",
    name: "18평 단독주택",
    area: "18평 (59.5㎡)",
    price: "4,500만원~",
    rooms: "2~3룸",
    bathrooms: "1~2",
    recommended: "소가족 / 첫 번째 집",
    popular: false,
  },
  {
    category: "XL",
    name: "30평 단독주택",
    area: "30평 (99.2㎡)",
    price: "7,500만원~",
    rooms: "3~4룸",
    bathrooms: "2",
    recommended: "대가족 / 프리미엄",
    popular: false,
  },
];

const comparisonRows = [
  { key: "area", label: "면적" },
  { key: "price", label: "가격" },
  { key: "rooms", label: "방" },
  { key: "bathrooms", label: "욕실" },
  { key: "recommended", label: "추천 용도" },
] as const;

export function ModelComparison() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<number>(1);

  return (
    <section className="py-section-mobile md:py-section-tablet lg:py-section-desktop bg-white">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16">
        <ScrollReveal>
          <h2 className="text-h3 md:text-h2 lg:text-h1 font-bold text-center mb-12 lg:mb-20 text-text-primary">
            어떤 크기가 나한테 맞을까?
          </h2>
        </ScrollReveal>

        <div className="hidden lg:block relative">
          <ScrollReveal delay={0.2}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th scope="col" className="p-4 bg-white sticky left-0 z-10 w-48 border-b-2 border-border-light">
                      <span className="sr-only">비교 항목</span>
                    </th>
                    {comparisonModels.map((model, idx) => (
                      <th
                        key={model.category}
                        scope="col"
                        className={cn(
                          "p-6 text-center border-b-2 border-border-light relative transition-colors duration-300",
                          hoveredColumn === idx ? "bg-primary/5 border-primary/20" : "bg-white"
                        )}
                        onMouseEnter={() => setHoveredColumn(idx)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300",
                              hoveredColumn === idx || model.popular
                                ? "bg-primary text-text-primary"
                                : "bg-gray-100 text-text-secondary"
                            )}
                          >
                            {model.category}
                          </div>
                          <div className="relative">
                            <span className="text-h3 font-bold text-text-primary">{model.name}</span>
                            {model.popular && (
                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap">
                                인기
                              </span>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, rowIdx) => (
                    <tr
                      key={row.key}
                      className={cn(
                        "transition-colors duration-300",
                        rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      )}
                    >
                      <th
                        scope="row"
                        className="p-4 font-medium text-text-secondary sticky left-0 z-10 bg-inherit"
                      >
                        {row.label}
                      </th>
                      {comparisonModels.map((model, colIdx) => {
                        const isPrice = row.key === "price";
                        const priceValue = isPrice ? parseInt(model[row.key].replace(/[^0-9]/g, "")) : 0;
                        const hasNumber = /\d/.test(model[row.key as keyof typeof model] as string);

                        return (
                          <td
                            key={`${model.category}-${row.key}`}
                            className={cn(
                              "p-6 text-center text-text-primary transition-colors duration-300",
                              hoveredColumn === colIdx ? "bg-primary/5" : ""
                            )}
                            onMouseEnter={() => setHoveredColumn(colIdx)}
                            onMouseLeave={() => setHoveredColumn(null)}
                          >
                            {isPrice ? (
                              <div className="font-medium">
                                <CountUp end={priceValue} duration={1.5} />
                                <span>만원~</span>
                              </div>
                            ) : hasNumber && row.key !== 'recommended' && row.key !== 'area' ? (
                                <span className="font-medium">{model[row.key as keyof typeof model]}</span>
                            ) : (
                                <span className={row.key === 'recommended' ? 'text-text-secondary' : 'font-medium'}>
                                  {model[row.key as keyof typeof model]}
                                </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 bg-white sticky left-0 z-10"></td>
                    {comparisonModels.map((model, idx) => (
                      <td
                        key={`cta-${model.category}`}
                        className={cn(
                          "p-6 text-center pt-8 transition-colors duration-300",
                          hoveredColumn === idx ? "bg-primary/5 rounded-b-xl" : "bg-white"
                        )}
                        onMouseEnter={() => setHoveredColumn(idx)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <Link
                          href={`/products#${model.category.toLowerCase()}`}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border-medium text-text-primary font-medium hover:bg-primary hover:border-primary transition-colors min-h-[44px]"
                        >
                          자세히 보기
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>

        <div className="lg:hidden">
          <ScrollReveal delay={0.2}>
            <div
              className="flex p-1 bg-gray-100 rounded-full mb-8 relative"
              role="tablist"
              aria-label="Model categories"
            >
              {comparisonModels.map((model, idx) => (
                <button
                  key={model.category}
                  type="button"
                  role="tab"
                  aria-selected={activeMobileTab === idx}
                  aria-controls={`panel-${model.category}`}
                  id={`tab-${model.category}`}
                  onClick={() => setActiveMobileTab(idx)}
                  className={cn(
                    "flex-1 py-3 px-4 text-center rounded-full font-medium text-sm transition-colors relative z-10 min-h-[44px]",
                    activeMobileTab === idx ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {model.category}
                </button>
              ))}
              <motion.div
                className="absolute top-1 bottom-1 bg-primary rounded-full z-0"
                initial={false}
                animate={{
                  left: `calc(${activeMobileTab * 25}% + 4px)`,
                  width: "calc(25% - 8px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            <div className="relative overflow-hidden min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMobileTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-border-light rounded-2xl p-6 shadow-sm w-full absolute top-0 left-0"
                  role="tabpanel"
                  id={`panel-${comparisonModels[activeMobileTab].category}`}
                  aria-labelledby={`tab-${comparisonModels[activeMobileTab].category}`}
                >
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-border-light">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">
                          {comparisonModels[activeMobileTab].category}
                        </span>
                        {comparisonModels[activeMobileTab].popular && (
                          <span className="bg-primary/20 text-primaryDark px-2 py-0.5 rounded text-xs font-medium">
                            인기
                          </span>
                        )}
                      </div>
                      <h3 className="text-h2 font-bold text-text-primary">
                        {comparisonModels[activeMobileTab].name}
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {comparisonRows.map((row) => {
                       const isPrice = row.key === "price";
                       const priceValue = isPrice ? parseInt(comparisonModels[activeMobileTab][row.key].replace(/[^0-9]/g, "")) : 0;
                       
                      return (
                      <li key={row.key} className="flex justify-between items-center py-2">
                        <span className="text-text-secondary">{row.label}</span>
                        {isPrice ? (
                          <span className="font-bold text-lg">
                            <CountUp end={priceValue} duration={1} />
                            <span>만원~</span>
                          </span>
                        ) : (
                          <span className={cn(
                            "text-right",
                            row.key === 'recommended' ? "text-text-secondary text-sm max-w-[60%]" : "font-medium"
                          )}>
                            {comparisonModels[activeMobileTab][row.key as keyof typeof comparisonModels[0]]}
                          </span>
                        )}
                      </li>
                    )})}
                  </ul>

                  <Link
                    href={`/products#${comparisonModels[activeMobileTab].category.toLowerCase()}`}
                    className="flex w-full items-center justify-center px-6 py-4 rounded-xl bg-gray-50 text-text-primary font-medium hover:bg-primary transition-colors min-h-[44px]"
                  >
                    자세히 보기
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
