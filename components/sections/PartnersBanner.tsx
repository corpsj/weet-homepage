import Image from 'next/image';

const partnerLogos = [
  { name: 'LEóN Design Studio', logo: '/images/partners/leon-design-studio.webp' },
  { name: '함평군', logo: '/images/partners/hampyeong-county.webp' },
  { name: '함평군 농업기술센터', logo: '/images/partners/hampyeong-tech.webp' },
  { name: 'LX Z:IN', logo: '/images/partners/lx-zin.webp' },
  { name: 'Carrier', logo: '/images/partners/carrier.webp' },
  { name: 'LG HelloVision', logo: '/images/partners/lg-hellovision.webp' },
];

export default function PartnersBanner() {
  return (
    <div className="bg-primary h-[60px] md:h-[70px] lg:h-[80px] flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-[60px] w-full">
        <div className="flex flex-nowrap items-center justify-between gap-12 md:gap-16 lg:gap-24 overflow-x-auto scrollbar-hide">
          {partnerLogos.map((partner, idx) => (
            <div
              key={idx}
              className={`relative ${idx === 2
                ? 'h-16 md:h-14 lg:h-16 w-48 md:w-40 lg:w-48' // Original size for 3rd item (Boosted mobile)
                : 'h-12 md:h-10 lg:h-12 w-36 md:w-28 lg:w-36'  // Smaller size for others (Boosted mobile)
                }`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 144px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
