import Image from 'next/image';

const partnerLogos = [
  { name: 'LEóN Design Studio', logo: '/images/partners/partner-logo.png' },
  { name: '함평군', logo: '/images/partners/hampyeong-1.png' },
  { name: '함평군 농업기술센터', logo: '/images/partners/hampyeong-2.png' },
  { name: 'SNS', logo: '/images/partners/sns-logo.png' },
  { name: 'Fund', logo: '/images/partners/fund-logo.png' },
  { name: 'American Standard', logo: '/images/partners/american-standard.png' },
];

export default function PartnersBanner() {
  return (
    <div className="bg-primary min-h-[80px] md:min-h-[100px] lg:h-[120px] flex items-center justify-center py-4 md:py-6 lg:py-0">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-[150px] w-full">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-8 lg:gap-12">
          {partnerLogos.map((partner, idx) => (
            <div
              key={idx}
              className="relative h-12 md:h-14 lg:h-16 w-32 md:w-40 lg:w-48"
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
