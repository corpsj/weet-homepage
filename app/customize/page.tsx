'use client';

import VisualArea from '@/components/customize/VisualArea';
import OptionSidebar from '@/components/customize/OptionSidebar';
import { MobileOptionDrawer } from '@/components/customize/MobileOptionDrawer';
import { StickyPriceBar } from '@/components/customize/StickyPriceBar';

export default function CustomizePage() {
  return (
    <div className="min-h-screen bg-white min-w-[320px]">
      <div className="flex flex-col lg:flex-row h-[calc(100dvh-100px)] lg:h-[calc(100dvh-180px)] pt-[100px] lg:pt-[180px]">
        <div className="w-full lg:w-[60%] h-[55vh] lg:h-full overflow-auto">
          <VisualArea />
        </div>

        <div className="hidden lg:block w-full lg:w-[40%] h-full">
          <OptionSidebar />
        </div>
      </div>

      <MobileOptionDrawer />

      <StickyPriceBar />
    </div>
  );
}
