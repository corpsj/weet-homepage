import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-primary py-4 md:py-6">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[140px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8">
          {/* Left side - Logo */}
          <div className="flex items-center gap-3 flex-shrink-0 -my-4 md:-my-6 pb-2">
            <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
              <Image
                src="/images/company/weet-logo.png"
                alt="weet:) 로고"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Center - Company Info */}
          <div className="flex-1 space-y-1 md:ml-4 pb-1">
            <h3 className="text-[20px] md:text-[28px] font-bold text-black font-serif leading-none mb-2">
              'WE make dreams comE <Link href="/admin" className="cursor-default text-inherit hover:no-underline">True</Link>'
            </h3>
            <div className="text-[11px] md:text-[12px] text-black leading-relaxed font-medium">
              <p>(주)위트 &nbsp;|&nbsp; 함평군 대동면 금산길 205-27 &nbsp;|&nbsp; 사업자 등록번호 660-86-01862 &nbsp;|&nbsp; 010 1234 4567</p>
            </div>
          </div>

          {/* Right side - Copyright and Links */}
          <div className="text-left md:text-right space-y-1 flex-shrink-0">
            <p className="text-[11px] md:text-[12px] font-bold text-black whitespace-nowrap">
              Copyright © weet All right reserved
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] md:text-[11px] text-black md:justify-end font-bold">
              <Link href="/privacy" className="hover:underline">개인정보 처리방침</Link>
              <span>|</span>
              <Link href="/terms" className="hover:underline">이용약관</Link>
              <span>|</span>
              <Link href="/company" className="hover:underline">회사소개</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
