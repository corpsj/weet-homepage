'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { sectionHeadlines, ctaVariations } from '@/lib/witty-copy';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

const models = [
  { name: 'S', dims: '3×6m', area: '18㎡', pyeong: '약 5평', rooms: '1', bath: '1', use: '농막·쉼터', price: '2,500만~', popular: false },
  { name: 'M', dims: '3×9m', area: '27㎡', pyeong: '약 8평', rooms: '1~2', bath: '1', use: '세컨하우스', price: '3,800만~', popular: true },
  { name: 'L', dims: '6×9m', area: '54㎡', pyeong: '약 16평', rooms: '2~3', bath: '1', use: '단독주택', price: '6,500만~', popular: false },
  { name: 'XL', dims: '6×12m', area: '72㎡', pyeong: '약 22평', rooms: '3~4', bath: '1~2', use: '대형 주거', price: '8,900만~', popular: false },
];

function SpecRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn('text-sm font-medium', highlight && 'text-primary font-bold text-base')}>
        {value}
      </span>
    </div>
  );
}

function ModelCard({ model }: { model: (typeof models)[number] }) {
  return (
    <Card
      className={cn(
        'h-full transition-shadow duration-300',
        model.popular ? 'border-primary border-2 relative shadow-md' : 'hover:shadow-md'
      )}
    >
      {model.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400 shadow-sm">
            인기
          </Badge>
        </div>
      )}
      <CardHeader className="text-center pb-2 pt-8">
        <div
          className={cn(
            'font-black tracking-tighter',
            model.name.length > 1 ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl'
          )}
        >
          {model.name}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{model.use}</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-0">
          <SpecRow label="크기" value={model.dims} />
          <SpecRow label="면적" value={`${model.area} (${model.pyeong})`} />
          <SpecRow label="방/욕실" value={`${model.rooms} / ${model.bath}`} />
          <SpecRow label="추천 용도" value={model.use} />
          <SpecRow label="가격(총액)" value={model.price} highlight />
        </div>
        <Button
          asChild
          variant={model.popular ? 'default' : 'outline'}
          className="w-full mt-6"
        >
          <Link href="/products-v2">
            자세히 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ModelComparison() {
  return (
    <section className="bg-background py-20 md:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {sectionHeadlines.comparison}
            </h2>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {sectionHeadlines.comparisonSub}
            </p>
          </div>
        </ScrollReveal>

        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {models.map((model, i) => (
            <ScrollReveal key={model.name} delay={i * 0.1}>
              <motion.div
                whileHover={{
                  y: -8,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="h-full"
              >
                <ModelCard model={model} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              className="min-w-[85%] snap-center flex-shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <ModelCard model={model} />
            </motion.div>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12 md:mt-16">
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href="/products-v2">
                {ctaVariations.viewProducts}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
