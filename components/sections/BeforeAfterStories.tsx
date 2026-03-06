"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "제주 세컨하우스",
    location: "제주도 서귀포시",
    model: "M (3X9)",
    duration: "2개월",
    description: "한라산이 보이는 작은 쉼터를 모듈러로 완성했어요.",
    tags: ["세컨하우스", "제주", "바다 전망"],
    gradient: "from-amber-100 to-amber-300",
  },
  {
    id: 2,
    title: "강원도 농막",
    location: "강원도 횡성군",
    model: "S (3X6)",
    duration: "3주",
    description: "주말 농장 옆 나만의 농막, 빠르게 완성.",
    tags: ["농막", "체류형 쉼터", "강원도"],
    gradient: "from-blue-100 to-cyan-300",
  },
  {
    id: 3,
    title: "경기도 단독주택",
    location: "경기도 양평군",
    model: "L (18평)",
    description: "자연 속 첫 번째 집을 모듈러로 시작했어요.",
    duration: "3개월",
    tags: ["본 주거", "단독주택", "양평"],
    gradient: "from-emerald-100 to-emerald-300",
  },
];

export function BeforeAfterStories() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              위트가 만든 공간들
            </h2>
            <p className="text-gray-600 text-lg">
              실제 시공 사례를 확인해보세요
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 -mx-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((project) => (
              <div
                key={project.id}
                className="w-[300px] md:max-w-[400px] md:w-full snap-start flex-shrink-0 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-gray-100"
              >
                <div
                  className={cn(
                    "h-48 relative bg-gradient-to-br",
                    project.gradient
                  )}
                >
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                    시공 사례
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-2">
                    <h3 className="font-bold text-lg text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {project.location} · {project.model}
                    </p>
                  </div>

                  <div className="mb-4 mt-2">
                    <span className="inline-block bg-primary/10 text-primary-dark font-medium px-3 py-1 rounded-full text-xs">
                      시공 기간: {project.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 text-center">
            <p className="text-gray-400 italic text-sm">
              더 많은 시공 사례는 준비 중입니다
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
