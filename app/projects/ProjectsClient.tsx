'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Project, GalleryItem } from '@/types/supabase';
import type { SiteSettings } from '@/lib/site-settings';
import { useLanguage } from '@/contexts/LanguageContext';
import ProjectsGallery from './ProjectsGallery';

const COPY = {
  KO: { title: '프로젝트', lead: '위트가 만들어가는 공간의 기록', empty: '공개할 프로젝트를 정리하고 있습니다. 아래 제작 현장 사진을 먼저 살펴보세요.', records: '제작·설치 현장', consult: '내 공간 상담하기' },
  EN: { title: 'Projects', lead: 'Spaces and production records from weet', empty: 'Project details are being prepared. Explore our production photographs below.', records: 'Production and installation', consult: 'Discuss your space' },
  ES: { title: 'Proyectos', lead: 'Espacios y registros de fabricación de weet', empty: 'Estamos preparando los detalles de los proyectos. Puedes ver las fotografías de fabricación a continuación.', records: 'Fabricación e instalación', consult: 'Consultar sobre tu espacio' },
};

export default function ProjectsClient({ publicProjects, galleryItems, settings }: { publicProjects: Project[]; galleryItems: GalleryItem[]; settings: SiteSettings }) {
  const { language } = useLanguage();
  const copy = COPY[language];
  return <div className="mx-auto max-w-[1400px] bg-white px-5 py-16 text-gray-900 md:px-8">
    <div className="mb-12 text-center"><h1 className="text-3xl font-bold md:text-4xl">{copy.title}</h1><p className="mt-4 text-gray-600">{copy.lead}</p></div>
    {publicProjects.length > 0 ? <ProjectsGallery projects={publicProjects} /> : <p className="mb-12 text-center text-sm leading-7 text-gray-600">{copy.empty}</p>}
    {galleryItems.length > 0 && <section><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><h2 className="text-2xl font-bold">{copy.records}</h2><div className="flex gap-5 text-sm">{settings.naver_blog_url && <a href={settings.naver_blog_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">N blog</a>}{settings.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Instagram</a>}</div></div><div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">{galleryItems.map((item) => <figure key={item.id}><div className="relative aspect-square overflow-hidden bg-gray-100"><Image src={item.image_url} alt={item.title.replace(/\s*:\)\s*$/u, '').trim()} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" /></div><figcaption className="py-3 text-sm leading-6 text-gray-600">{item.title.replace(/\s*:\)\s*$/u, '').trim()}</figcaption></figure>)}</div></section>}
    <div className="mt-12 text-center"><Link href="/customize" className="inline-flex min-h-12 items-center bg-primary px-6 font-bold text-black">{copy.consult} →</Link></div>
  </div>;
}
