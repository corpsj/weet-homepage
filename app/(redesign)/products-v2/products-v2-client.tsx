'use client'

import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PURPOSE_LABELS,
  PURPOSE_TO_SIZE_MAP,
  SIZE_LABELS,
  type PurposeCategory,
  type SizeCategory,
} from '@/lib/types'
import type { Product } from '@/types/supabase'

type SizeProductCard = Pick<Product, 'id' | 'name' | 'description' | 'price'> & {
  sizeCategory: SizeCategory
  dimensions: string
  area: string
  useCase: string
}

const purposeDescriptions: Record<PurposeCategory, string> = {
  FARMHOUSE_SHELTER:
    '짧은 체류와 휴식을 중심으로 구성한 컴팩트 라인업입니다. 농지와 임야 환경에 맞춘 실용 구성을 제안합니다.',
  SECOND_HOUSE:
    '주말 체류와 가족 단위 사용을 고려한 균형형 모델입니다. 수납, 주방, 위생 공간의 효율을 높였습니다.',
  PRIMARY_HOME:
    '상시 거주를 전제로 설계한 주거형 모델입니다. 생활 동선, 단열, 확장성을 중심으로 완성도를 높였습니다.',
  COMMERCIAL:
    '업무와 상업 운영 목적에 맞춰 평면과 외관을 맞춤 설계합니다. 쇼룸, 오피스, 리테일 등 용도별로 제안합니다.',
}

const purposeTitleOverrides: Partial<Record<PurposeCategory, string>> = {
  COMMERCIAL: '상업·사무',
}

const sizeProducts: SizeProductCard[] = [
  {
    id: 'size-s-standard',
    name: 'S 기본형',
    description: '작은 필지에도 안정적으로 설치 가능한 실속형 모델입니다.',
    price: '2,900만원~4,200만원',
    sizeCategory: 'S',
    dimensions: '3×6m',
    area: '18㎡',
    useCase: '농막·체류형 쉼터',
  },
  {
    id: 'size-m-standard',
    name: 'M 패밀리형',
    description: '주말 체류와 취미 활동을 함께 담을 수 있는 다목적 모델입니다.',
    price: '4,500만원~6,800만원',
    sizeCategory: 'M',
    dimensions: '3×9m',
    area: '27㎡',
    useCase: '세컨하우스',
  },
  {
    id: 'size-l-standard',
    name: 'L 레지던스형',
    description: '독립적인 주거 기능을 갖춘 본 주거 중심 모델입니다.',
    price: '9,800만원~1억 4,000만원',
    sizeCategory: 'L',
    dimensions: '6×9m',
    area: '54㎡',
    useCase: '단독주택',
  },
  {
    id: 'size-xl-standard',
    name: 'XL 프리미엄형',
    description: '여유로운 생활 면적과 다양한 공간 구성이 가능한 대형 모델입니다.',
    price: '1억 5,000만원~2억 2,000만원',
    sizeCategory: 'XL',
    dimensions: '6×12m',
    area: '72㎡',
    useCase: '대형 단독주택',
  },
]

const purposeOrder: PurposeCategory[] = [
  'FARMHOUSE_SHELTER',
  'SECOND_HOUSE',
  'PRIMARY_HOME',
  'COMMERCIAL',
]

const sizeOrder: SizeCategory[] = ['S', 'M', 'L', 'XL']

