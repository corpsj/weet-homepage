export const COLORS = {
  accent: { hex: '#FFCA0D', hsl: '46 100% 52.5%' },
  primary: { hex: '#2D2D2A', hsl: '60 5.3% 17.1%' },
  background: { hex: '#FAFAFA', hsl: '0 0% 98%' },
} as const

export const TYPOGRAPHY = {
  display: 'text-7xl md:text-8xl font-bold tracking-tight',
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
  h3: 'text-xl md:text-2xl lg:text-3xl font-semibold',
  bodyLg: 'text-base md:text-lg leading-relaxed',
  caption: 'text-sm text-muted-foreground',
} as const

export const SPACING = {
  sectionPaddingY: 'py-16 md:py-24 lg:py-32',
  containerMaxWidth: 'max-w-7xl mx-auto px-4 md:px-6',
  cardGap: 'gap-6 md:gap-8',
} as const

export const Z_INDEX = {
  header: 50,
  overlay: 150,
  modal: 100,
  toast: 200,
  floatingBtn: 40,
} as const
