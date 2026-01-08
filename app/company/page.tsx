'use client';

import Image from 'next/image';
import { useState } from 'react';
import CrewModal from '@/components/ui/CrewModal';
import { useTranslation } from '@/hooks/useTranslation';

import ImageSlider from '@/components/ui/ImageSlider';

interface CrewData {
  name: string;
  role: string;
  description: string;
  sections: { title: string; items: string[] }[];
  images: string[];
}

export default function CompanyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslation();

  // Construct Crew Data from Dictionary
  const CREW_DATA: Record<string, CrewData> = {
    design: {
      name: t.company.crew.design.name,
      role: t.company.crew.design.role,
      description: t.company.crew.design.description,
      sections: [
        t.company.crew.design.education,
        t.company.crew.design.career,
        t.company.crew.design.awards,
      ],
      images: ["/images/crew/park-profile.png", "/images/crew/park-action.jpg"]
    },
    construction: {
      name: t.company.crew.construction.name,
      role: t.company.crew.construction.role,
      description: t.company.crew.construction.description,
      sections: [
        t.company.crew.construction.education,
        t.company.crew.construction.career,
        t.company.crew.construction.awards,
      ],
      images: []
    },
    solution: {
      name: t.company.crew.solution.name,
      role: t.company.crew.solution.role,
      description: t.company.crew.solution.description,
      sections: [
        t.company.crew.solution.education,
        t.company.crew.solution.career,
        t.company.crew.solution.awards,
      ],
      images: []
    }
  };

  const [selectedCrew, setSelectedCrew] = useState<CrewData | null>(null);

  const openModal = (crewKey: keyof typeof CREW_DATA) => {
    setSelectedCrew(CREW_DATA[crewKey]);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <section id="philosophy" className="bg-[#EBEBEB] py-16 lg:py-24 scroll-mt-[180px]">
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
                {t.company.hero.title}
              </h1>

              <p className="text-[14px] md:text-[15px] lg:text-[16px] font-semibold mb-4 text-black">
                {t.company.hero.subtitle}
              </p>

              <div className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed space-y-4 text-black/80">
                <p>{t.company.hero.desc1}</p>
                <p>{t.company.hero.desc2}</p>
                <p>
                  {t.company.hero.desc3}<br />
                  {t.company.hero.desc3_1}<br />
                  {t.company.hero.desc3_2}<br />
                  {t.company.hero.desc3_3}
                </p>
                <p>{t.company.hero.desc4}</p>
              </div>

              <div className="mt-8 text-left">
                <span className="relative inline-block font-bold text-black text-[16px] md:text-[18px]">
                  <span className="relative z-10">{t.company.hero.companyName}</span>
                  <span className="absolute bottom-[2px] left-0 w-full h-[8px] bg-primary -z-0"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Enterprise CI */}
      <section id="ci" className="bg-white py-16 lg:py-24 scroll-mt-[180px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Logo */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] relative overflow-hidden rounded-lg">
                <Image
                  src="/images/company/ci-logo.png"
                  alt="위트(WEET) 로고"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: CI Description */}
            <div>
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold mb-8 text-black">
                {t.company.ci.title}
              </h2>

              <div className="space-y-6">
                {/* weet:) - 1st */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-[20px] md:text-[24px] font-bold">
                      <span className="text-black">{t.company.ci.meaning1_title}</span>
                      <span className="text-gray-400">:)</span>
                    </span>
                    <span className="text-[14px] text-gray-500">{t.company.ci.meaning1_sub}</span>
                  </div>
                  <p className="text-[14px] text-gray-600">
                    {t.company.ci.meaning1_desc}
                  </p>
                </div>

                {/* weet:) - 2nd */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-[20px] md:text-[24px] font-bold">
                      <span className="text-gray-400">{t.company.ci.meaning2_title}</span>
                      <span className="text-black">:)</span>
                    </span>
                    <span className="text-[14px] text-gray-500">{t.company.ci.meaning2_sub}</span>
                  </div>
                  <p className="text-[14px] text-gray-600">
                    {t.company.ci.meaning2_desc}
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
                    <span className="text-[14px] text-gray-500">{t.company.ci.color_sub}</span>
                  </div>
                  <p className="text-[14px] text-gray-600">
                    {t.company.ci.color_desc}
                  </p>
                </div>

                {/* Inverted Triangle */}
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H36L0 36Z" fill="#2D2D2D" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-[14px] text-gray-500 block mb-2">{t.company.ci.shape_title}</span>
                      <p className="text-[14px] text-gray-600">
                        {t.company.ci.shape_desc}
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
      <section id="crew" className="bg-[#EBEBEB] py-16 lg:py-24 scroll-mt-[180px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-start gap-8 lg:gap-20">
            {/* Left: weet Crew Logo */}
            <div className="flex-shrink-0 mb-4 lg:mb-0">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H40L0 40Z" fill="#2D2D2D" />
                  </svg>
                </div>
                <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black">{t.company.crew.title}</span>
              </div>
            </div>

            {/* Right: Department Cards */}
            <div className="flex-1 w-full grid grid-cols-3 gap-2 md:gap-8 lg:gap-12 pb-0">
              {/* Design */}
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] mb-2 md:mb-6 relative">
                  <Image
                    src="/images/company/crew-design-new.png"
                    alt="Design Crew"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[11px] md:text-[18px] font-bold mb-3 md:mb-4 text-black break-keep">{t.company.crew.design.title}</h3>
                <button
                  onClick={() => openModal('design')}
                  className="bg-[#2D2D2D] text-white w-full md:w-auto px-0 md:px-12 py-1.5 md:py-2.5 text-[10px] md:text-[14px] font-medium hover:bg-black transition-colors mt-auto rounded-sm md:rounded-none"
                >
                  {t.company.crew.more}
                </button>
              </div>

              {/* Construction */}
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] mb-2 md:mb-6 relative">
                  <Image
                    src="/images/company/crew-construction-new.png"
                    alt="Construction Crew"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[11px] md:text-[18px] font-bold mb-3 md:mb-4 text-black break-keep">{t.company.crew.construction.title}</h3>
                <button
                  onClick={() => openModal('construction')}
                  className="bg-[#2D2D2D] text-white w-full md:w-auto px-0 md:px-12 py-1.5 md:py-2.5 text-[10px] md:text-[14px] font-medium hover:bg-black transition-colors mt-auto rounded-sm md:rounded-none"
                >
                  {t.company.crew.more}
                </button>
              </div>

              {/* Solution */}
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-[60px] h-[60px] md:w-[120px] md:h-[120px] mb-2 md:mb-6 relative">
                  <Image
                    src="/images/company/crew-solution-new.png"
                    alt="Solution Crew"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[11px] md:text-[18px] font-bold mb-3 md:mb-4 text-black break-keep">{t.company.crew.solution.title}</h3>
                <button
                  onClick={() => openModal('solution')}
                  className="bg-[#2D2D2D] text-white w-full md:w-auto px-0 md:px-12 py-1.5 md:py-2.5 text-[10px] md:text-[14px] font-medium hover:bg-black transition-colors mt-auto rounded-sm md:rounded-none"
                >
                  {t.company.crew.more}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: weet Factory */}
      <section id="factory" className="bg-[#EBEBEB] py-16 lg:py-24 border-t border-gray-200 scroll-mt-[180px]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Left: weet Factory Logo */}
            <div className="flex-shrink-0 mb-4 lg:mb-0">
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H40L0 40Z" fill="#2D2D2D" />
                  </svg>
                </div>
                <span className="text-[28px] md:text-[32px] lg:text-[36px] font-bold text-black">{t.company.factory.title}</span>
              </div>
            </div>

            {/* Right: Factory Cards */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* LAB */}
              <div className="flex flex-col items-center text-center w-full">
                <ImageSlider
                  images={t.company.factory.lab.images}
                  alt="LAB"
                  className="mb-4"
                />
                <h3 className="text-[18px] md:text-[20px] font-bold text-black">{t.company.factory.lab.title}</h3>
                <p className="text-[14px] text-gray-600">{t.company.factory.lab.desc}</p>
              </div>

              {/* WORKSHOP */}
              <div className="flex flex-col items-center text-center w-full">
                <ImageSlider
                  images={t.company.factory.workshop.images}
                  alt="WORKSHOP"
                  className="mb-4"
                  aspectRatio="md:max-w-[359px] aspect-[359/422]"
                />
                <h3 className="text-[18px] md:text-[20px] font-bold text-black">{t.company.factory.workshop.title}</h3>
                <p className="text-[14px] text-gray-600">{t.company.factory.workshop.desc}</p>
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