export default function ProductsV2ClientPage() {
  const sizeByCategory = sizeProducts.reduce<Record<SizeCategory, SizeProductCard>>((acc, item) => {
    acc[item.sizeCategory] = item
    return acc
  }, {} as Record<SizeCategory, SizeProductCard>)

  return (
    <main className="bg-[#FAFAFA] text-[#2D2D2A]">
      <section className="relative flex min-h-[40vh] items-end overflow-hidden bg-[#2D2D2A] px-5 py-14 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,202,13,0.2),transparent_36%),radial-gradient(circle_at_82%_88%,rgba(255,202,13,0.1),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          <p className="mb-4 text-xs tracking-[0.2em] text-[#FFCA0D]">제품 카탈로그</p>
          <h1 className="text-4xl font-semibold leading-tight text-[#FAFAFA] sm:text-5xl">이동식주택</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#FAFAFA]/80 sm:text-base">
            용도와 규모에 따라 가장 빠르게 비교할 수 있도록, 용도별 보기와 사이즈별 보기를 함께 제공합니다.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <Tabs defaultValue="purpose" className="w-full">
          <div className="overflow-x-auto pb-1">
            <TabsList className="h-11 min-w-max gap-1 bg-[#2D2D2A]/10 p-1">
              <TabsTrigger
                value="purpose"
                className="min-w-[140px] data-[state=active]:bg-[#2D2D2A] data-[state=active]:text-[#FAFAFA]"
              >
                용도별 보기
              </TabsTrigger>
              <TabsTrigger
                value="size"
                className="min-w-[140px] data-[state=active]:bg-[#2D2D2A] data-[state=active]:text-[#FAFAFA]"
              >
                사이즈별 보기
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="purpose" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              {purposeOrder.map((purpose) => {
                const isCommercial = purpose === 'COMMERCIAL'
                const mappedSizes = !isCommercial ? PURPOSE_TO_SIZE_MAP[purpose] : []
                const title = purposeTitleOverrides[purpose] ?? PURPOSE_LABELS[purpose]

                return (
                  <Card key={purpose} className="border-[#2D2D2A]/15 bg-[#FAFAFA]">
                    <CardHeader>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {mappedSizes.map((size) => (
                          <Badge
                            key={size}
                            variant="outline"
                            className="border-[#2D2D2A]/20 bg-[#2D2D2A]/5 text-[#2D2D2A]"
                          >
                            {SIZE_LABELS[size].label}
                          </Badge>
                        ))}
                        {isCommercial ? (
                          <Badge className="bg-[#FFCA0D] text-[#2D2D2A] hover:bg-[#FFCA0D]">비스포크</Badge>
                        ) : null}
                      </div>
                      <CardTitle className="text-2xl leading-tight">{title}</CardTitle>
                      <CardDescription className="leading-6 text-[#2D2D2A]/75">
                        {purposeDescriptions[purpose]}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={isCommercial ? '/bespoke-v2' : `/products-v2?purpose=${purpose}`}
                        className="inline-flex items-center text-sm font-semibold text-[#2D2D2A] underline underline-offset-4 hover:text-[#2D2D2A]/70"
                      >
                        자세히 보기
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="size" className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              {sizeOrder.map((size) => {
                const item = sizeByCategory[size]

                return (
                  <Card key={size} className="border-[#2D2D2A]/15 bg-[#FAFAFA]">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[#FFCA0D] text-[#2D2D2A] hover:bg-[#FFCA0D]">{size}</Badge>
                        <span className="text-sm font-medium text-[#2D2D2A]/70">{item.area}</span>
                      </div>
                      <CardTitle className="text-2xl leading-tight">{item.name}</CardTitle>
                      <CardDescription className="leading-6 text-[#2D2D2A]/75">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-[#2D2D2A]">
                      <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-2">
                        <span className="text-[#2D2D2A]/65">규격</span>
                        <span className="font-medium">{item.dimensions}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-2">
                        <span className="text-[#2D2D2A]/65">면적</span>
                        <span className="font-medium">{item.area}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#2D2D2A]/10 pb-2">
                        <span className="text-[#2D2D2A]/65">추천 용도</span>
                        <span className="font-medium">{item.useCase}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#2D2D2A]/65">총 가격</span>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-6 sm:px-8 lg:px-12">
        <div className="rounded-2xl bg-[#2D2D2A] px-6 py-9 text-[#FAFAFA] sm:px-8 sm:py-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs tracking-[0.16em] text-[#FFCA0D]">전용 안내</p>
            <h2 className="text-3xl font-semibold">체류형 쉼터</h2>
            <p className="mt-4 text-sm leading-7 text-[#FAFAFA]/85 sm:text-base">
              33㎡ 이하, 건축 허가 불필요, 농지·임야 설치 가능 조건에 맞춘 체류형 쉼터 전용 구성을 안내합니다.
            </p>
            <Link
              href="/support-v2"
              className="mt-6 inline-flex rounded-full border border-[#FFCA0D] px-5 py-2.5 text-sm font-semibold text-[#FFCA0D] transition-colors hover:bg-[#FFCA0D] hover:text-[#2D2D2A]"
            >
              체류형 쉼터 상담
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-14 pt-6 sm:px-8 lg:px-12 lg:pb-20">
        <div className="rounded-2xl border border-[#2D2D2A]/15 bg-[#FAFAFA] p-7 sm:p-10">
          <h2 className="text-2xl font-semibold text-[#2D2D2A] sm:text-3xl">맞춤 견적 받기</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#2D2D2A]/75 sm:text-base">
            설치 환경과 예산, 원하는 평면에 맞춘 맞춤형 제안을 받아보세요. 전담 컨설턴트가 빠르게 안내해 드립니다.
          </p>
          <Link
            href="/bespoke-v2"
            className="mt-6 inline-flex rounded-full bg-[#FFCA0D] px-6 py-3 text-sm font-semibold text-[#2D2D2A] transition-colors hover:bg-[#e9b807]"
          >
            견적 받기
          </Link>
        </div>
      </section>
    </main>
  )
}
