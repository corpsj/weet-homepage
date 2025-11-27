"use client";

import Link from "next/link";
import Image from "next/image";

// 솔루션 데이터
const solutions = [
  {
    id: "cctv",
    title: "보안 솔루션",
    description: `"언제든, 어디서든, 우리 집을 안전하게 지키세요."`,
    image: "/images/solution/solution-1.png",
  },
  {
    id: "network",
    title: "네트워크(인터넷 솔루션)",
    description: `"어디에서도 끊김 없는 인터넷, 산 속에서도 자유로운 소통."`,
    image: "/images/solution/solution-2.png",
  },
  {
    id: "iot",
    title: "IOT(스마트 홈 솔루션)",
    description: `"집 전체를 스마트하게, 이동식 주택의 편리함을 극대화하세요."`,
    image: "/images/solution/solution-3.png",
  },
  {
    id: "design",
    title: "Design (디자인 컨설팅 솔루션)",
    description: `"당신의 '로망'이 '공간'이 되는 순간"`,
    image: "/images/solution/solution-4.png",
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
                {/* Solution Image */}
                <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-lg overflow-hidden mb-6 relative">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
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
