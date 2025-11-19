export default function Footer() {
  return (
    <footer className="bg-yellow-400 py-8 md:py-12">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[123px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left side - Logo and Company Info */}
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
            <div className="relative flex-shrink-0">
              {/* Triangle decoration */}
              <div className="absolute left-0 top-0 w-0 h-0 border-l-[30px] md:border-l-[40px] border-l-black border-t-[30px] md:border-t-[40px] border-t-transparent"></div>
              <div className="w-[100px] h-[100px] md:w-[145px] md:h-[145px] bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-[20px] md:text-[32px] font-bold text-black">weet:)</span>
              </div>
            </div>

            <div className="space-y-2 md:space-y-4">
              <h3 className="text-[20px] md:text-[32px] font-bold text-black">
                'WE make dreams comE True'
              </h3>
              <p className="text-[11px] md:text-[14px] text-black leading-relaxed">
                (주)위트 / 함평군 대동면 금산길 205-27 / 사업자 등록번호 660-86-01862 / 010 1234 4567
              </p>
            </div>
          </div>

          {/* Right side - Copyright and Links */}
          <div className="text-left md:text-right space-y-1 md:space-y-2">
            <p className="text-[12px] md:text-[16px] font-bold text-black">
              Copyright © weet All right reserved
            </p>
            <p className="text-[11px] md:text-[14px] text-black">
              개인정보 처리방침 / 이용약관 / 회사소개
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
