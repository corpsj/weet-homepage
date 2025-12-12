import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                    이용약관
                </h1>

                <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                    <p className="text-sm text-gray-400">최종 수정일: 2025년 12월 12일</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
                        <p>
                            본 약관은 회사가 제공하는 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">제2조 (약관의 효력 및 변경)</h2>
                        <p>
                            본 약관은 서비스를 이용하고자 하는 모든 회원에게 효력이 발생합니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">제3조 (서비스의 제공)</h2>
                        <p>
                            회사는 회원에게 안정적인 서비스를 제공하기 위해 최선을 다하며, 기술적 사유나 운영상의 목적으로 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">제4조 (회원의 의무)</h2>
                        <p>
                            회원은 본 약관 및 관련 법령을 준수해야 하며, 회사의 업무를 방해하거나 타인의 권리를 침해하는 행위를 하여서는 안 됩니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">제5조 (책임의 제한)</h2>
                        <p>
                            회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
