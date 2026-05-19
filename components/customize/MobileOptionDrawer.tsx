"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { allOptionCategories, formatPrice } from "@/lib/customize/config"
import { useCustomizeStore } from "@/stores/customizeStore"
import { cn } from "@/lib/utils"

export function MobileOptionDrawer() {
  const [open, setOpen] = useState(false)
  const { selectedOptions, toggleOption } = useCustomizeStore()

  return (
    <div className="lg:hidden fixed bottom-[88px] left-0 right-0 z-50">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full bg-white border-t border-gray-200 rounded-t-xl pt-3 pb-4 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex flex-col items-center gap-2 active:scale-[0.98] transition-transform"
        aria-label="옵션 선택 열기"
      >
        <div className="w-10 h-1 rounded-full bg-gray-300" />
        <span className="text-sm font-medium text-gray-700">옵션 선택</span>
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-lg font-semibold text-center">
              옵션 선택
            </DrawerTitle>
          </DrawerHeader>

          <Tabs defaultValue={allOptionCategories[0]?.id} className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="mx-4 mb-2 flex-nowrap overflow-x-auto scrollbar-hide">
              {allOptionCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-xs px-3 py-1.5 whitespace-nowrap"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {allOptionCategories.map((category) => {
                const currentSelection = selectedOptions[category.id] || []

                return (
                  <TabsContent
                    key={category.id}
                    value={category.id}
                    className="mt-0"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map((item) => {
                        const isSelected = currentSelection.includes(item.id)

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleOption(category.id, item.id)}
                            className={cn(
                              "relative flex flex-col items-start gap-1 rounded-lg border px-3 py-3 text-left text-sm transition-all active:scale-[0.98]",
                              isSelected
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            )}
                          >
                            <span className="font-medium leading-tight">
                              {item.name}
                            </span>
                            {item.price > 0 && (
                              <span
                                className={cn(
                                  "text-xs",
                                  isSelected ? "text-primary/80" : "text-gray-400"
                                )}
                              >
                                +{formatPrice(item.price)}원
                              </span>
                            )}
                            {item.price === 0 && (
                              <span
                                className={cn(
                                  "text-xs",
                                  isSelected ? "text-primary/80" : "text-gray-400"
                                )}
                              >
                                기본 포함
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </TabsContent>
                )
              })}
            </div>
          </Tabs>

          <DrawerFooter className="pt-2">
            <Button
              onClick={() => setOpen(false)}
              className="w-full h-12 text-base font-semibold"
            >
              완료
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
