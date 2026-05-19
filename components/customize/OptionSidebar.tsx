'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCustomizeStore } from '@/stores/customizeStore'
import { allOptionCategories, formatPrice } from '@/lib/customize/config'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function OptionSidebar() {
  const [activeCategory, setActiveCategory] = useState(allOptionCategories[0].id)
  const { selectedOptions, toggleOption } = useCustomizeStore()

  return (
    <aside className="hidden lg:flex lg:w-[360px] xl:w-[400px] flex-col border-l border-border bg-background h-full">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-lg font-semibold">옵션 선택</h2>
      </div>

      <Tabs
        orientation="vertical"
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="flex flex-1 overflow-hidden"
      >
        <TabsList
          variant="line"
          className="flex-col justify-start w-[140px] shrink-0 h-full border-r border-border py-2 px-1"
        >
          {allOptionCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className={cn(
                'w-full justify-start px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                activeCategory === category.id
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-5">
            {allOptionCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                <h3 className="text-base font-semibold mb-4">{category.name}</h3>
                <div className="flex flex-col gap-2.5">
                  {category.items.map((item) => {
                    const isSelected = selectedOptions[category.id]?.includes(item.id)
                    const isDefault = item.price === 0

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleOption(category.id, item.id)}
                        className={cn(
                          'flex items-center justify-between w-full px-4 py-3 rounded-lg border text-left transition-all',
                          isSelected
                            ? 'border-primary bg-primary/5 text-foreground'
                            : 'border-border bg-background text-foreground hover:bg-muted/50'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              'flex size-4 shrink-0 rounded-full border transition-colors',
                              isSelected
                                ? 'border-primary bg-primary'
                                : 'border-input bg-background'
                            )}
                          >
                            {isSelected && (
                              <span className="m-auto size-2 rounded-full bg-primary-foreground" />
                            )}
                          </span>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {isDefault && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                              기본 포함
                            </span>
                          )}
                          {!isDefault && (
                            <span className="text-sm font-semibold text-primary">
                              +₩{formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </div>
        </ScrollArea>
      </Tabs>
    </aside>
  )
}
