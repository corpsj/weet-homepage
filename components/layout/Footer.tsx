import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[150px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          {/* Left: Company Info */}
          <div className="space-y-2">
            <div className="text-lg md:text-xl lg:text-2xl font-bold text-black">
              WE make dreams com<span className="text-black">E</span> True
            </div>
            <div className="text-[11px] md:text-xs lg:text-sm text-gray-700 leading-relaxed">
              (주)위트 / 함평군 대동면 금산길 205-27<br className="md:hidden" /> / 사업자 등록번호 660-86-01862<br className="md:hidden" /> / 010 1234 4567
            </div>
          </div>

          {/* Right: Copyright & Links */}
          <div className="text-left md:text-right space-y-2">
            <div className="text-[11px] md:text-xs lg:text-sm font-medium text-black">
              Copyright © weet All right reserved
            </div>
            <div className="text-[11px] md:text-xs lg:text-sm text-gray-700 flex flex-wrap gap-2 md:justify-end">
              <Link href="/privacy" className="hover:text-black transition-colors whitespace-nowrap">
                개인정보 처리방침
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/terms" className="hover:text-black transition-colors whitespace-nowrap">
                이용약관
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/company" className="hover:text-black transition-colors whitespace-nowrap">
                회사소개
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
