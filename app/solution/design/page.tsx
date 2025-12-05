"use client";

import SolutionTemplate from "@/components/solution/SolutionTemplate";

const features: any[] = [];

export default function DesignSolutionPage() {
  return (
    <SolutionTemplate
      title="디자인 솔루션"
      subtitle="Interior Design"
      heroImage="/images/solution/design_hero.png"
      description="당신의 '로망'이 '공간'이 되는 순간. 전문 디자이너와 함께 당신만의 특별한 공간을 만들어보세요."
      features={features}
    />
  );
}
