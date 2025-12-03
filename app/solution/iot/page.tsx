"use client";

// IOT 스마트홈 솔루션 상세 페이지
const features = [
  {
    id: "smart-lighting",
    title: "스마트 조명",
    image: "/images/solution/smart-lighting-detail.jpg",
    description:
      "음성 명령이나 앱으로 조명을 제어합니다. 시간대별 자동 조절, 분위기에 맞는 색온도 변경, 외출 시 자동 소등 등 스마트한 조명 관리로 에너지를 절약하고 편리한 생활을 누리세요.",
  },
  {
    id: "climate-control",
    title: "냉난방 제어",
    image: "/images/solution/climate-detail.jpg",
    description:
      "AI가 사용 패턴을 학습하여 최적의 실내 온도를 유지합니다. 외출 전 미리 에어컨이나 난방을 가동하고, 불필요한 에너지 낭비를 줄여 쾌적하면서도 경제적인 주거 환경을 만들어 드립니다.",
  },
  {
    id: "smart-lock",
    title: "스마트 도어락",
    image: "/images/solution/smart-lock-detail.jpg",
    description:
      "지문, 비밀번호, 카드, 앱 등 다양한 방식으로 출입을 관리합니다. 방문자에게 임시 비밀번호를 발급하고, 출입 기록을 실시간으로 확인하여 안전하고 편리한 출입 환경을 제공합니다.",
  },
  {
    id: "voice-assistant",
    title: "음성 비서",
    image: "/images/solution/voice-assistant-detail.jpg",
    description:
      "구글 어시스턴트, 아마존 알렉사, 애플 시리 등과 연동하여 음성으로 모든 스마트 기기를 제어합니다. 손을 사용하지 않고도 조명, 에어컨, TV 등을 간편하게 조작할 수 있습니다.",
  },
];

export default function IOTSolutionPage() {
  return (
    <div className="min-h-screen bg-[#EBEBEB]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold">
              스마트홈솔루션
            </h1>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col">
                {/* Title */}
                <h3 className="text-[16px] md:text-[18px] font-bold mb-4 text-center">
                  {feature.title}
                </h3>

                {/* Image Placeholder */}
                <div className="w-full aspect-[4/3] bg-gray-300 rounded-lg mb-4" />

                {/* Description */}
                <p className="text-[11px] md:text-[12px] text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
