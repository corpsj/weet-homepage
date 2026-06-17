import { login } from './actions'
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 로그인',
  description: '위트(WEET) 관리자 로그인 페이지입니다.',
  alternates: {
    canonical: '/login',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    // The login server action redirects to /login?error=... on failure; surface it. (F51)
    const { error } = await searchParams;
    return (
        <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-12 text-gray-900 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative hidden min-h-[620px] bg-gray-950 lg:block">
                    <Image
                        src="/images/company/factory.webp"
                        alt="위트 제작 현장"
                        fill
                        sizes="50vw"
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-400">WEET OPERATIONS</p>
                        <h1 className="mt-4 text-4xl font-black leading-tight text-white">
                            제품, 상담, 프로젝트를 한 곳에서 관리합니다
                        </h1>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-300">
                            공개 사이트의 제품 경험과 내부 운영 콘솔이 같은 기준으로 이어지도록 정돈했습니다.
                        </p>
                    </div>
                </div>

                <div className="flex min-h-[560px] items-center justify-center p-6 md:p-12">
                    <div className="w-full max-w-md">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">ADMIN ACCESS</p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900">
                            관리자 로그인
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            위트 운영 계정으로 접속해 제품 구성과 상담 흐름을 관리합니다.
                        </p>

                        {error && (
                            <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.
                            </div>
                        )}

                        <form className="mt-10 space-y-6">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="id" className="mb-2 block text-sm font-bold text-gray-700">
                                        아이디
                                    </label>
                                    <input
                                        id="id"
                                        name="id"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900/20 sm:text-sm"
                                        placeholder="아이디를 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-700">
                                        비밀번호
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900/20 sm:text-sm"
                                        placeholder="비밀번호를 입력하세요"
                                    />
                                </div>
                            </div>

                            <button
                                formAction={login}
                                className="flex w-full justify-center rounded-lg border border-transparent bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:ring-offset-2"
                            >
                                로그인
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
