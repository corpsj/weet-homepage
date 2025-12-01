export default function Footer() {
  return (
    <footer className="bg-primary py-8 md:py-12">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[140px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H40V40L0 0Z" fill="#2D2D2D" />
            </svg>
            <span className="text-[24px] md:text-[28px] font-bold text-black">weet:)</span>
          </div>

          {/* Center - Company Info */}
          <div className="flex-1 space-y-2">
            <h3 className="text-[16px] md:text-[18px] font-bold text-black">
              'WE make dreams comE True'
            </h3>
            <div className="text-[11px] md:text-[12px] text-black leading-relaxed">
              <p>(주)위트 / 대표자: 대표명 205-27 / 사업자 등록번호 660-86-01862 / 010 1234 4567</p>
            </div>
          </div>

          {/* Right side - Copyright and Links */}
          <div className="text-left md:text-right space-y-2 flex-shrink-0">
            <p className="text-[11px] md:text-[12px] font-bold text-black whitespace-nowrap">
              Copyright © weet All right reserved
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-black">
              <a href="#" className="hover:underline">개인정보 처리방침</a>
              <span>/</span>
              <a href="#" className="hover:underline">이용약관</a>
              <span>/</span>
              <a href="#" className="hover:underline">회사소개</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
