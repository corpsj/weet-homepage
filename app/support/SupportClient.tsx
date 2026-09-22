'use client';

import Image from 'next/image';
import Link from 'next/link';
import ConsultForm from '@/components/support/ConsultForm';
import type { SiteSettings } from '@/lib/site-settings';
import { telHref } from '@/lib/site-settings';
import { useLanguage } from '@/contexts/LanguageContext';

const COPY = {
  KO: { title: '무엇을 도와드릴까요?', lead: '제품 선택, 설치 준비, 사용 중 문의를 남겨주세요.', process: '당신의 집을 짓는 과정', steps: [['상담', '사용 목적과 설치 지역, 예산과 일정을 확인합니다.'], ['현장 확인', '부지, 진입로, 전기·급배수와 필요한 절차를 살펴봅니다.'], ['사양·견적 확정', '모델, 선택 옵션, 공사 범위와 계약 조건을 정리합니다.'], ['공장 제작', '확정한 사양과 도면에 따라 모듈을 제작합니다.'], ['운반·설치', '현장 준비를 확인한 뒤 운반하고 설치합니다.'], ['인도·사용 안내', '마감과 설비를 확인하고 사용 및 점검 방법을 안내합니다.']], faq: '자주 묻는 질문', form: '1:1 상담 신청', formLead: '설치 지역과 필요한 공간을 알려주세요.', cost: '제품가와 별도 비용 확인', customize: '모델·옵션 직접 구성', as: 'A/S 문의', asLead: '증상과 사진, 설치 위치를 준비해 고객센터로 연락 주세요. 보증 범위는 계약서와 해당 설비의 보증 조건을 확인합니다.' },
  EN: { title: 'How can we help?', lead: 'Ask us about choosing a model, preparing a site or using your space.', process: 'How we build', steps: [['Consultation', 'Discuss use, location, budget and timing.'], ['Site check', 'Review access, utilities and local requirements.'], ['Specifications and quote', 'Confirm the model, options, scope and contract.'], ['Factory production', 'Build according to the agreed specifications.'], ['Delivery and installation', 'Check site readiness before delivery.'], ['Handover', 'Check finishes and equipment, and explain maintenance.']], faq: 'Frequently asked questions (Korean)', form: 'Request a consultation', formLead: 'Tell us where and how you want to use your space.', cost: 'Price and site costs (Korean)', customize: 'Configure a model', as: 'After-sales support', asLead: 'Contact us with the issue, photos and installation location. Warranty coverage follows your contract and equipment warranty.' },
  ES: { title: '¿Cómo podemos ayudarte?', lead: 'Consulta sobre modelos, preparación del terreno o uso del espacio.', process: 'Proceso de construcción', steps: [['Consulta', 'Revisamos el uso, ubicación, presupuesto y plazos.'], ['Terreno', 'Revisamos acceso, servicios y requisitos locales.'], ['Especificaciones', 'Acordamos el modelo, opciones, alcance y contrato.'], ['Fabricación', 'Fabricamos según las especificaciones acordadas.'], ['Transporte e instalación', 'Comprobamos la preparación del terreno.'], ['Entrega', 'Revisamos acabados y equipos, y explicamos el mantenimiento.']], faq: 'Preguntas frecuentes (coreano)', form: 'Solicitar asesoría', formLead: 'Indica la ubicación y el uso del espacio.', cost: 'Precio y costes del terreno (coreano)', customize: 'Configurar un modelo', as: 'Servicio posventa', asLead: 'Contacta con la incidencia, fotos y ubicación. La cobertura depende del contrato y la garantía de cada equipo.' },
};

export default function SupportClient({ faqs, settings }: { faqs: { question: string; answer: string }[]; settings: SiteSettings }) {
  const { language } = useLanguage();
  const copy = COPY[language];
  return <div className="bg-white text-gray-900">
    <section id="help" className="px-6 py-20 text-center md:py-28 scroll-mt-32">
      <h1 className="text-4xl font-bold leading-tight md:text-6xl">{copy.title}</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">{copy.lead}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4"><Link className="inline-flex min-h-12 items-center bg-primary px-6 font-bold text-black" href="/customize">{copy.customize} →</Link><Link className="inline-flex min-h-12 items-center border border-gray-300 px-6" href="/guides/mobile-home-cost">{copy.cost}</Link></div>
    </section>
    <section id="process" className="bg-gray-50 px-6 py-16 scroll-mt-32 md:py-24">
      <div className="mx-auto max-w-[1400px]"><h2 className="mb-12 text-3xl font-bold md:text-4xl">{copy.process}</h2><ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{copy.steps.map(([title, description], index) => <li key={title} className="overflow-hidden rounded-2xl bg-white"><div className="relative aspect-[4/3]"><Image src={`/images/support/step${index + 1}.webp`} alt={title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div><div className="p-6"><h3 className="text-xl font-bold"><span className="mr-3 text-gray-500">{index + 1}.</span>{title}</h3><p className="mt-3 leading-7 text-gray-600">{description}</p></div></li>)}</ol></div>
    </section>
    <section id="qa" className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 scroll-mt-32 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
      <div id="faq" className="scroll-mt-32"><h2 className="mb-8 text-3xl font-bold">{copy.faq}</h2><div lang="ko" className="divide-y divide-gray-200 border-y border-gray-200">{faqs.map((faq) => <details key={faq.question} className="group py-1"><summary className="cursor-pointer py-5 pr-4 font-semibold leading-7">{faq.question}</summary><p className="pb-6 text-gray-600 leading-8 whitespace-pre-line">{faq.answer}</p></details>)}</div></div>
      <div id="consult" className="scroll-mt-32"><span id="inquiry-form" className="scroll-mt-32" /><h2 className="text-3xl font-bold">{copy.form}</h2><p className="mb-8 mt-4 leading-7 text-gray-600">{copy.formLead}</p><ConsultForm /></div>
    </section>
    <section id="as" className="border-t border-gray-200 px-6 py-16 scroll-mt-32"><div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2"><div><h2 className="text-3xl font-bold">{copy.as}</h2><p className="mt-4 max-w-xl leading-8 text-gray-600">{copy.asLead}</p></div><div className="self-center md:text-right"><a href={telHref(settings.contact_phone)} className="inline-block py-3 text-3xl font-bold">{settings.contact_phone}</a>{settings.consult_hours && <p className="mt-3 text-gray-600">{settings.consult_hours}</p>}</div></div></section>
  </div>;
}
