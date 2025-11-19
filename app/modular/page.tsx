import Image from 'next/image';

export default function ModularPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: Main Introduction */}
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left: Illustration */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full max-w-[563px] aspect-[563/449] mx-auto mb-6 md:mb-8">
                <Image
                  src="/images/modular/main-image.png"
                  alt="모듈러 건축 크레인 일러스트"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Bottom Items - Moved below image */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] font-bold">모듈러 형태 ( Volumetric Module )</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <p className="text-[15px] md:text-[16px] lg:text-[18px]">사전제작 ( Prefabrication )</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <p className="text-[15px] md:text-[16px] lg:text-[18px]">탈현장 건설 OSC ( Off-Site Construction )</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <p className="text-[15px] md:text-[16px] lg:text-[18px]">조립방식의 건축 ( Prefabricated Building )</p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-relaxed mb-6 md:mb-8">
                '모듈러 건축'은 빠른 속도, 정확한 품질, 유연한 공간을 모두 제공하는 가장 진보된 건축 솔루션입니다.
              </h1>

              <div className="text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed space-y-3 md:space-y-4 mb-8 md:mb-10 lg:mb-12">
                <p>우리의 건축 철학: 더 나은 삶을 위한 합리적 기술</p>

                <p>우리는 집이 더 합리적이고 효율적인 방식으로 지어져야 한다고 믿습니다.</p>

                <p>
                  기존의 현장 중심 건축은 날씨, 환경, 작업자의 숙련도 같은 수많은 변수에 의존해왔습니다.
                  우리는 기술을 통해 이러한 불확실성을 제거하는 것에서부터 시작합니다.
                </p>

                <p>
                  우리의 해답은 '탈현장건설(Off-Site Construction)'입니다. 우리는 현장이 아닌,
                  모든 조건이 통제된 공장에서 집의 핵심 구성요소 90%를 '사전제작'합니다.
                </p>

                <p>
                  이는 단순히 속도를 위한 것이 아닙니다. 계절과 날씨에 관계없이 언제나 정밀하고
                  균일한 최고 품질을 확보하기 위한 원칙입니다.
                </p>

                <p>
                  또한, 현장의 소음, 분진, 폐기물을 최소화하여 환경과 이웃에 미치는 영향을 줄이는 것이
                  우리가 지향하는 방식입니다.
                </p>

                <p>
                  공장에서 완성된 모듈은 고객의 대지에서 약속된 일정에 맞춰 '조립'됩니다.
                  수개월이 소요되던 현장 공정을 획기적으로 단축함으로써, 고객은 정확한 예산과
                  예측 가능한 일정 안에서 완벽한 공간을 만나게 됩니다.
                </p>

                <p>우리는 이것을 '시간과 자원의 효율적 사용'이라 부릅니다.</p>

                <p>
                  마지막으로, 우리가 제공하는 집의 '형태'는 고정되어 있지 않습니다. 모듈러 건축의 본질은 '유연성'입니다.
                </p>

                <p>
                  표준화된 모듈의 조합을 통해 고객의 개성을 반영한 다양한 설계가 가능하며,
                  삶의 주기에 따라 공간을 '확장'하거나 '축소'할 수 있습니다.
                </p>

                <p>
                  심지어 필요시 집을 '이동'시켜 자산으로서의 가치를 이어갈 수도 있습니다.
                </p>

                <p>
                  우리의 철학은 명확합니다. 기술을 통해 건축의 불확실성을 제거하고,
                  고객에게는 더 빠르고, 더 견고하며, 더 유연한 삶의 기반을 제공하는 것.
                </p>

                <p>이것이 우리가 모듈러 건축을 통해 구현하려는 가치입니다.</p>
              </div>

              <div className="flex justify-end">
                <p className="text-[12px] md:text-[13px] lg:text-[14px] font-semibold">-주식회사 위트-</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 모듈러 형태 */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] lg:h-[500px] bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-base">모듈러 이미지</span>
            </div>

            <div>
              <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold mb-4 md:mb-5 lg:mb-6">모듈러 형태 ( Volumetric Module )</h2>

              <p className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold mb-6 md:mb-7 lg:mb-8">
                weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.
              </p>

              <div className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
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
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 사전제작 */}
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] lg:h-[500px] bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-base">사전제작 이미지</span>
            </div>

            <div>
              <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold mb-4 md:mb-5 lg:mb-6">사전제작 ( Prefabrication )</h2>

              <p className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold mb-6 md:mb-7 lg:mb-8">
                weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.
              </p>

              <div className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
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
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 탈현장 건설 OSC */}
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] lg:h-[500px] bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-base">OSC 이미지</span>
            </div>

            <div>
              <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold mb-4 md:mb-5 lg:mb-6">탈현장 건설 OSC ( Off-Site Construction )</h2>

              <p className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold mb-6 md:mb-7 lg:mb-8">
                weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.
              </p>

              <div className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
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
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: 조립방식의 건축 */}
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[140px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] lg:h-[500px] bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm md:text-base">조립 이미지</span>
            </div>

            <div>
              <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-bold mb-4 md:mb-5 lg:mb-6">조립방식의 건축 ( Prefabricated Building )</h2>

              <p className="text-[16px] md:text-[17px] lg:text-[18px] font-semibold mb-6 md:mb-7 lg:mb-8">
                weet의 모듈러 기술력은 '시그니처 라인'의 검증된 품질로 이미 증명되었습니다.
              </p>

              <div className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] lg:text-[15px] leading-relaxed">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
