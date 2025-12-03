'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BespokePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Main Introduction */}
      <section className="bg-[#EBEBEB] py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[60px] md:text-[80px] lg:text-[100px] font-bold mb-8 md:mb-12 leading-none tracking-tight">
              BESPOKE
            </h1>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="lg:w-1/2">
                <p className="text-[18px] md:text-[20px] leading-relaxed mb-8 text-gray-800">
                  weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.
                  <span className="block mt-4 font-semibold text-black text-xl md:text-2xl relative inline-block">
                    <span className="relative z-10">'비스포크 서비스'는 세상에 단 하나뿐인<br />당신의 공간을 짓는 프리미엄 맞춤 솔루션입니다.</span>
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/30 -z-0"></span>
                  </span>
                </p>
              </div>

              <div className="lg:w-1/2 space-y-6 text-[15px] md:text-[16px] text-gray-600">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="border-l-2 border-primary pl-6"
                >
                  <strong className="block text-black text-lg mb-1">Unique Vision, Proven Tech</strong>
                  시그니처 라인에서 검증된 모듈러 기술력과 당신의 특별한 비전의 만남.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="border-l-2 border-gray-300 pl-6 hover:border-primary transition-colors"
                >
                  <strong className="block text-black text-lg mb-1">1:1 Dedicated Architect</strong>
                  아이디어 구상부터 완공까지, 전문가가 당신과 함께하며 모든 디테일을 구현합니다.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="border-l-2 border-gray-300 pl-6 hover:border-primary transition-colors"
                >
                  <strong className="block text-black text-lg mb-1">Limitless Design</strong>
                  부지의 형태, 용도, 스타일에 구애받지 않는 완전한 설계의 자유.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="border-l-2 border-gray-300 pl-6 hover:border-primary transition-colors"
                >
                  <strong className="block text-black text-lg mb-1">Premium Detailing</strong>
                  기본을 넘어, 당신의 기준에 맞는 최상급 자재와 마감 공법을 선택할 수 있습니다.
                </motion.div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 mt-16 group cursor-pointer">
              <span className="text-[40px] md:text-[60px] font-bold group-hover:text-primary transition-colors">More</span>
              <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-black rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Small Cafe (Image Right) */}
      <section className="bg-white py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              className="lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-widest text-sm mb-4 block">COMMERCIAL</span>
              <h2 className="text-[40px] md:text-[60px] font-bold mb-8 leading-tight">SMALL CAFE</h2>
              <p className="text-[20px] md:text-[24px] font-medium mb-6 text-gray-900">
                "카페는 커피 맛 이전에,<br />'공간의 경험'으로 먼저 기억됩니다."
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                문을 여는 순간 느껴지는 독특한 분위기, 공간을 채우는 빛과 소재의 질감.
                위트의 '작업자들'은 당신의 브랜드 스토리를 고객이 오감으로 경험하는 감각적인 공간 언어로 풀어냅니다.
                운영 효율과 심미성이 완벽히 공존하는 1:1 맞춤형 상업 공간을 제안합니다.
              </p>
              <button className="border-b-2 border-black pb-1 text-lg font-medium hover:text-primary hover:border-primary transition-colors">
                View Portfolio
              </button>
            </motion.div>
            <motion.div
              className="lg:w-1/2 order-1 lg:order-2 relative h-[400px] md:h-[600px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/bespoke/small-cafe.jpg"
                alt="Small Cafe"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Pop-up Store (Image Left) */}
      <section className="bg-[#F5F5F5] py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              className="lg:w-1/2 relative h-[400px] md:h-[600px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/bespoke/popup-store.jpg"
                alt="Pop-up Store"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-widest text-sm mb-4 block">RETAIL & EVENT</span>
              <h2 className="text-[40px] md:text-[60px] font-bold mb-8 leading-tight">
                POP-UP STORE<br />BRAND SHOWROOM
              </h2>
              <p className="text-[20px] md:text-[24px] font-medium mb-6 text-gray-900">
                '브랜드 경험'을 원하는 곳,<br />어디로든 옮기다
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                단 며칠 만에 고객을 사로잡는 강력한 브랜드 경험.
                정해진 장소와 시간에 얽매이지 않고, 원하는 곳 어디든 당신의 브랜드를 펼쳐보세요.
                빠른 설치와 철거, 완벽한 브랜딩 구현, 이동성을 충족하는 스마트한 비즈니스 솔루션입니다.
              </p>
              <button className="border-b-2 border-black pb-1 text-lg font-medium hover:text-primary hover:border-primary transition-colors">
                View Portfolio
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Smart Farm (Image Right) */}
      <section className="bg-white py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              className="lg:w-1/2 order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-widest text-sm mb-4 block">AGRITECH</span>
              <h2 className="text-[40px] md:text-[60px] font-bold mb-8 leading-tight">SMART FARM</h2>
              <p className="text-[20px] md:text-[24px] font-medium mb-6 text-gray-900">
                '데이터'가 '수확'이 되는,<br />농업의 미래를 짓다
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                스마트팜은 단순한 온실이 아닌, 데이터로 농사를 짓는 정밀한 연구소입니다.
                완벽한 단열과 기밀성을 갖춘 모듈 구조를 기반으로, 최적화된 환경 제어 시스템과 데이터 인프라를 통합합니다.
                기술이 농업의 한계를 넘어서는 혁신적인 공간을 경험하세요.
              </p>
              <button className="border-b-2 border-black pb-1 text-lg font-medium hover:text-primary hover:border-primary transition-colors">
                View Portfolio
              </button>
            </motion.div>
            <motion.div
              className="lg:w-1/2 order-1 lg:order-2 relative h-[400px] md:h-[600px] w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/bespoke/smart-farm.png"
                alt="Smart Farm"
                fill
                className="object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
