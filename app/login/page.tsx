import { login } from './actions'
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

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        관리자 로그인
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        시스템 관리를 위해 로그인해주세요
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                아이디
                            </label>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm"
                                placeholder="아이디를 입력하세요"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm"
                                placeholder="비밀번호를 입력하세요"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            formAction={login}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
