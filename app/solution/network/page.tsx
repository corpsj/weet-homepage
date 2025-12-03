"use client";

// 네트워크 인터넷 솔루션 상세 페이지
const features = [
  {
    id: "satellite",
    title: "위성 인터넷",
    image: "/images/solution/satellite-detail.jpg",
    description:
      "스타링크 등 최신 저궤도 위성 인터넷을 통해 산간 오지에서도 안정적인 고속 인터넷을 제공합니다. 기존 인프라가 없는 지역에서도 최대 200Mbps의 속도로 스트리밍, 화상회의, 원격 근무가 가능합니다.",
  },
  {
    id: "lte-router",
    title: "LTE/5G 라우터",
    image: "/images/solution/lte-router-detail.jpg",
    description:
      "이동통신망을 활용한 고성능 라우터로 어디서든 즉시 인터넷 환경을 구축합니다. 다중 통신사 지원으로 최적의 신호를 자동 선택하며, 외부 안테나 연결로 음영지역에서도 강력한 수신 성능을 발휘합니다.",
  },
  {
    id: "mesh-wifi",
    title: "메시 와이파이",
    image: "/images/solution/mesh-wifi-detail.jpg",
    description:
      "주택 전체에 끊김 없는 Wi-Fi 커버리지를 제공하는 메시 네트워크 시스템입니다. 여러 개의 노드가 자동으로 최적의 연결을 유지하여 어느 위치에서든 일관된 속도를 보장합니다.",
  },
  {
    id: "network-setup",
    title: "네트워크 설치",
    image: "/images/solution/network-setup-detail.jpg",
    description:
      "전문 기술자가 현장 환경을 분석하여 최적의 네트워크 구성을 설계하고 설치합니다. 유선 LAN, 무선 AP 배치, 보안 설정까지 원스톱으로 완벽한 네트워크 인프라를 구축해 드립니다.",
  },
];

export default function NetworkSolutionPage() {
  return (
    <div className="min-h-screen bg-[#EBEBEB]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold">
              네트워크솔루션
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
