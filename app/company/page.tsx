'use client';

import Image from 'next/image';
import { useState } from 'react';
import CrewModal from '@/components/ui/CrewModal';

interface CrewData {
  name: string;
  role: string;
  description: string;
  sections: { title: string; items: string[] }[];
  images: string[];
}

const CREW_DATA: Record<string, CrewData> = {
  design: {
    name: "박현태",
    role: "weet의 대표 디자이너",
    description: `weet의 대표 디자이너로서 전반적인 디자인과 브랜딩을 담당하고 있다.
    대학졸업 후 서울 건축설계사무소에서 경력을 쌓고, 4년간 해외 생활을 하면서 건축 관련 업무를 프리랜서로서 진행하였다.
    팬데믹으로 귀국하여 스스로 집을 짓고, 현장목수로서 일하면서 건축시공방법과 건축재료를 몸소 이해 하였고, 그 경험을 바탕으로 합리적인 디자인과 구축법에 대해서 고민하고 발전시키고 있다.`,
    sections: [
      {
        title: "학력",
        items: ["홍익대학교 건축공학과 건축학 전공(5년제)"]
      },
      {
        title: "경력",
        items: [
          "이안디자인건축사사무소",
          "hom건축사사무소",
          "구중정아키텍츠 건축사사무소",
          "스페인 바르셀로나 라발지구 도심재생 전문 가이드",
          "한국문화예술위원회 예술더하기 건축수업 강사",
          "전남문화재단 지역특성화 문화예술교육 '로컬투더테이블' 강사",
          "레온디자인스튜디오 대표",
          "문화공간 h/p1 대표"
        ]
      },
      {
        title: "수상",
        items: [
          "2010 광주광역시 도시관문 국민 디자인 -2등 광주광역시",
          "2010 한국토지공사 베리어 프리 공모전 -입선 한국토지공사",
          "2010 인천도시디자인 국제 공모전 -입선 인천광역시",
          "2012 포스코 스틸 디자인 공모전-1등 포스코",
          "2018 임시정부청사기념관 건축물디자인 -특선 국가보훈처",
          "2018 임시정부청사기념관 전시콘텐츠 -입선 국가보훈처",
          "2018 서울시 종로구 낙산공원 전망대 -1등 서울특별시",
          "2019 인천도시공사 석산명소화 공모전 - 3등 인천광역시",
          "2020 (주) 망치개발 조형물 디자인 -입선 (주)망치개발"
        ]
      }
    ],
    images: ["/images/crew/park-profile.png", "/images/crew/park-action.jpg"]
  },
  construction: {
    name: "장혁훈",
    role: "시공 / 품질 부문 대표",
    description: "준비중",
    sections: [
      {
        title: "항목 1",
        items: ["준비중"]
      },
      {
        title: "항목 2",
        items: ["준비중"]
      }
    ],
    images: []
  },
  solution: {
    name: "박성주",
    role: "HOME SOLUTION 부문 대표",
    description: "준비중",
    sections: [
      {
        title: "항목 1",
        items: ["준비중"]
      },
      {
        title: "항목 2",
        items: ["준비중"]
      }
    ],
    images: []
  }
};

