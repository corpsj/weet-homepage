import Link from 'next/link';
import { cn } from '@/lib/utils';

export function FooterV2() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          <div className="flex flex-col gap-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md w-fit"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-black text-base">
                weet:)
              </div>
            </Link>
            <p className="text-xl font-medium">위트있는 집, 위트있는 삶</p>
            <div className="text-gray-400 text-sm leading-relaxed space-y-1">
              <p>주식회사 위트</p>
              <p>함평군 대동면 금산길 205-27</p>
              <p>사업자등록번호 660-86-01862</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:ml-8">
            <h3 className="text-lg font-semibold">제품</h3>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li>
                <Link href="/products?category=3x6" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  3X6 집
                </Link>
              </li>
              <li>
                <Link href="/products?category=3x9" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  3X9 집
                </Link>
              </li>
              <li>
                <Link href="/products?category=18py" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  18평 단독주택
                </Link>
              </li>
              <li>
                <Link href="/products?category=25py" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  25평 단독주택
                </Link>
              </li>
              <li>
                <Link href="/products?category=30py" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  30평 단독주택
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">서비스</h3>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li>
                <Link href="/modular" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  모듈러건축 소개
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  BESPOKE
                </Link>
              </li>
              <li>
                <Link href="/solution" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  SOLUTION
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                  고객지원
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">연결</h3>
            <ul className="flex flex-col gap-3 text-gray-400 text-sm">
              <li>
                <a 
                  href="https://www.instagram.com/weet_kr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.daangn.com/kr/local-profile/위트weet-kihpx4ctggn6/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                >
                  당근마켓
                </a>
              </li>
              <li>
                <a 
                  href="https://blog.naver.com/we-et" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                >
                  네이버 블로그
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>Copyright &copy; weet All rights reserved</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              개인정보 처리방침
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              이용약관
            </Link>
            <p>전화: 010-9645-2348</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
