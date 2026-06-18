import React from 'react';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: '개인정보처리방침',
  description:
    '위트(weet) 개인정보처리방침 — 수집하는 개인정보 항목, 이용 목적, 보유 기간, 제3자 제공, 이용자 권리와 행사 방법을 안내합니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-weet-paper px-[5vw] pb-32 pt-24 md:pt-28">
      <div className="mx-auto max-w-4xl rounded-[16px] border border-weet-line bg-weet-surface p-8 shadow-weet-card md:p-12 lg:p-16">
        <h1 className="mb-8 border-b border-weet-line pb-6 text-[clamp(28px,3.4vw,46px)] font-semibold tracking-[-0.03em] text-weet-ink">
          개인정보처리방침
        </h1>

        <div className="max-w-none space-y-10 text-weet-sub">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-weet-gold-deep">
            최종 수정일: 2026년 6월 7일
          </p>

          <section>
            <h2 className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-weet-ink md:text-[24px]">1. 개인정보 처리 범위</h2>
            <p className="text-[16px] leading-[1.85] kr-balance">
              주식회사 위트(WEET)는 홈페이지에서 이동식주택 구성 상담, 기존 문의 응대, 관리자 운영,
              서비스 이용 통계 확인에 필요한 최소한의 개인정보를 처리합니다. 온라인 예상 견적은 상담을
              시작하기 위한 참고 정보이며, 최종 계약 정보는 별도 상담과 계약 절차에서 확정됩니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-weet-ink md:text-[24px]">2. 수집 항목</h2>
            <ul className="mt-2 list-disc space-y-3 pl-5 text-[16px] leading-[1.85] kr-balance marker:text-weet-gold-deep">
              <li>
                <strong className="font-semibold text-weet-ink">주문 구성 상담:</strong> 이름, 연락처, 지역, 예상 구매 시기,
                설치할 장소 지목, 구매 예산, 설치 주소, 추가 메모, 선택 모델, 선택 옵션, 예상 총액,
                구성 URL, 구성 스냅샷(모델·옵션·포함 사양·금액·생성 시각)을 저장합니다.
              </li>
              <li>
                <strong className="font-semibold text-weet-ink">기존 문의:</strong> 이름, 연락처, 이메일(선택), 문의 내용,
                문의 분류, 처리 상태, 답변 내용과 답변 시각을 저장할 수 있습니다.
              </li>
              <li>
                <strong className="font-semibold text-weet-ink">관리자 이용:</strong> Supabase 인증을 위한 관리자 이메일,
                로그인 세션 쿠키, 관리자 화면에서 입력한 처리 상태와 내부 메모를 처리합니다.
              </li>
              <li>
                <strong className="font-semibold text-weet-ink">자동 생성 정보:</strong> 서비스 이용 과정에서 IP 주소,
                브라우저 정보, 접속 일시, 페이지 이용 기록, 쿠키가 생성될 수 있습니다.
              </li>
              <li>
                <strong className="font-semibold text-weet-ink">분석 도구:</strong> Vercel Analytics는 기본 방문 통계를
                처리할 수 있으며, Google Analytics와 Microsoft Clarity는 환경변수로 설정된 경우에만
                로드되어 페이지 이용 통계를 처리합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-weet-ink md:text-[24px]">3. 이용 목적</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-[16px] leading-[1.85] kr-balance marker:text-weet-gold-deep">
              <li>선택한 모델과 옵션을 바탕으로 주문 요청을 접수하고 구성 내용을 확인합니다.</li>
              <li>현장 조건, 설치 가능성, 예상 일정, 견적 범위를 안내합니다.</li>
              <li>기존 문의와 A/S 관련 요청을 확인하고 답변합니다.</li>
              <li>관리자 화면에서 상담, 문의, 프로젝트, 제품 정보를 운영합니다.</li>
              <li>서비스 안정성, 유입 경로, 인기 페이지 등 비즈니스 운영 지표를 확인합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-weet-ink md:text-[24px]">4. 보유 및 삭제</h2>
            <p className="text-[16px] leading-[1.85] kr-balance">
              상담과 문의 정보는 응대, 견적 검토, 분쟁 대응 등 이용 목적에 필요한 기간 동안 보관합니다.
              이용자가 삭제를 요청하거나 보관 목적이 종료된 경우 관리자가 관리자 화면에서 수동으로 삭제할
              수 있습니다. 단, 계약·대금 결제·소비자 분쟁 등 관계 법령에 따라 보관해야 하는 정보는 해당
              기간 동안 보관할 수 있습니다.
            </p>
            <p className="mt-4 text-[16px] leading-[1.85] kr-balance">
              Supabase 인증 쿠키와 세션 정보는 인증 상태 유지와 보안을 위해 사용되며, 만료·로그아웃·브라우저
              설정에 따라 삭제됩니다. 분석 도구가 처리하는 정보의 보관 기간과 삭제 방식은 각 제공사의 정책을
              따릅니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-weet-ink md:text-[24px]">5. 처리 위탁 및 제3자 도구</h2>
            <p className="text-[16px] leading-[1.85] kr-balance">
              위트는 서비스 제공을 위해 Supabase(데이터베이스와 인증), Vercel(호스팅과 기본 분석),
              Google Analytics(설정된 경우), Microsoft Clarity(설정된 경우)를 사용할 수 있습니다. 각 도구는
              서비스 운영, 보안, 통계 확인 목적에 한해 사용됩니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-[20px] font-semibold tracking-[-0.02em] text-weet-ink md:text-[24px]">6. 이용자의 권리</h2>
            <p className="text-[16px] leading-[1.85] kr-balance">
              이용자는 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 요청은 아래 연락처로
              접수할 수 있으며, 위트는 본인 확인 후 가능한 범위에서 지체 없이 처리합니다.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[16px] leading-[1.85] kr-balance marker:text-weet-gold-deep">
              <li>담당 부서: 고객지원팀</li>
              <li>연락처: 010-9645-2348</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
