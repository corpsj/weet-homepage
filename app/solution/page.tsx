"use client";

import Link from "next/link";

// 솔루션 데이터
const solutions = [
  {
    id: "cctv",
    title: "보안 솔루션",
    description: `"언제든, 어디서든, 우리 집을 안전하게 지키세요."`,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <path
          d="M8 28h32v20H8V28z"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M40 32l16-8v20l-16-8"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
        />
        <circle cx="20" cy="38" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M24 52v6M16 52v6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "network",
    title: "네트워크(인터넷 솔루션)",
    description: `"어디에서도 끊김 없는 인터넷, 산 속에서도 자유로운 소통."`,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="3" />
        <ellipse
          cx="32"
          cy="32"
          rx="8"
          ry="20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M12 32h40M32 12v40" stroke="currentColor" strokeWidth="2" />
        <rect
          x="26"
          y="26"
          width="12"
          height="12"
          rx="2"
          fill="currentColor"
          opacity="0.3"
        />
        <text
          x="32"
          y="36"
          textAnchor="middle"
          fontSize="8"
          fill="currentColor"
          fontWeight="bold"
        >
          WWW
        </text>
      </svg>
    ),
  },
  {
    id: "iot",
    title: "IOT(스마트 홈 솔루션)",
    description: `"집 전체를 스마트하게, 이동식 주택의 편리함을 극대화하세요."`,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <rect
          x="18"
          y="8"
          width="28"
          height="48"
          rx="4"
          stroke="currentColor"
          strokeWidth="3"
        />
        <rect x="22" y="14" width="20" height="32" rx="2" fill="currentColor" opacity="0.2" />
        <circle cx="32" cy="50" r="2" fill="currentColor" />
        <path
          d="M28 26l4 4 8-8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 34h12M26 38h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: "design",
    title: "Design (디자인 컨설팅 솔루션)",
    description: `"당신의 '로망'이 '공간'이 되는 순간"`,
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-10 h-10">
        <path
          d="M44 8L16 36l-4 16 16-4L56 20 44 8z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M40 12l12 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M16 36l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Title */}
          <div className="mb-16 md:mb-20 lg:mb-24">
            <h1 className="text-[48px] md:text-[64px] lg:text-[72px] font-bold tracking-tight">
              SOLUTION
            </h1>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {solutions.map((solution) => (
              <div key={solution.id} className="flex flex-col items-center text-center h-full">
                {/* Icon Circle */}
                <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#4A4A4A] flex items-center justify-center mb-6 text-white">
                  {solution.icon}
                </div>

                {/* Title with underline */}
                <h3 className="text-[14px] md:text-[15px] lg:text-[16px] font-bold mb-3">
                  <span className="border-b-[3px] border-primary pb-0.5">
                    {solution.title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-[12px] md:text-[13px] text-gray-700 leading-relaxed max-w-[220px] flex-grow">
                  {solution.description}
                </p>

                {/* More Link */}
                <Link
                  href={`/solution/${solution.id}`}
                  className="inline-flex items-center gap-2 text-[14px] font-medium hover:text-primary transition-colors group mt-6"
                >
                  More
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
