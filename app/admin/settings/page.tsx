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
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordSaving, setPasswordSaving] = useState(false);
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

    const handlePasswordChange = async () => {
        setPasswordMessage('');

        if (newPassword.length < 8) {
            setPasswordMessage('새 비밀번호는 8자 이상이어야 합니다.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage('새 비밀번호와 확인 입력이 일치하지 않습니다.');
            return;
        }

        setPasswordSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) {
                setPasswordMessage(`비밀번호 변경 실패: ${error.message}`);
                return;
            }

            setNewPassword('');
            setConfirmPassword('');
            setPasswordOpen(false);
            setPasswordMessage('비밀번호가 변경되었습니다.');
        } finally {
            setPasswordSaving(false);
        }
    };

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
                            <button
                                type="button"
                                onClick={() => setPasswordOpen((current) => !current)}
                                className="text-sm text-blue-600 hover:underline font-bold"
                            >
                                비밀번호 변경
                            </button>
                            {passwordOpen && (
                                <div className="mt-3 space-y-3 rounded-md border border-[#e5e5df] bg-[#fbfbfa] p-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">새 비밀번호</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(event) => setNewPassword(event.target.value)}
                                            className={`${consoleInputClass} w-full bg-white`}
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">새 비밀번호 확인</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(event) => setConfirmPassword(event.target.value)}
                                            className={`${consoleInputClass} w-full bg-white`}
                                            autoComplete="new-password"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handlePasswordChange}
                                        disabled={passwordSaving}
                                        className={consolePrimaryButtonClass}
                                    >
                                        {passwordSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                                        새 비밀번호 저장
                                    </button>
                                </div>
                            )}
                            {passwordMessage && (
                                <p className={`mt-2 text-xs font-bold ${passwordMessage.includes('실패') || passwordMessage.includes('일치') || passwordMessage.includes('8자') ? 'text-red-600' : 'text-green-600'}`}>
                                    {passwordMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </ConsolePanel>

                {/* Notification Settings */}
                <ConsolePanel className="p-6">
                    <ConsoleSectionTitle>알림 설정</ConsoleSectionTitle>
                    <div className="mt-4 max-w-xl rounded-md border border-[#e5e5df] bg-[#fbfbfa] p-4">
                        <p className="text-sm font-bold text-gray-900">이메일 알림 연동 전</p>
                        <p className="mt-1 text-[11px] font-medium leading-5 text-gray-500">
                            현재 문의 알림 발송 백엔드는 연결되어 있지 않습니다. 조작 가능한 토글을 노출하지 않고, 실제 발송 연동 후 설정 항목을 활성화합니다.
                        </p>
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
