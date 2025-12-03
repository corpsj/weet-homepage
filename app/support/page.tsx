export default function SupportPage() {
  const steps = [
    {
      number: 1,
      title: "꿈을 듣습니다 (1:1 맞춤 상담)",
      description:
        "당신의 '로망'과 구체적인 '니즈'를 위트의 '작업자들'에게 편안하게 들려주세요. 우리는 기술적인 조언 이전에, 당신의 이야기를 먼저 경청합니다. 이 공간을 '왜' 짓는지, 그 목적을 공유하는 것이 이 여정의 가장 중요한 첫걸음입니다.",
    },
    {
      number: 2,
      title: "땅을 읽습니다 (부지 분석 및 기획)",
      description:
        "'로망'이 '현실'이 될 수 있도록, 우리의 '작업자들'이 직접 현장을 방문하여 부지의 특성과 법규를 꼼꼼하게 분석합니다. 당신의 꿈이 뿌리내릴 땅을 읽고, 고객의 '니즈'를 100% 충족시킬 가장 최적화된 기획안을 제안합니다.",
    },
    {
      number: 3,
      title: "꿈을 그립니다 (상세 설계 및 계약)",
      description:
        "추상적이었던 '로망'이 눈에 보이는 '디자인'으로, 구체적인 '니즈'가 한 치의 오차 없는 '설계도'로 완성됩니다. 자재부터 마감까지 모든 세부 사항을 1:1로 조율하고, 투명한 견적을 바탕으로 우리가 실현할 꿈의 내용을 명확하게 약속(계약)합니다.",
    },
    {
      number: 4,
      title: "정밀하게 짓습니다 (모듈 공장 제작)",
      description:
        "당신의 꿈이 위트 '작업자들'의 손에서 견고한 실체로 태어납니다. 날씨와 현장 변수로부터 자유로운 최첨단 실내 공장에서, 숙련된 기술력으로 오차 없는 완벽한 품질의 모듈을 제작합니다.",
    },
    {
      number: 5,
      title: "현장에 세웁니다 (운송 및 현장 설치)",
      description:
        "공장에서 정밀하게 완성된 모듈이 현장으로 안전하게 이동합니다. 위트 '작업자들'의 전문적인 지휘 아래, 최소한의 현장 작업으로 빠르고 정확하게 당신의 공간을 완성하고 세밀한 마감 작업을 진행합니다.",
    },
    {
      number: 6,
      title: "여정의 완성 (인도 및 사후관리)",
      description:
        "당신의 '로망'과 '니즈'가 완벽하게 구현되었는지 '작업자들'과 함께 꼼꼼하게 확인합니다. 공간의 인도는 이 여정의 끝이 아닌, 당신의 꿈이 시작되는 순간입니다. 위트는 우리가 지은 공간을 책임감 있게 관리하며 당신의 새로운 여정을 응원합니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section 1: 구매과정 (Purchase Process) */}
      <section className="bg-[#EBEBEB] py-12 md:py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[123px] relative z-10">

          <div className="flex flex-col xl:flex-row gap-12 xl:gap-[150px]">
            {/* Left Column: Title & Description */}
            <div className="flex-shrink-0 xl:w-[500px]">
              <div className="mb-12">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-[26px] h-[27px] relative mt-2 flex-shrink-0">
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H26V27L0 0Z" fill="black" />
                    </svg>
                  </div>
                  <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-tight text-black">
                    당신의 꿈을<br />짓는 여정
                  </h1>
                </div>

                <div className="max-w-xl">
                  <p className="text-[18px] lg:text-[20px] leading-relaxed font-medium text-black break-keep">
                    "꿈이 현실이 되는 과정은 낯설거나 복잡해서는 안 됩니다.<br /><br />
                    위트의 숙련된 '작업자들'이 이 여정의 처음부터 끝까지 당신과 함께 걷습니다.<br /><br />
                    당신의 '로망'이 어떻게 '설계'가 되고, '니즈'가 어떻게 '기술'로 구현되는지, 모든 과정을 투명하게 공유하며 당신의 꿈을 가장 견고한 현실로 완성합니다."
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Steps Grid (3x2) */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col">
                    {/* Step Header (Yellow Box) */}
                    <div className="bg-primary h-[70px] w-full flex flex-col justify-center items-center text-center px-2 mb-4 rounded-sm">
                      <span className="text-[14px] font-bold mb-1">STEP .{step.number}</span>
                      <span className="text-[14px] font-bold leading-tight break-keep">{step.title}</span>
                    </div>

                    {/* Step Image Placeholder */}
                    <div className="bg-white h-[167px] w-full mb-6 rounded-sm border border-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Image {step.number}</span>
                    </div>

                    {/* Step Description */}
                    <p className="text-[14px] leading-relaxed text-gray-800 break-keep">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Q/A and F/Q */}
      <section className="bg-[#EBEBEB] py-12 md:py-20 lg:py-32 border-t border-gray-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[123px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 lg:gap-32">
            {/* Q/A Section */}
            <div>
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8">Q/A</h2>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 mb-8">
                자주 묻는 질문들을 확인하세요
              </p>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg">Q. 설치까지 얼마나 걸리나요?</span>
                      <span className="text-primary-dark text-xl">+</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      계약 후 공장에서 제작 완료까지 약 4~6주가 소요되며, 현장 설치는 1~2일이면 충분합니다.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* F/Q Section */}
            <div>
              <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8">F/Q</h2>
              <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600 mb-8">
                1:1 문의하기
              </p>

              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">이름</label>
                    <input type="text" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary" placeholder="홍길동" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">연락처</label>
                    <input type="tel" className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-primary" placeholder="010-0000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">문의내용</label>
                    <textarea className="w-full border border-gray-300 p-3 rounded h-32 focus:outline-none focus:border-primary" placeholder="문의하실 내용을 입력해주세요."></textarea>
                  </div>
                  <button className="w-full bg-black text-white py-4 rounded font-bold hover:bg-gray-800 transition-colors">
                    문의하기
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 방문예약 (Reservation) */}
      <section className="bg-[#EBEBEB] py-12 md:py-20 lg:py-32 border-t border-gray-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[123px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {/* 방문예약 */}
            <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-2">방문예약</h2>
              <p className="text-[15px] md:text-[16px] lg:text-[18px] mb-4 md:mb-6">Showroom / Model House</p>
              <button className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-gray-800 transition-colors text-[13px] md:text-[14px]">
                방문예약하기
              </button>
            </div>

            {/* 상담문의 */}
            <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-2">상담문의</h2>
              <p className="text-[15px] md:text-[16px] lg:text-[18px] mb-4 md:mb-6">1:1 Consultation</p>
              <button className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-gray-800 transition-colors text-[13px] md:text-[14px]">
                1:1 상담 문의하기
              </button>
            </div>

            {/* 견적문의 */}
            <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-2">견적문의</h2>
              <p className="text-[15px] md:text-[16px] lg:text-[18px] mb-4 md:mb-6">Request a Quote</p>
              <button className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-gray-800 transition-colors text-[13px] md:text-[14px]">
                예측 견적 문의하기
              </button>
            </div>

            {/* 사업문의 */}
            <div className="text-center bg-white p-6 md:p-8 rounded-lg shadow-md sm:col-span-2 lg:col-span-1">
              <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold mb-2">사업문의</h2>
              <p className="text-[15px] md:text-[16px] lg:text-[18px] mb-4 md:mb-6">Business Inquiry</p>
              <button className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded hover:bg-gray-800 transition-colors text-[13px] md:text-[14px]">
                예측 견적 문의하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: A/S */}
      <section className="bg-[#EBEBEB] py-12 md:py-20 lg:py-32 border-t border-gray-300">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[123px]">
          <h2 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold mb-6 md:mb-8">A/S</h2>
          <p className="text-[14px] md:text-[15px] lg:text-[16px] text-gray-600">
            제품 A/S 및 사후 관리 서비스
          </p>
        </div>
      </section>
    </div>
  );
}
