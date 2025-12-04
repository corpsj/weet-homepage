import Image from 'next/image';

const partnerLogos = [
  { name: 'LEóN Design Studio', logo: '/images/partners/leon-design-studio.png' },
  { name: '함평군', logo: '/images/partners/hampyeong-county.png' },
  { name: '함평군 농업기술센터', logo: '/images/partners/hampyeong-tech.png' },
  { name: 'LX Z:IN', logo: '/images/partners/lx-zin.png' },
  { name: 'Carrier', logo: '/images/partners/carrier.png' },
  { name: 'LG HelloVision', logo: '/images/partners/lg-hellovision.png' },
];

export default function PartnersBanner() {
  return (
    <div className="bg-primary min-h-[80px] md:min-h-[100px] lg:h-[120px] flex items-center justify-center py-4 md:py-6 lg:py-0">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-[150px] w-full">
        <div className="flex flex-nowrap items-center justify-between gap-6 md:gap-8 lg:gap-12 overflow-x-auto scrollbar-hide">
          {partnerLogos.map((partner, idx) => (
            <div
              key={idx}
              className={`relative ${idx === 2
                  ? 'h-12 md:h-14 lg:h-16 w-32 md:w-40 lg:w-48' // Original size for 3rd item
                  : 'h-8 md:h-10 lg:h-12 w-24 md:w-28 lg:w-36'  // Smaller size for others
                }`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
