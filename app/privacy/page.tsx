import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                    개인정보처리방침
                </h1>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                    <p className="text-sm text-gray-400">최종 수정일: 2025년 12월 12일</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
                        <p>
                            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. 개인정보의 처리 및 보유 기간</h2>
                        <p>
                            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
                        <p>
                            정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. 처리하는 개인정보의 항목</h2>
                        <p>
                            회사는 다음의 개인정보 항목을 처리하고 있습니다.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>성명, 전화번호, 이메일</li>
                            <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. 개인정보의 파기</h2>
                        <p>
                            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
