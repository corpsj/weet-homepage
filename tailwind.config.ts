import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FEBD16', // weet yellow
          dark: '#E5A410',
        },
        // /customize 컨피규레이터 전용 색 토큰. 값은 기존 하드코딩 hex와 1:1로 동일하다(픽셀 동일성 보장).
        customize: {
          sand: '#fbfaf7',
          linen: '#f4f0e8',
          oat: '#f5f1ea',
          dune: '#efe6d4',
          cream: '#f8f1e0',
          shell: '#e2dacd',
          taupe: '#ded5c8',
          stone: '#d8d0c3',
          clay: '#cfc4b3',
          mushroom: '#b9aa94',
          ash: '#bcb2a3',
          slate: '#8a806f',
          haze: '#83796a',
          fog: '#8b8172',
          mist: '#9a8f7d',
          pebble: '#756d61',
          umber: '#6f6658',
          gravel: '#6f6a60',
          driftwood: '#7b7468',
          cocoa: '#5f574d',
          espresso: '#4f473d',
          ink: '#2f3432',
          'ink-dark': '#1f2422',
          shade: '#4b4033',
          teal: '#0d6e66',
          'teal-dark': '#095a54',
          bark: '#b88b26',
          amber: '#a56f16',
          olive: '#7a6a3a',
          bronze: '#6b5a2b',
          'bronze-dark': '#6d5b2b',
          ochre: '#7a5a12',
          'ochre-soft': '#8a6c2a',
          wheat: '#e3cf9f',
          error: '#c0392b',
          mint: '#eef5f1',
          sage: '#bcd8cd',
          pine: '#4f6258',
          bisque: '#eee8dc',
          ecru: '#efe9dd',
        },
        // 리디자인 웜 시스템 토큰 (공개 페이지). README design tokens 1:1.
        weet: {
          paper: '#F6F1E8',       // 기본 배경
          'paper-alt': '#EFE8DA', // 섹션 교차 배경
          surface: '#FAF6EE',     // 카드 내부
          'surface-2': '#FBF8F2', // 카드 내부(대안)
          ink: '#231D16',         // 주 텍스트·다크 섹션 배경
          'ink-deep': '#1C1610',  // 푸터 배경
          sub: '#5A5044',         // 보조 텍스트
          muted: '#8C8273',       // 캡션
          line: '#E5DBC9',        // 보더
          'line-2': '#E0D6C4',    // 보더(대안)
          gold: '#FDB813',        // 1차 액센트(CTA·강조)
          'gold-deep': '#B8791A', // 링크 호버·eyebrow
          forest: '#2E4A3F',      // 2차 액센트(솔루션·확정 상태)
        },
        // 관리자 콘솔 2안(라이트·인박스). README admin tokens.
        admin: {
          bg: '#f7f7f8',
          card: '#ffffff',
          ink: '#18181b',
          muted: '#71717a',
          line: '#ececed',
          'line-2': '#e4e4e7',
          accent: '#2563eb',
          'accent-hover': '#1d4ed8',
          'accent-soft': '#eff6ff',
          'accent-line': '#bfdbfe',
        },
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        // Geist(영문·숫자) → Noto Sans KR(한글) → 시스템 폴백
        sans: [
          'var(--font-geist-sans)',
          'var(--font-noto-sans)',
          'system-ui',
          'sans-serif',
        ],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        // 리디자인 부상형 이미지·카드 그림자 (README)
        'weet-float': '0 30px 60px -34px rgba(35,29,22,.5)',
        'weet-card': '0 1px 3px rgba(0,0,0,.04)',
      },
    },
  },
  plugins: [],
};

export default config;
