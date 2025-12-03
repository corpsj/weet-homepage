import Image from 'next/image';

export default function BespokePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Main Introduction */}
      <section className="bg-[#EBEBEB] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[148px]">
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8">BESPOKE</h1>

          <p className="text-[15px] md:text-[17px] lg:text-[18px] mb-6 md:mb-8 leading-relaxed max-w-full lg:max-w-[916px]">
            weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.
            <span className="underline decoration-1 md:decoration-2 underline-offset-2 md:underline-offset-4">
              '비스포크 서비스'는 이 강력한 기반 위에, 세상에 단 하나뿐인 당신의 공간을 짓는 프리미엄 맞춤 솔루션입니다.
            </span>
          </p>

          <div className="space-y-2 md:space-y-3 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed max-w-full lg:max-w-[1119px] mb-8 md:mb-10 lg:mb-12">
            <p>
              • Unique Vision, Proven Tech: 시그니처 라인에서 검증된 모듈러 기술력과
              당신의 특별한 비전의 만남.
            </p>
            <p>
              • 1:1 전담 케어 (Dedicated Architect): 아이디어 구상부터 완공까지,
              전문가가 당신과 함께하며 모든 디테일을 구현합니다.
            </p>
            <p>
              • Limitless Design: 부지의 형태, 용도, 스타일에 구애받지 않는 완전한 설계의 자유.
            </p>
            <p>
              • Premium Detailing: 기본을 넘어, 당신의 기준에 맞는 최상급 자재와
              마감 공법을 선택할 수 있습니다.
            </p>
          </div>

          <div className="flex justify-end items-center gap-2 md:gap-4">
            <span className="text-[48px] md:text-[64px] lg:text-[80px] font-bold">More</span>
            <svg className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] lg:w-[77px] lg:h-[77px]" viewBox="0 0 24 24" fill="none">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 2: Small Cafe */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-0">
          <div className="relative lg:min-h-[867px]">
            <div className="static lg:absolute lg:left-[29px] lg:top-[54px] z-10 px-4 md:px-8 lg:px-0 mb-8 lg:mb-0">
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8 leading-tight">SMALL CAFE</h2>
              <p className="text-[20px] md:text-[24px] lg:text-[28px] mb-4 md:mb-6 leading-relaxed max-w-full lg:max-w-[592px]">
                "카페는 커피 맛 이전에, '공간의 경험'으로 먼저 기억됩니다."
              </p>
              <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed max-w-full lg:max-w-[351px]">
                문을 여는 순간 느껴지는 독특한 분위기, 공간을 채우는 빛과 소재의 질감,
                고객의 감성을 자극하며 머무르게 만드는 힘. 위트의 '작업자들'은 당신의 '로망'(브랜드 컨셉과 스토리)을
                고객이 오감으로 경험하는 감각적인 '공간 언어'로 풀어냈습니다.
                우리는 당신의 철학이 담긴 아이덴티티와 손님과 직원의 동선까지 고려한 운영 효율이
                완벽히 공존하는 1:1 맞춤형 상업 공간을 제안했습니다.
              </p>
            </div>
            <div className="lg:ml-[403px] w-full lg:w-[1517px] aspect-[16/9] lg:aspect-auto lg:h-[867px] relative">
              <Image
                src="/images/bespoke/small-cafe.jpg"
                alt="Small Cafe"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Pop-up Store */}
      <section className="bg-[#EBEBEB] py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-0">
          <div className="relative lg:min-h-[865px]">
            <div className="static lg:absolute lg:left-[39px] lg:top-[54px] z-10 px-4 md:px-8 lg:px-0 mb-8 lg:mb-0">
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-3 md:mb-4 leading-tight max-w-full lg:max-w-[723px]">
                POP_UP STORE<br />BRAND SHOWROOM
              </h2>
              <p className="text-[20px] md:text-[24px] lg:text-[28px] mb-4 md:mb-6 leading-relaxed max-w-full lg:max-w-[592px]">
                '브랜드 경험'을 원하는 곳, 어디로든 옮기다
              </p>
              <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed max-w-full lg:max-w-[325px]">
                "단 며칠 만에 고객을 사로잡는 강력한 '브랜드 경험'이 필요하십니까?
                위트의 '작업자들'은 브랜드의 아이덴티티를 모듈러의 속도와 결합합니다.
                정해진 장소와 시간에 얽매이지 않고, 원하는 곳 어디든 당신의 브랜드를
                가장 감각적으로 펼쳐 보일 수 있습니다. 빠른 설치와 철거, 완벽한 브랜딩 구현,
                이동성을 충족하는 가장 스마트한 비즈니스 솔루션입니다.
                당신의 브랜드가 '찾아가는 공간'이 되도록,가장 빠르고 임팩트 있는 순간을 짓습니다."
              </p>
            </div>
            <div className="lg:ml-[401px] w-full lg:w-[1514px] aspect-[16/9] lg:aspect-auto lg:h-[865px] relative">
              <Image
                src="/images/bespoke/popup-store.jpg"
                alt="Pop-up Store"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Smart Farm */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-0">
          <div className="relative lg:min-h-[867px]">
            <div className="static lg:absolute lg:left-[39px] lg:top-[57px] z-10 px-4 md:px-8 lg:px-0 mb-8 lg:mb-0">
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-2 leading-tight max-w-full lg:max-w-[723px]">
                SMART_FARM
              </h2>
              <p className="text-[20px] md:text-[24px] lg:text-[28px] mb-4 md:mb-6 leading-relaxed max-w-full lg:max-w-[592px]">
                '데이터'가 '수확'이 되는, 농업의 미래를 짓다
              </p>
              <p className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed max-w-full lg:max-w-[443px]">
                "스마트팜은 단순한 온실이나 재배 시설이 아닌, '데이터로 농사를 짓는'
                고도로 정밀한 연구소입니다. 날씨와 계절의 제약 없이 1년 365일 안정적인 수확을 꿈꾸는
                '농업의 미래' 위트는 어떤 기술적 기반 위에서만 실현 가능한지 정확히 알고 있습니다.
                우리는 완벽한 단열과 기밀성을 갖춘 모듈 구조를 기반으로,
                작물에 최적화된 '환경 제어 시스템'(항온, 항습, 광량)과 '데이터 인프라'(IoT 센서, 관제 시스템)를
                한 치의 오차 없이 통합합니다. 당신의 '니즈'(특수 설비, 재배 방식, 미래의 확장성)에
                완벽하게 대응하는 1:1 맞춤형 설계를 통해, 기술이 농업의 한계를 넘어서는 혁신적인 공간을 짓습니다.
                당신의 기술이 가장 안정적인 '수확'이 되도록,가장 정밀하고 스마트한 '농업 환경'을 창조합니다."
              </p>
            </div>
            <div className="lg:ml-[531px] w-full lg:w-[1389px] aspect-[16/9] lg:aspect-auto lg:h-[867px] relative">
              <Image
                src="/images/bespoke/smart-farm.png"
                alt="Smart Farm"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
