import Image from 'next/image';

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-100 py-12 md:py-16 lg:py-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[123px]">
          {/* Title with diagonal corner */}
          <div className="relative mb-12 md:mb-16 lg:mb-20">
            <div className="absolute left-0 top-0 w-[35px] h-[36px] md:w-[43px] md:h-[44px] lg:w-[50px] lg:h-[51px] bg-black transform -skew-x-12"></div>
            <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold ml-12 md:ml-14 lg:ml-16">SOLUTION</h1>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {/* CCTV Solution */}
            <div className="p-4 md:p-0">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-[80px] h-[78px] md:w-[90px] md:h-[88px] lg:w-[107px] lg:h-[104px] relative">
                  <Image
                    src="/images/solution/cctv.png"
                    alt="CCTV 보안 솔루션"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mb-3 md:mb-4">
                <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-bold mb-2">
                  <span className="bg-yellow-300 px-1.5 md:px-2">CCTV (보안 솔루션)</span>
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed">
                  "언제든, 어디서든, 우리 집을 안전하게 지키세요."
                </p>
              </div>

              <p className="text-[12px] md:text-[13px] leading-relaxed mb-4 md:mb-6 lg:min-h-[130px]">
                고객님의 이동식 주택을 위한 보안 모니터링 시스템을 제공합니다.
                24시간 실시간 스트리밍 및 녹화 기능을 통해 언제든 전용 앱으로
                주택 내외부를 안전하게 확인하고, 침입 감지 시 즉각적인 푸시 알림을
                받아 신속하게 대응할 수 있습니다.
              </p>

              <select className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded text-[13px] md:text-[14px]">
                <option>가격</option>
              </select>
            </div>

            {/* Network Solution */}
            <div className="p-4 md:p-0">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-[80px] h-[78px] md:w-[90px] md:h-[88px] lg:w-[108px] lg:h-[106px] relative">
                  <Image
                    src="/images/solution/network.png"
                    alt="네트워크 인터넷 솔루션"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mb-3 md:mb-4">
                <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-bold mb-2">
                  <span className="bg-yellow-300 px-1.5 md:px-2">네트워크(인터넷 솔루션)</span>
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed">
                  "어디에서도 끊김 없는 인터넷, 산 속에서도 자유로운 소통."
                </p>
              </div>

              <p className="text-[12px] md:text-[13px] leading-relaxed mb-4 md:mb-6 lg:min-h-[130px]">
                인터넷 음영지역 및 산간 지역에서도 최대 1Gbps 이상의 안정적인
                초고속 인터넷 환경을 구축합니다. 위성, LTE/5G 라우터, 또는 고성능
                무선 브릿지 솔루션을 활용하여 이동식 주택 내 Wi-Fi 및 유선 LAN
                네트워크를 완벽하게 구현함으로써, 어떤 환경에서든 끊김 없는
                연결성을 보장합니다.
              </p>

              <select className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded text-[13px] md:text-[14px]">
                <option>가격</option>
              </select>
            </div>

            {/* IOT Solution */}
            <div className="p-4 md:p-0">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-[80px] h-[78px] md:w-[95px] md:h-[92px] lg:w-[117px] lg:h-[109px] relative">
                  <Image
                    src="/images/solution/iot.png"
                    alt="IOT 스마트홈 솔루션"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mb-3 md:mb-4">
                <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-bold mb-2">
                  <span className="bg-yellow-300 px-1.5 md:px-2">IOT(스마트 홈 솔루션)</span>
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed">
                  "집 전체를 스마트하게, 이동식 주택의 편리함을 극대화하세요."
                </p>
              </div>

              <p className="text-[12px] md:text-[13px] leading-relaxed mb-4 md:mb-6 lg:min-h-[130px]">
                이동식 주택의 모든 기능을 통합 관리하는 스마트 홈 플랫폼을 구현합니다.
                조명, 냉난방, 도어락, 주요 가전제품 등을 전용 앱 또는 음성 제어 시스템으로
                원격 관리하며, AI 기반의 자율적 제어를 통해 에너지 효율을 극대화하고
                최적화된 생활 편의성을 제공합니다.
              </p>

              <select className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded text-[13px] md:text-[14px]">
                <option>가격</option>
              </select>
            </div>

            {/* Design Solution */}
            <div className="p-4 md:p-0">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="w-[78px] h-[80px] md:w-[86px] md:h-[90px] lg:w-[96px] lg:h-[102px] bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-[28px] md:text-[34px] lg:text-[40px]">✏️</span>
                </div>
              </div>

              <div className="mb-3 md:mb-4">
                <h3 className="text-[16px] md:text-[17px] lg:text-[18px] font-bold mb-2">
                  <span className="bg-yellow-300 px-1.5 md:px-2">Design (디자인 컨설팅 솔루션)</span>
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed">
                  "당신의 '로망'이 '공간'이 되는 순간"
                </p>
              </div>

              <p className="text-[12px] md:text-[13px] leading-relaxed mb-4 md:mb-6 lg:min-h-[130px]">
                "훌륭한 디자인은 단지 아름답기만 한 것이 아니라, 당신의 '로망(꿈)'과 '니즈(필요)'가
                완벽하게 조화된 공간을 의미합니다. 위트의 '작업자들(디자인팀)'은 당신의 라이프스타일,
                브랜드 철학, 그리고 숨겨진 열망까지 읽어내어 세상에 단 하나뿐인 최적의 공간 솔루션을
                제안합니다."
              </p>

              <select className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded text-[13px] md:text-[14px]">
                <option>가격</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
