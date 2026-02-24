import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
            <div className="space-y-6 max-w-lg">
                <h1 className="text-9xl font-black text-gray-900 tracking-tighter">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">페이지를 찾을 수 없습니다</h2>
                <p className="text-gray-500 text-lg">
                    요청하신 페이지가 존재하지 않거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.
                </p>
                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-primary-dark transition-all duration-200 hover:scale-[1.02]"
                    >
                        <ArrowLeft size={18} />
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}
