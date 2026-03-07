"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FullscreenHero } from '@/components/sections/FullscreenHero';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { ModelComparison } from '@/components/sections/ModelComparison';
import { BeforeAfterStories } from '@/components/sections/BeforeAfterStories';
import { ctaVariations } from '@/lib/witty-copy';

export function HomeClient() {
  return (
    <div className="w-full">
      <FullscreenHero />
      <TrustBadges />
      <ModelComparison />
      <BeforeAfterStories />

      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[#2D2D2A] mb-4">{ctaVariations.callToAction}</h2>
            <p className="text-body-lg text-[#2D2D2A]/70 mb-10 max-w-xl mx-auto">
              부지 조건과 요구사항을 알려주시면 맞춤 제안을 드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#2D2D2A] text-white hover:bg-[#2D2D2A]/90 rounded-full px-8 h-14 text-base font-semibold">
                <Link href="/support-v2">{ctaVariations.consultKakao}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#2D2D2A]/30 text-[#2D2D2A] hover:bg-[#2D2D2A]/10 rounded-full px-8 h-14 text-base bg-transparent">
                <Link href="/quote">{ctaVariations.quote} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
