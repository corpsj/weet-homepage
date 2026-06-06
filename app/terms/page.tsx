import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관',
  description: '위트(WEET) 이용약관 안내 페이지입니다.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    url: '/terms',
    title: '이용약관',
    description: '위트(WEET) 이용약관 안내 페이지입니다.',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-32 pt-16 sm:px-6 md:pt-20 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white p-8 shadow-sm md:p-12 lg:p-16">
        <h1 className="mb-8 border-b border-gray-200 pb-6 text-3xl font-black text-gray-900 md:text-5xl">
          이용약관
        </h1>

        <div className="prose prose-lg max-w-none space-y-10 text-gray-600">
          <p className="text-sm font-bold text-gray-400">최종 수정일: 2026년 6월 7일</p>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제1조 (목적)</h2>
            <p>
              본 약관은 주식회사 위트(이하 "회사")가 운영하는 홈페이지에서 제공하는 이동식주택 정보,
              제품 구성, 상담 요청, 프로젝트·솔루션 콘텐츠, 관리자 운영과 관련한 이용 조건을 정합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제2조 (서비스의 내용)</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>이동식주택 및 모듈러 건축 제품, 프로젝트, 솔루션 정보 제공</li>
              <li>모델과 옵션을 선택해 예상 구성을 확인하는 온라인 구성 도구 제공</li>
              <li>구성 스냅샷을 기반으로 한 상담 요청 접수와 후속 연락</li>
              <li>기존 문의, A/S, 현장 확인, 제작·운반·설치 관련 안내</li>
              <li>관리자 계정을 통한 제품, 프로젝트, 상담, 문의 데이터 운영</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제3조 (예상 견적과 상담)</h2>
            <p>
              홈페이지에서 표시되는 예상 총액은 선택한 모델과 옵션을 기준으로 산출한 참고 금액입니다.
              실제 계약 금액과 일정은 현장 진입 조건, 인허가, 기초·전기·상하수도 등 별도 공사, 운반 거리,
              자재와 제작 일정에 따라 달라질 수 있습니다. 상담 요청 시 저장되는 구성 스냅샷은 후속 상담과
              견적 검토를 위한 내부 기록으로 사용됩니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제4조 (계약과 설치 확정)</h2>
            <p>
              홈페이지 상담 요청만으로 제작, 운반, 설치 계약이 체결되는 것은 아닙니다. 최종 계약은 회사와
              이용자가 현장 조건, 설계 범위, 제작 사양, 설치 일정, 대금 조건을 별도로 확인한 뒤 서면 계약
              또는 이에 준하는 합의로 확정됩니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제5조 (이용자의 의무)</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>이용자는 상담에 필요한 이름, 연락처, 지역, 설치 주소, 현장 조건을 사실에 맞게 입력해야 합니다.</li>
              <li>타인의 개인정보나 권리를 침해하는 내용, 허위 문의, 자동화된 대량 요청을 등록해서는 안 됩니다.</li>
              <li>인허가, 토지 이용 가능성, 현장 접근성 등 이용자 측 확인이 필요한 사항은 상담 과정에서 성실히 공유해야 합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제6조 (콘텐츠와 이용 권리)</h2>
            <p>
              홈페이지에 게시된 제품 이미지, 프로젝트 사진, 도면성 참고 이미지, 문구, 로고, 영상, UI 구성 등
              모든 콘텐츠의 권리는 회사 또는 정당한 권리자에게 있습니다. 이용자는 서비스 이용과 상담 검토
              목적 범위에서만 콘텐츠를 열람할 수 있으며, 회사의 사전 동의 없이 복제, 배포, 2차 저작물 제작,
              영리적 이용을 할 수 없습니다.
            </p>
            <p className="mt-4">
              이용자가 상담이나 문의 과정에서 제공한 메모, 현장 정보, 요청 사항은 상담 응대와 견적 검토,
              내부 운영 기록을 위해 사용할 수 있습니다. 이용자가 회사에 전달하는 이미지, 자료, 텍스트가 있는
              경우 이용자는 해당 자료를 제공할 권리가 있음을 보장해야 합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 md:text-2xl">제7조 (책임의 제한)</h2>
            <p>
              회사는 홈페이지 정보의 정확성을 유지하기 위해 노력하지만, 제품 사양, 가격, 일정, 이미지 표현은
              실제 상담과 계약 과정에서 변경될 수 있습니다. 천재지변, 기상 악화, 운송 제한, 인허가 지연,
              이용자가 제공한 정보의 부정확성으로 발생한 지연이나 추가 비용에 대해서는 회사의 고의 또는
              중대한 과실이 없는 한 책임이 제한됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
