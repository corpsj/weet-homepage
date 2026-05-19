'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useCustomizeStore } from '@/stores/customizeStore';
import { getOptionItemById, models } from '@/lib/customize/config';

type ViewTab = 'exterior' | 'interior' | 'floorplan';

const exteriorCategories = ['exterior'];
const interiorCategories = ['flooring', 'interior', 'kitchen', 'bathroom'];

function getOverlayPaths(
  selectedOptions: Record<string, string[]>,
  categoryIds: string[]
): string[] {
  const paths: string[] = [];
  for (const catId of categoryIds) {
    const itemIds = selectedOptions[catId] ?? [];
    for (const itemId of itemIds) {
      const item = getOptionItemById(catId, itemId);
      if (item?.overlayImagePath) {
        paths.push(item.overlayImagePath);
      }
    }
  }
  return paths;
}

export default function VisualArea() {
  const { selectedModel, selectedOptions, setModel } = useCustomizeStore();
  const [activeTab, setActiveTab] = useState<ViewTab>('exterior');

  if (!selectedModel) {
    return (
      <div className="w-full">
        <div className="mb-4 text-center">
          <p className="mb-4 text-sm text-gray-500">모델을 선택해주세요</p>
          <div className="flex justify-center gap-2">
            {models.map((model) => (
              <Button
                key={model.id}
                variant="outline"
                size="lg"
                onClick={() => setModel(model)}
                className="min-w-[80px]"
              >
                {model.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-gray-100">
          <p className="text-gray-400">모델 선택 후 커스터마이징이 가능합니다</p>
        </div>
      </div>
    );
  }

  const baseImagePath = selectedModel.imagePath;

  const exteriorOverlays = getOverlayPaths(selectedOptions, exteriorCategories);
  const interiorOverlays = getOverlayPaths(selectedOptions, interiorCategories);

  return (
    <div className="mx-auto w-full sm:w-[60%] min-w-[280px]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            현재 모델: {selectedModel.name} ({selectedModel.size})
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const currentIndex = models.findIndex((m) => m.id === selectedModel.id);
            const nextIndex = (currentIndex + 1) % models.length;
            setModel(models[nextIndex]);
          }}
        >
          모델 변경
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ViewTab)}>
        <TabsList className="mb-4 w-full justify-center">
          <TabsTrigger value="exterior">외관 보기</TabsTrigger>
          <TabsTrigger value="interior">남장 보기</TabsTrigger>
          <TabsTrigger value="floorplan">평멵도</TabsTrigger>
        </TabsList>

        <TabsContent value="exterior">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={baseImagePath}
              alt={`${selectedModel.name} 모델 외관`}
              fill
              className="object-contain"
              priority
            />
            {exteriorOverlays.map((src, idx) => (
              <div key={`${src}-${idx}`} className="absolute inset-0">
                <Image
                  src={src}
                  alt="외장마감재 오버레이"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interior">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={baseImagePath}
              alt={`${selectedModel.name} 모델 남장`}
              fill
              className="object-contain"
            />
            {interiorOverlays.map((src, idx) => (
              <div key={`${src}-${idx}`} className="absolute inset-0">
                <Image
                  src={src}
                  alt="남장 오버레이"
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="floorplan">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/customize/dummy-base.svg"
              alt="평멵도"
              fill
              className="object-contain"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
