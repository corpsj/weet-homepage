'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

const COPY: Record<Language, {
  title: string;
  description: string;
  backHome: string;
  recommendedNav: string;
  products: string;
  customize: string;
  projects: string;
  support: string;
}> = {
  KO: {
    title: '페이지를 찾을 수 없습니다',
    description: '요청하신 페이지가 존재하지 않거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.',
    backHome: '홈으로 돌아가기',
    recommendedNav: '추천 페이지',
    products: '제품',
    customize: '맞춤 구성',
    projects: '시공 사례',
    support: '고객지원',
  },
  EN: {
    title: 'Page not found',
    description: 'The page you requested does not exist, has been renamed, or is temporarily unavailable.',
    backHome: 'Back to home',
    recommendedNav: 'Recommended pages',
    products: 'Products',
    customize: 'Customize',
    projects: 'Projects',
    support: 'Support',
  },
  ES: {
    title: 'Página no encontrada',
    description: 'La página que solicitaste no existe, cambió de nombre o no está disponible temporalmente.',
    backHome: 'Volver al inicio',
    recommendedNav: 'Páginas recomendadas',
    products: 'Productos',
    customize: 'Personalizar',
    projects: 'Proyectos',
    support: 'Soporte',
  },
};

export default function NotFound() {
    const { language } = useLanguage();
    const t = COPY[language];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
            <div className="space-y-6 max-w-lg">
                <h1 className="text-9xl font-black text-gray-900 tracking-tighter">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t.title}</h2>
                <p className="text-gray-500 text-lg">
                    {t.description}
                </p>
                <div className="pt-8 flex flex-col items-center gap-5">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02]"
                    >
                        <ArrowLeft size={18} />
                        {t.backHome}
                    </Link>
                    <nav aria-label={t.recommendedNav} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-gray-500">
                        <Link href="/products" className="hover:text-gray-900 transition-colors">{t.products}</Link>
                        <Link href="/customize" className="hover:text-gray-900 transition-colors">{t.customize}</Link>
                        <Link href="/projects" className="hover:text-gray-900 transition-colors">{t.projects}</Link>
                        <Link href="/support" className="hover:text-gray-900 transition-colors">{t.support}</Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
