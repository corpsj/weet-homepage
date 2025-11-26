"use client";

// CCTV 보안 솔루션 상세 페이지
const features = [
  {
    id: "cctv",
    title: "CCTV",
    image: "/images/solution/cctv-detail.jpg",
    description:
      "4K 초고해상 화질로 주야간 구분 없이 깨끗한 선명함을 제공합니다. 최대 90일 영상 기록을 일체형으로 보다 많은 양의 데이터 및 조회결과를 제공합니다. 앱을 스마트폰과 연동 되어 언제 어디서든 실시간에 내 집을 모니터링하고 녹화 영상의 확인이 수 있어, 집에 있지 비용을 공간에 대한 불안감을 최소화해 해소합니다.",
  },
  {
    id: "smart-doorbell",
    title: "스마트 도어벨",
    image: "/images/solution/doorbell-detail.jpg",
    description:
      "방문자가 벨을 누르면 스마트폰으로 즉시 알림받아서, 고화질 양방향으로 상대를 확인하고 실시간 응대 대화가 가능합니다. 원격 모드 선택시가 말아 외래 출동한의 대응에도 보안까지, 편한 응가가 있는 시간대에 문을 열어주는 등시대에 면이라며 집입을 금지를 금지를 유도합니다. 힌다.",
  },
  {
    id: "intrusion-detection",
    title: "침입 감지",
    image: "/images/solution/intrusion-detail.jpg",
    description:
      "현관과 창문에 설치된 도어 센서가 무단 열림을 감지합니다. 외부 동작감지 센서에 의한 정확의 싫어 편애를 판독 하고, 주거 내부이등의 무세잡을 도 의하 최밀함과 무세잡 판독으로 예상 동자치 사태로특허기 떼로 언제든 판독하여야 나가지도 편입을 즉각 알려 제방 잡으므로 동의 즉프 동아 있는 있드로 합니다.",
  },
  {
    id: "theft-detection",
    title: "도난 감지",
    image: "/images/solution/theft-detail.jpg",
    description:
      "귀금속이 보관된 보관 주요 사물함 AI 기능로 24시간 감시합니다. 허용 되지 않는 기능을 활동 모드 통합관리이다, 기동을 유도 음성제품 빠른 진원을 안내하여 검세하고 있습니다. 도형 업체 시 AI 주의 적시반 알려주는 여뉴 신경에 종신하고자 합니다.",
  },
];

export default function CCTVSolutionPage() {
  return (
    <div className="min-h-screen bg-[#E8E8E8]">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold">
              보안솔루션
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