export default function CompanyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState<typeof CREW_DATA.design | null>(null);

  const openModal = (crewKey: keyof typeof CREW_DATA) => {
    setSelectedCrew(CREW_DATA[crewKey]);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero - '우리는 고객의 꿈을 짓습니다' */}
      <section className="bg-[#EBEBEB] py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Slogan Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[400px] aspect-[200/240]">
                <Image
                  src="/images/company/slogan.png"
                  alt="We make dreams come true"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-relaxed mb-6 text-black">
                '우리는 고객의 꿈을 짓습니다'
              </h1>

              <p className="text-[14px] md:text-[15px] lg:text-[16px] font-semibold mb-4 text-black">
                꿈을 짓는 사람들 위트의 시작과 약속
              </p>

              <div className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed space-y-4 text-black/80">
                <p>
                  위트는 '고객의 로망과 니즈를 실현시켜주는 작업자들' 이라는 하나의 생각에서 출발했습니다.
                </p>

                <p>
                  우리에게 '건축'은 두 가지를 모두 만족시키는 일입니다.<br />
                  하나는 고객이 마음속에 그려온 이상적인 공간, 즉 '로망(Dream)'입니다.<br />
                  다른 하나는 그 공간이 현실에서 완벽하게 기능하기 위한 조건, 즉 니즈(Needs)입니다.
                </p>

                <p>
                  많은 이들이 로망과 니즈 사이에서 타협을 이야기할 때, weet 의 '작업자들'은 그 둘을 모두 실현할 방법을 고민합니다.<br />
                  *우리는 화려한 약속 대신, 정밀한 기술력과 숙련된 경험으로 말합니다.<br />
                  *우리는 고객의 추상적인 '로망'을 듣고, 그것을 구현할 가장 합리적인 '니즈'로 번역해냅니다.<br />
                  *우리는 고객의 까다로운 '니즈'를 해결하면서도, 그 안에 담긴 '로망'의 가치를 잊지 않습니다.
                </p>

                <p>
                  그래서 위트에게 "고객의 꿈을 짓는다"는 것은 감성적인 구호가 아니라, 우리의 '작업 방식' 그 자체를 의미합니다.<br />
                  고객의 가장 이상적인 상상(꿈)과 가장 현실적인 필요(니즈)가 우리의 손을 거쳐 가장 견고한 결과물로 완성되는 것.<br />
                  이것이 weet가 존재하는 이유이자, 우리가 스스로를 '작업자들'이라 부르는 이유입니다.
                </p>
              </div>

              <div className="mt-8 text-left">
                <span className="relative inline-block font-bold text-black text-[16px] md:text-[18px]">
                  <span className="relative z-10">주식회사 위트</span>
                  <span className="absolute bottom-[2px] left-0 w-full h-[8px] bg-primary -z-0"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 기업 CI */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] relative overflow-hidden rounded-lg">
                <Image
                  src="/images/company/ci-logo.png"
                  alt="weet:) 로고"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: CI Description */}
            <div>
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-8 text-black">
                기업 CI
              </h2>

              <div className="space-y-6">
                {/* weet:) - 첫번째 */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-[20px] md:text-[24px] font-bold">
                      <span className="text-black">weet</span>
                      <span className="text-gray-400">:)</span>
                    </span>
                    <span className="text-[14px] text-gray-500">We make dreams come true 의 약자</span>
                  </div>
                  <p className="text-[14px] text-gray-600">
                    우리는 고객을 꿈을 짓는다는 의미입니다.
                  </p>
                </div>

                {/* weet:) - 두번째 */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-[20px] md:text-[24px] font-bold">
                      <span className="text-gray-400">weet</span>
                      <span className="text-black">:)</span>
                    </span>
                    <span className="text-[14px] text-gray-500">:) 웃음</span>
                  </div>
                  <p className="text-[14px] text-gray-600">
                    위트(weet)의 발음은 재치를 뜻하는 위트(wit)와 같습니다. 우리는 문제 해결에 있어서 항상 긍정적이고, 재치를 발휘한다는 의미입니다.
                  </p>
                </div>

                {/* Black & Yellow */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-bold flex items-baseline gap-1">
                      <span className="text-[20px] md:text-[24px] text-black">Black</span>
                      <span className="text-[14px] md:text-[16px] text-black"> & </span>
                      <span className="text-[20px] md:text-[24px] text-primary">Yellow</span>
                    </span>
                    <span className="text-[14px] text-gray-500">검정색, 노란색</span>
                  </div>
                  <p className="text-[14px] text-gray-600">
                    검정색과 노란색은 공사장을 나타내는 대표적인 색상입니다.<br />
                    우리는 항상 좋은 제품을 만드는 작업자의 정체성을 지향하기 때문에 기업의 색상으로 선택 하였습니다.
                  </p>
                </div>

                {/* 역삼각형 */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H36V36L0 0Z" fill="#2D2D2D" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-[14px] text-gray-500 block mb-2">역삼각형</span>
                      <p className="text-[14px] text-gray-600">
                        3명의 전문가이자 공동대표를 뜻하는 삼각형 형태<br />
                        강한 건축구조와 도전을 상징하는 트러스구조의 형태
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: weet Crew */}
      <section className="bg-[#EBEBEB] py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left: weet Crew Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H40V40L0 0Z" fill="#2D2D2D" />
                  </svg>
                </div>
                <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black">weet</span>
              </div>
              <p className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black ml-12">Crew</p>
            </div>

            {/* Right: Department Cards */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* 설계 / 디자인 부문 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[120px] h-[120px] mb-6 relative">
                  <Image
                    src="/images/company/crew-design-new.png"
                    alt="설계/디자인 부문 캐릭터"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[16px] md:text-[18px] font-bold mb-4 text-black">설계 / 디자인 부문</h3>
                <button
                  onClick={() => openModal('design')}
                  className="bg-[#2D2D2D] text-white px-12 py-2.5 text-[14px] font-medium hover:bg-black transition-colors"
                >
                  MORE
                </button>
              </div>

              {/* 시공 / 품질 부문 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[120px] h-[120px] mb-6 relative">
                  <Image
                    src="/images/company/crew-construction-new.png"
                    alt="시공/품질 부문 캐릭터"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[16px] md:text-[18px] font-bold mb-4 text-black">시공 / 품질 부문</h3>
                <button
                  onClick={() => openModal('construction')}
                  className="bg-[#2D2D2D] text-white px-12 py-2.5 text-[14px] font-medium hover:bg-black transition-colors"
                >
                  MORE
                </button>
              </div>

              {/* HOME SOLUTION 부문 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-[120px] h-[120px] mb-6 relative">
                  <Image
                    src="/images/company/crew-solution-new.png"
                    alt="HOME SOLUTION 부문 캐릭터"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[16px] md:text-[18px] font-bold mb-4 text-black">HOME SOLUTION 부문</h3>
                <button
                  onClick={() => openModal('solution')}
                  className="bg-[#2D2D2D] text-white px-12 py-2.5 text-[14px] font-medium hover:bg-black transition-colors"
                >
                  MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: weet Factory */}
      <section className="bg-[#EBEBEB] py-16 lg:py-24 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left: weet Factory Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H40V40L0 0Z" fill="#2D2D2D" />
                  </svg>
                </div>
                <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black">weet</span>
              </div>
              <p className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black ml-12">Factory</p>
            </div>

            {/* Right: Factory Cards */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* LAB */}
              <div className="flex flex-col items-center text-center">
                <div className="w-full max-w-[541px] aspect-[541/422] rounded-lg overflow-hidden mb-4 relative">
                  <Image
                    src="/images/company/lab.jpg"
                    alt="LAB - 당신의 꿈을 연구하는곳"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-black">LAB</h3>
                <p className="text-[14px] text-gray-600">당신의 꿈을 연구하는곳</p>
              </div>

              {/* WORKSHOP */}
              <div className="flex flex-col items-center text-center">
                <div className="w-full max-w-[359px] aspect-[359/422] rounded-lg overflow-hidden mb-4 relative">
                  <Image
                    src="/images/company/workshop.jpg"
                    alt="WORKSHOP - 당신의 꿈을 짓는곳"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-black">WORKSHOP</h3>
                <p className="text-[14px] text-gray-600">당신의 꿈을 짓는곳</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CrewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCrew}
      />
    </div>
  );
}
