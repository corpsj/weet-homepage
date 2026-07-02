'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import { formatWon } from '@/lib/customize/priceCalculator';

// 견적가 카운트업: 값이 바뀔 때 이전 금액 → 새 금액으로 굴러간다.
// 중간값이 계속 바뀌므로 애니메이션 숫자는 aria-hidden으로 두고,
// 스크린리더에는 확정 금액만 sr-only로 전달한다(부모의 aria-live가 이것만 읽는다).
export function AnimatedPrice({ value, testId, className }: { value: number; testId?: string; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    const from = prev.current;
    prev.current = value;
    if (shouldReduceMotion) return; // 렌더에서 value를 직접 사용
    const controls = animate(from, value, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value, shouldReduceMotion]);

  return (
    <>
      <span data-testid={testId} aria-hidden="true" className={className}>
        {formatWon(shouldReduceMotion ? value : display)}
      </span>
      <span className="sr-only">{formatWon(value)}</span>
    </>
  );
}
