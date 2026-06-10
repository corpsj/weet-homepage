'use client';

import { useState, useEffect } from 'react';
import { migrateProducts } from '@/app/actions/migration-actions';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { ConsolePageHeader, ConsolePanel, ConsoleSectionTitle, consoleInputClass, consolePrimaryButtonClass } from '@/components/admin/ConsolePrimitives';
import SiteSettingsPanel from '@/components/admin/SiteSettingsPanel';

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
        if (!confirm('위험 작업입니다. 기존 제품 데이터를 데이터베이스로 이관하시겠습니까? 이미 데이터가 있으면 중복 데이터가 생성될 수 있습니다.')) {
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
        <div className="space-y-6">
            <ConsolePageHeader
                eyebrow="SYSTEM"
                title="설정"
                description="계정 관리, 알림 설정 및 시스템 제어를 수행합니다."
            />

            <div className="space-y-6">
                <SiteSettingsPanel />

                {/* Account Settings */}
                <ConsolePanel className="p-6">
                    <ConsoleSectionTitle>계정 설정</ConsoleSectionTitle>
                    <div className="grid gap-6 max-w-xl mt-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">아이디</label>
                            <input
                                type="text"
                                disabled
                                value={userId}
                                className={`${consoleInputClass} w-full bg-gray-50`}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">비밀번호</label>
                            <button className="text-sm text-blue-600 hover:underline font-bold">
                                비밀번호 변경
                            </button>
                        </div>
                    </div>
                </ConsolePanel>

                {/* Notification Settings */}
                <ConsolePanel className="p-6">
                    <ConsoleSectionTitle>알림 설정</ConsoleSectionTitle>
                    <div className="space-y-4 mt-4">
                        <div className="flex items-center justify-between max-w-xl">
                            <div>
                                <p className="text-sm font-bold text-gray-900">이메일 알림</p>
                                <p className="text-[11px] text-gray-500 mt-1">새로운 문의가 들어오면 이메일로 알림을 받습니다.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black cursor-pointer" />
                        </div>
                    </div>
                </ConsolePanel>

                {/* Data Management */}
                <ConsolePanel className="p-6">
                    <ConsoleSectionTitle>데이터 관리</ConsoleSectionTitle>
                    <details className="mt-4 rounded-md border border-red-200 bg-[#fef2f2]">
                        <summary className="cursor-pointer px-4 py-3 text-sm font-bold text-red-700">
                            고급 / 위험 작업
                        </summary>
                        <div className="border-t border-red-200 bg-white p-4 rounded-b-md">
                            <h3 className="font-bold text-gray-900 text-sm mb-1">초기 데이터 이관 (Migration)</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                하드코딩된 제품 데이터를 Supabase 데이터베이스로 복사합니다.
                                <br />
                                이미 데이터가 존재하는 경우 중복될 수 있으니 주의하세요.
                            </p>
                            <button
                                onClick={handleMigration}
                                disabled={migrating}
                                className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                                {migrating && <Loader2 className="w-4 h-4 animate-spin" />}
                                데이터 이관 실행
                            </button>
                            {message && (
                                <p className={`mt-3 text-xs font-bold ${message.includes('오류') ? 'text-red-600' : 'text-green-600'}`}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </details>
                </ConsolePanel>
            </div>
        </div>
    );
}
