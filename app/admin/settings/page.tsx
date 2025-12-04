'use client';

import { useState, useEffect } from 'react';
import { migrateProducts } from '@/app/actions/migration-actions';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AdminSettingsPage() {
    const [migrating, setMigrating] = useState(false);
    const [message, setMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email) {
                setUserEmail(user.email);
            }
        };
        getUser();
    }, [supabase]);

    const userId = userEmail.split('@')[0];

    const handleMigration = async () => {
        if (!confirm('기존 데이터를 데이터베이스로 이관하시겠습니까? (중복 데이터가 생성될 수 있습니다)')) {
            return;
        }

        setMigrating(true);
        setMessage('');

        try {
            await migrateProducts();
            setMessage('데이터 이관이 완료되었습니다.');
        } catch (error) {
            console.error(error);
            setMessage('데이터 이관 중 오류가 발생했습니다.');
        } finally {
            setMigrating(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">설정</h1>

            <div className="space-y-6">
                {/* Account Settings (Placeholder) */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">계정 설정</h2>
                    <div className="grid gap-6 max-w-xl">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                            <input
                                type="text"
                                disabled
                                value={userId}
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                            <button className="text-sm text-blue-600 hover:underline font-medium">
                                비밀번호 변경
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification Settings (Placeholder) */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">알림 설정</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between max-w-xl">
                            <div>
                                <p className="text-sm font-medium text-gray-900">이메일 알림</p>
                                <p className="text-xs text-gray-500">새로운 문의가 들어오면 이메일로 알림을 받습니다.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black" />
                        </div>
                    </div>
                </div>

                {/* Data Management */}
                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">데이터 관리</h2>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-gray-900 mb-2">초기 데이터 이관 (Migration)</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            하드코딩된 제품 데이터를 Supabase 데이터베이스로 복사합니다.
                            <br />
                            이미 데이터가 존재하는 경우 중복될 수 있으니 주의하세요.
                        </p>
                        <button
                            onClick={handleMigration}
                            disabled={migrating}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {migrating && <Loader2 className="w-4 h-4 animate-spin" />}
                            데이터 이관 실행
                        </button>
                        {message && (
                            <p className={`mt-2 text-sm ${message.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
