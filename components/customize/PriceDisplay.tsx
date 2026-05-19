'use client'

import { useCustomizeStore } from '@/stores/customizeStore'
import { formatPrice } from '@/lib/customize/config'

export default function PriceDisplay() {
  const { totalPrice, selectedModel } = useCustomizeStore()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background border border-border rounded-xl shadow-lg px-6 py-4 z-50">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs text-muted-foreground">선택 모델</p>
          <p className="text-sm font-semibold">{selectedModel?.name ?? '미선택'}</p>
        </div>
        <div className="w-px h-8 bg-border" />
        <div>
          <p className="text-xs text-muted-foreground">총 가격</p>
          <p data-testid="total-price" className="text-lg font-bold text-primary">₩{formatPrice(totalPrice)}</p>
        </div>
      </div>
    </div>
  )
}
