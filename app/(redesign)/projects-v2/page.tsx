import type { Metadata } from 'next'

import { ProjectsV2Client } from './projects-v2-client'

export const metadata: Metadata = {
  title: '시공사례 | weet:)',
  description: '위트의 현장건축 포트폴리오 — 단독주택, 세컨하우스, 상업시설 등 다양한 시공 사례',
}

export default function ProjectsPage() {
  return <ProjectsV2Client />
}
