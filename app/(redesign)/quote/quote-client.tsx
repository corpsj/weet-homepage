'use client';

import { useState, useMemo, useEffect, useRef, useActionState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import { submitInquiry } from '@/app/actions/submit-inquiry';
import { productTaglines, sectionHeadlines, successMessages } from '@/lib/witty-copy';
import { toast } from 'sonner';
import type { SizeCategory } from '@/lib/types';

/* ═══════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════ */

interface MaterialOption {
  id: string;
  label: string;
  price: number;
  desc: string;
  color?: string;
}

interface CheckOption {
  id: string;
  label: string;
  price: number;
  desc: string;
}

interface Config {
  size: SizeCategory;
  exteriorWall: string;
  roof: string;
  floor: string;
  wallFinish: string;
  kitchen: string[];
  bathroom: string[];
  systems: string[];
  outdoor: string[];
}

interface PresetDef {
  name: string;
  desc: string;
  badge?: string;
  config: Config;
}

/* ═══════════════════════════════════════════════
   Constants — Pricing & Materials
   ═══════════════════════════════════════════════ */

const BASE_PRICES: Record<SizeCategory, number> = { S: 2500, M: 3800, L: 6500, XL: 8900 };

const MODEL_INFO: { size: SizeCategory; dims: string; area: string }[] = [
  { size: 'S', dims: '3×6m', area: '18㎡' },
  { size: 'M', dims: '3×9m', area: '27㎡' },
  { size: 'L', dims: '6×9m', area: '54㎡' },
  { size: 'XL', dims: '6×12m', area: '72㎡' },
];

const EXTERIOR_WALL_OPTIONS: MaterialOption[] = [
  { id: 'vinyl', label: '비닐 사이딩', price: 0, desc: '기본 단열 성능의 경제적 마감', color: '#E8E4DE' },
  { id: 'galvalume', label: '갈바륨 강판', price: 180, desc: '내구성과 모던한 외관', color: '#8B8D8F' },
  { id: 'zinc', label: '징크 패널', price: 250, desc: '프리미엄 금속 마감, 반영구적', color: '#6B6E70' },
  { id: 'cedar', label: '적삼목 사이딩', price: 350, desc: '천연 목재의 따뜻한 질감', color: '#A0704E' },
];

const ROOF_OPTIONS: MaterialOption[] = [
  { id: 'shingle', label: '아스팔트 슁글', price: 0, desc: '가성비 좋은 기본 지붕재', color: '#5C5C5C' },
  { id: 'zinc_standing', label: '스탠딩심 징크', price: 120, desc: '현대적 디자인, 우수한 방수 성능', color: '#7A7D80' },
  { id: 'flat_roof', label: '평지붕 방수', price: 80, desc: '옥상 활용 가능한 플랫 루프', color: '#9E9E9E' },
];

const FLOOR_OPTIONS: MaterialOption[] = [
  { id: 'laminate', label: '강마루 (LPM)', price: 0, desc: '관리 쉬운 실용적 바닥재', color: '#D4C5A9' },
  { id: 'engineered', label: '강화마루', price: 100, desc: '원목 느낌의 고급 바닥재', color: '#B8956A' },
  { id: 'spc', label: 'SPC 타일', price: 80, desc: '방수·내구성 우수한 타일형 바닥', color: '#C4B9A8' },
  { id: 'solid_wood', label: '원목마루', price: 250, desc: '천연 원목의 프리미엄 질감', color: '#8B6E4E' },
];

const WALL_FINISH_OPTIONS: MaterialOption[] = [
  { id: 'silk', label: '실크 벽지', price: 0, desc: '깔끔한 기본 마감', color: '#F5F0E8' },
  { id: 'eco_paint', label: '친환경 도장', price: 50, desc: '저VOC 친환경 페인트', color: '#EDE8DF' },
  { id: 'diatomite', label: '규조토 도장', price: 80, desc: '습도 조절, 탈취 기능', color: '#E0D8CC' },
  { id: 'wood_panel', label: '원목 패널 (포인트)', price: 180, desc: '벽면 포인트 원목 마감', color: '#A0845C' },
];

const KITCHEN_OPTIONS: CheckOption[] = [
  { id: 'builtin', label: '빌트인 가전 패키지', price: 350, desc: '오븐+전기레인지+후드' },
  { id: 'island', label: '아일랜드 식탁', price: 200, desc: '개방형 주방 활용' },
  { id: 'quartz', label: '쿼츠 상판 업그레이드', price: 150, desc: '내구성 우수한 프리미엄 상판' },
];

const BATHROOM_OPTIONS: CheckOption[] = [
  { id: 'dry_separation', label: '건식 분리 시스템', price: 80, desc: '건식·습식 분리 설계' },
  { id: 'whirlpool', label: '월풀 욕조', price: 180, desc: '릴렉스를 위한 욕조' },
  { id: 'rain_shower', label: '레인샤워 시스템', price: 60, desc: '호텔식 레인샤워' },
];

const SYSTEMS_OPTIONS: CheckOption[] = [
  { id: 'ac_pipe', label: '에어컨 사전 배관', price: 50, desc: '입주 후 에어컨 설치 편리' },
  { id: 'smart_home', label: '스마트홈 패키지', price: 200, desc: '조명·난방·보안 원격 제어' },
  { id: 'solar', label: '태양광 패널 (3kW)', price: 400, desc: '전기요금 절감, 친환경' },
  { id: 'ev_charger', label: '전기차 충전 콘센트', price: 30, desc: 'EV 충전 인프라 사전 설치' },
  { id: 'soundproofing', label: '방음 강화', price: 120, desc: '이중 유리 + 방음 단열재' },
  { id: 'extra_window', label: '추가 창문 (1개소)', price: 40, desc: '채광 확대' },
];

const OUTDOOR_OPTIONS: CheckOption[] = [
  { id: 'deck', label: '테라스 데크 (3×3m)', price: 150, desc: '야외 생활 공간 확보' },
  { id: 'water_tap', label: '외부 수전', price: 30, desc: '정원·세차 용수 확보' },
  { id: 'lighting', label: '외부 조명 패키지', price: 50, desc: '현관·데크 조명 세트' },
  { id: 'storage', label: '외부 수납장', price: 80, desc: '정원용품·장비 보관' },
];

/* ═══════════════════════════════════════════════
   Presets
   ═══════════════════════════════════════════════ */

const DEFAULT_CONFIG: Config = {
  size: 'S',
  exteriorWall: 'vinyl',
  roof: 'shingle',
  floor: 'laminate',
  wallFinish: 'silk',
  kitchen: [],
  bathroom: [],
  systems: [],
  outdoor: [],
};

const PRESETS: PresetDef[] = [
  {
    name: '농막 기본형',
    desc: '실용적인 최소 구성',
    config: { ...DEFAULT_CONFIG },
  },
  {
    name: '세컨하우스 추천',
    desc: '주말 체류에 딱 맞는 구성',
    badge: '인기',
    config: {
      size: 'M',
      exteriorWall: 'galvalume',
      roof: 'shingle',
      floor: 'engineered',
      wallFinish: 'eco_paint',
      kitchen: ['builtin'],
      bathroom: ['dry_separation'],
      systems: ['ac_pipe'],
      outdoor: [],
    },
  },
  {
    name: '프리미엄 하우스',
    desc: '품격있는 본 주거 구성',
    config: {
      size: 'L',
      exteriorWall: 'cedar',
      roof: 'zinc_standing',
      floor: 'solid_wood',
      wallFinish: 'wood_panel',
      kitchen: ['builtin', 'island'],
      bathroom: ['rain_shower'],
      systems: ['ac_pipe'],
      outdoor: [],
    },
  },
];

/* ═══════════════════════════════════════════════
   Price calculation helper
   ═══════════════════════════════════════════════ */

function calcTotal(c: Config): number {
  let total = BASE_PRICES[c.size];
  total += EXTERIOR_WALL_OPTIONS.find(o => o.id === c.exteriorWall)?.price ?? 0;
  total += ROOF_OPTIONS.find(o => o.id === c.roof)?.price ?? 0;
  total += FLOOR_OPTIONS.find(o => o.id === c.floor)?.price ?? 0;
  total += WALL_FINISH_OPTIONS.find(o => o.id === c.wallFinish)?.price ?? 0;
  for (const id of c.kitchen) total += KITCHEN_OPTIONS.find(o => o.id === id)?.price ?? 0;
  for (const id of c.bathroom) total += BATHROOM_OPTIONS.find(o => o.id === id)?.price ?? 0;
  for (const id of c.systems) total += SYSTEMS_OPTIONS.find(o => o.id === id)?.price ?? 0;
  for (const id of c.outdoor) total += OUTDOOR_OPTIONS.find(o => o.id === id)?.price ?? 0;
  return total;
}

/* ═══════════════════════════════════════════════
   Animated number hook (CountUp-style)
   ═══════════════════════════════════════════════ */

function useAnimatedNumber(target: number, duration = 500) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    const start = prevRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

/* ═══════════════════════════════════════════════
   Form initial state
   ═══════════════════════════════════════════════ */

const initialFormState = { success: false, message: '' };

/* ═══════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════ */

export function QuoteClient() {
  /* ── state ── */
  const [config, setConfig] = useState<Config>({ ...DEFAULT_CONFIG });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [formState, formAction, isPending] = useActionState(submitInquiry, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  /* easter egg state */
  const fullOptionsToastRef = useRef(false);
  const [clickedPresets, setClickedPresets] = useState<Set<number>>(new Set());
  const allPresetsClickedRef = useRef(false);

  /* ── computed ── */
  const totalPrice = useMemo(() => calcTotal(config), [config]);
  const animatedPrice = useAnimatedNumber(totalPrice);
  const isOverBillion = totalPrice > 10000;
  const modelInfo = MODEL_INFO.find(m => m.size === config.size);

  const isFullOptions = useMemo(() => {
    return (
      config.kitchen.length === KITCHEN_OPTIONS.length &&
      config.bathroom.length === BATHROOM_OPTIONS.length &&
      config.systems.length === SYSTEMS_OPTIONS.length &&
      config.outdoor.length === OUTDOOR_OPTIONS.length
    );
  }, [config.kitchen, config.bathroom, config.systems, config.outdoor]);

  /* ── helpers ── */
  const updateRadio = (key: 'exteriorWall' | 'roof' | 'floor' | 'wallFinish', value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleCheck = (key: 'kitchen' | 'bathroom' | 'systems' | 'outdoor', id: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter(v => v !== id) : [...prev[key], id],
    }));
  };

  const applyPreset = (preset: PresetDef, index: number) => {
    setConfig({ ...preset.config });
    toast(`'${preset.name}' 구성이 적용되었어요`);
    setClickedPresets(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── easter eggs ── */
  useEffect(() => {
    if (isFullOptions && !fullOptionsToastRef.current) {
      fullOptionsToastRef.current = true;
      toast('풀옵션이시네요! 프리미엄 상담 연결해 드릴게요 😎', { duration: 3000 });
    }
  }, [isFullOptions]);

  useEffect(() => {
    if (clickedPresets.size === PRESETS.length && !allPresetsClickedRef.current) {
      allPresetsClickedRef.current = true;
      toast('다 둘러보셨네요 :)', { duration: 2000 });
    }
  }, [clickedPresets]);

  /* ── form handling ── */
  useEffect(() => {
    if (formState.success) {
      toast.success(successMessages.quote);
    } else if (formState.message && !formState.success) {
      toast.error(formState.message);
    }
  }, [formState]);

  const buildMessage = (): string => {
    const m = modelInfo;
    const extWall = EXTERIOR_WALL_OPTIONS.find(o => o.id === config.exteriorWall);
    const roof = ROOF_OPTIONS.find(o => o.id === config.roof);
    const floor = FLOOR_OPTIONS.find(o => o.id === config.floor);
    const wall = WALL_FINISH_OPTIONS.find(o => o.id === config.wallFinish);

    const priceLabel = (price: number) => (price > 0 ? `(+${price}만)` : '(포함)');

    const lines: string[] = [
      '[모듈러 홈 견적 요청]',
      `모델: ${config.size} (${m?.dims ?? ''} / ${m?.area ?? ''})`,
      `기본가: ${BASE_PRICES[config.size].toLocaleString()}만`,
      '',
      '[외장 마감]',
      `외벽: ${extWall?.label ?? ''} ${priceLabel(extWall?.price ?? 0)}`,
      `지붕: ${roof?.label ?? ''} ${priceLabel(roof?.price ?? 0)}`,
      '',
      '[내장 마감]',
      `바닥: ${floor?.label ?? ''} ${priceLabel(floor?.price ?? 0)}`,
      `벽체: ${wall?.label ?? ''} ${priceLabel(wall?.price ?? 0)}`,
    ];

    const addCheckSection = (title: string, ids: string[], options: CheckOption[]) => {
      if (ids.length === 0) return;
      lines.push('', `[${title}]`);
      for (const id of ids) {
        const opt = options.find(o => o.id === id);
        if (opt) lines.push(`${opt.label} (+${opt.price}만)`);
      }
    };

    addCheckSection('주방', config.kitchen, KITCHEN_OPTIONS);
    addCheckSection('욕실', config.bathroom, BATHROOM_OPTIONS);
    addCheckSection('설비', config.systems, SYSTEMS_OPTIONS);
    addCheckSection('외부', config.outdoor, OUTDOOR_OPTIONS);

    if (additionalMessage.trim()) {
      lines.push('', `[추가 요청]`, additionalMessage.trim());
    }

    lines.push('', `예상 견적: ₩${totalPrice.toLocaleString()}만~`);

    return lines.join('\n');
  };

  /* ── sidebar data ── */
  const sidebarItems = useMemo(() => {
    const items: { label: string; value: string; price: number }[] = [];

    const ext = EXTERIOR_WALL_OPTIONS.find(o => o.id === config.exteriorWall);
    if (ext) items.push({ label: '외벽', value: ext.label, price: ext.price });

    const roof = ROOF_OPTIONS.find(o => o.id === config.roof);
    if (roof) items.push({ label: '지붕', value: roof.label, price: roof.price });

    const floor = FLOOR_OPTIONS.find(o => o.id === config.floor);
    if (floor) items.push({ label: '바닥', value: floor.label, price: floor.price });

    const wall = WALL_FINISH_OPTIONS.find(o => o.id === config.wallFinish);
    if (wall) items.push({ label: '벽체', value: wall.label, price: wall.price });

    const addChecks = (label: string, ids: string[], opts: CheckOption[]) => {
      for (const id of ids) {
        const o = opts.find(x => x.id === id);
        if (o) items.push({ label, value: o.label, price: o.price });
      }
    };

    addChecks('주방', config.kitchen, KITCHEN_OPTIONS);
    addChecks('욕실', config.bathroom, BATHROOM_OPTIONS);
    addChecks('설비', config.systems, SYSTEMS_OPTIONS);
    addChecks('외부', config.outdoor, OUTDOOR_OPTIONS);

    return items;
  }, [config]);

  /* ═══════════════════════════════════════
     Success state
     ═══════════════════════════════════════ */

  if (formState.success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="text-center max-w-md"
        >
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(255, 202, 13, 0.2)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: 2, duration: 0.5, delay: 0.3 }}
          >
            <Check className="h-10 w-10" style={{ color: '#FFCA0D' }} />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-3">견적 요청 완료</h2>
          <p className="text-muted-foreground">{successMessages.quote}</p>
        </motion.div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     Render helpers
     ═══════════════════════════════════════ */

  const PriceBadge = ({ price }: { price: number }) =>
    price === 0 ? (
      <Badge variant="secondary" className="text-xs font-medium">포함</Badge>
    ) : (
      <Badge className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/10 border-0">
        +{price}만
      </Badge>
    );

  const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );

  const SubSectionTitle = ({ title }: { title: string }) => (
    <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">{title}</h4>
  );

  /* ── Radio option card ── */
  const RadioCard = ({
    option,
    selected,
    onSelect,
  }: {
    option: MaterialOption;
    selected: boolean;
    onSelect: () => void;
  }) => (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border text-left transition-all w-full',
        selected ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/30',
      )}
    >
      {option.color && (
        <div
          className="w-8 h-8 rounded-lg flex-shrink-0 border border-border/30"
          style={{ backgroundColor: option.color }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground">{option.label}</span>
          <PriceBadge price={option.price} />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
      </div>
      {selected && (
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check className="h-3 w-3 text-[#2D2D2A]" />
        </div>
      )}
    </motion.button>
  );

  /* ── Checkbox option card ── */
  const CheckCard = ({
    option,
    checked,
    onToggle,
  }: {
    option: CheckOption;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border text-left transition-all w-full',
        checked ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border hover:border-primary/30',
      )}
    >
      <div
        className={cn(
          'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5',
          checked ? 'bg-primary' : 'border-2 border-border',
        )}
      >
        {checked && <Check className="h-3 w-3 text-[#2D2D2A]" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-foreground">{option.label}</span>
          <PriceBadge price={option.price} />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{option.desc}</p>
      </div>
    </motion.button>
  );

  /* ═══════════════════════════════════════
     Main render
     ═══════════════════════════════════════ */

  return (
    <div className="min-h-screen py-12 md:py-20 pb-28 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ── Page Header ── */}
        <div className="text-center mb-12">
          <h1 className="text-h2 text-foreground mb-3">{sectionHeadlines.quote}</h1>
          <p className="text-body-lg text-muted-foreground">{sectionHeadlines.quoteSub}</p>
        </div>

        {/* ── Split-screen Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* ════════════ LEFT: Scrollable Options ════════════ */}
          <div className="space-y-14">
            {/* ── Section 0: 인기 구성 (Presets) ── */}
            <ScrollReveal>
              <SectionTitle title="인기 구성" subtitle="잘 팔리는 조합을 먼저 확인해보세요" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PRESETS.map((preset, i) => {
                  const presetPrice = calcTotal(preset.config);
                  return (
                    <motion.div key={preset.name} whileTap={{ scale: 0.97 }}>
                      <Card
                        className={cn(
                          'cursor-pointer transition-all hover:shadow-md relative h-full',
                          JSON.stringify(config) === JSON.stringify(preset.config)
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-border',
                        )}
                        onClick={() => applyPreset(preset, i)}
                      >
                        <CardContent className="p-5">
                          {preset.badge && (
                            <Badge className="absolute -top-2.5 right-3 bg-primary text-[#2D2D2A] text-[10px] font-bold">
                              {preset.badge}
                            </Badge>
                          )}
                          <p className="font-bold text-foreground text-base">{preset.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{preset.desc}</p>
                          <p className="text-lg font-bold text-foreground mt-3">
                            ₩{presetPrice.toLocaleString()}만~
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollReveal>

            {/* ── Section 1: 모델 선택 ── */}
            <ScrollReveal>
              <SectionTitle title="모델 선택" subtitle="공간의 시작은 사이즈부터" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MODEL_INFO.map(m => (
                  <motion.div key={m.size} whileTap={{ scale: 0.97 }}>
                    <Card
                      className={cn(
                        'cursor-pointer transition-all hover:shadow-md h-full',
                        config.size === m.size
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border',
                      )}
                      onClick={() => setConfig(prev => ({ ...prev, size: m.size }))}
                    >
                      <CardContent className="p-5 text-center">
                        <p className="text-4xl font-black text-foreground">{m.size}</p>
                        <p className="text-xs text-primary font-medium mt-1">
                          {productTaglines[m.size]}
                        </p>
                        <div className="mt-3 space-y-0.5">
                          <p className="text-sm text-muted-foreground">{m.dims}</p>
                          <p className="text-sm text-muted-foreground">{m.area}</p>
                        </div>
                        <p className="text-sm font-bold text-foreground mt-2">
                          ₩{BASE_PRICES[m.size].toLocaleString()}만~
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* ── Section 2: 외장 마감 ── */}
            <ScrollReveal>
              <SectionTitle title="외장 마감" subtitle="첫인상을 결정짓는 외관 소재" />

              <SubSectionTitle title="외벽 마감재" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {EXTERIOR_WALL_OPTIONS.map(opt => (
                  <RadioCard
                    key={opt.id}
                    option={opt}
                    selected={config.exteriorWall === opt.id}
                    onSelect={() => updateRadio('exteriorWall', opt.id)}
                  />
                ))}
              </div>

              <SubSectionTitle title="지붕 마감재" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROOF_OPTIONS.map(opt => (
                  <RadioCard
                    key={opt.id}
                    option={opt}
                    selected={config.roof === opt.id}
                    onSelect={() => updateRadio('roof', opt.id)}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* ── Section 3: 내장 마감 ── */}
            <ScrollReveal>
              <SectionTitle title="내장 마감" subtitle="매일 마주하는 공간의 질감" />

              <SubSectionTitle title="바닥재" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {FLOOR_OPTIONS.map(opt => (
                  <RadioCard
                    key={opt.id}
                    option={opt}
                    selected={config.floor === opt.id}
                    onSelect={() => updateRadio('floor', opt.id)}
                  />
                ))}
              </div>

              <SubSectionTitle title="벽체 마감" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WALL_FINISH_OPTIONS.map(opt => (
                  <RadioCard
                    key={opt.id}
                    option={opt}
                    selected={config.wallFinish === opt.id}
                    onSelect={() => updateRadio('wallFinish', opt.id)}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* ── Section 4: 주방·욕실 ── */}
            <ScrollReveal>
              <SectionTitle title="주방·욕실" subtitle="생활의 핵심 공간을 업그레이드" />

              <SubSectionTitle title="주방" />
              <div className="mb-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 mb-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">기본 주방 (싱크대+가스레인지)</span>
                  <Badge variant="secondary" className="text-xs ml-auto">포함</Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {KITCHEN_OPTIONS.map(opt => (
                  <CheckCard
                    key={opt.id}
                    option={opt}
                    checked={config.kitchen.includes(opt.id)}
                    onToggle={() => toggleCheck('kitchen', opt.id)}
                  />
                ))}
              </div>

              <SubSectionTitle title="욕실" />
              <div className="mb-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 mb-3">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">기본 욕실 (샤워부스+세면대+양변기)</span>
                  <Badge variant="secondary" className="text-xs ml-auto">포함</Badge>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BATHROOM_OPTIONS.map(opt => (
                  <CheckCard
                    key={opt.id}
                    option={opt}
                    checked={config.bathroom.includes(opt.id)}
                    onToggle={() => toggleCheck('bathroom', opt.id)}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* ── Section 5: 설비·기능 ── */}
            <ScrollReveal>
              <SectionTitle title="설비·기능" subtitle="편리함을 더하는 스마트 옵션" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SYSTEMS_OPTIONS.map(opt => (
                  <CheckCard
                    key={opt.id}
                    option={opt}
                    checked={config.systems.includes(opt.id)}
                    onToggle={() => toggleCheck('systems', opt.id)}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* ── Section 6: 외부 옵션 ── */}
            <ScrollReveal>
              <SectionTitle title="외부 옵션" subtitle="집 밖 공간도 위트있게" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OUTDOOR_OPTIONS.map(opt => (
                  <CheckCard
                    key={opt.id}
                    option={opt}
                    checked={config.outdoor.includes(opt.id)}
                    onToggle={() => toggleCheck('outdoor', opt.id)}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* ── Section 7: 연락처 + 최종 요약 ── */}
            <ScrollReveal>
              <div ref={contactRef}>
                <SectionTitle title="견적 요청" subtitle="맞춤 견적을 받아보세요" />

                {/* Summary card */}
                <Card className="mb-6">
                  <CardContent className="p-5">
                    <p className="text-sm font-bold text-foreground mb-4">구성 요약</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">모델</span>
                        <span className="font-medium text-foreground">
                          {config.size} · {modelInfo?.dims} · {modelInfo?.area}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">기본가</span>
                        <span className="font-medium text-foreground">
                          {BASE_PRICES[config.size].toLocaleString()}만
                        </span>
                      </div>
                      <div className="border-t my-2" />
                      {sidebarItems.map((item, i) => (
                        <div key={`${item.label}-${item.value}-${i}`} className="flex justify-between">
                          <span className="text-muted-foreground">{item.value}</span>
                          <span className={cn('font-medium', item.price > 0 ? 'text-primary' : 'text-muted-foreground')}>
                            {item.price > 0 ? `+${item.price}만` : '포함'}
                          </span>
                        </div>
                      ))}
                      <div className="border-t my-2" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground">예상 견적</span>
                        <span className="text-lg font-black text-foreground">
                          ₩{totalPrice.toLocaleString()}만~
                          {isOverBillion && <Sparkles className="inline-block h-4 w-4 ml-1 text-primary" />}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact form */}
                <form ref={formRef} action={formAction} className="space-y-4">
                  <input type="hidden" name="category" value="Quote" />
                  <input type="hidden" name="message" value={buildMessage()} />

                  <div>
                    <label htmlFor="quote-name" className="text-sm font-medium text-foreground mb-1.5 block">
                      이름 <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="quote-name"
                      name="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="홍길동"
                      required
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className="text-sm font-medium text-foreground mb-1.5 block">
                      연락처 <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      required
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-email" className="text-sm font-medium text-foreground mb-1.5 block">
                      이메일
                    </label>
                    <Input
                      id="quote-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-additional" className="text-sm font-medium text-foreground mb-1.5 block">
                      추가 요청사항
                    </label>
                    <Textarea
                      id="quote-additional"
                      value={additionalMessage}
                      onChange={e => setAdditionalMessage(e.target.value)}
                      placeholder="설치 예정 지역, 입주 시기, 특별 요청 등을 자유롭게 적어주세요"
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending || !name || !phone}
                    className="w-full h-12 bg-primary text-[#2D2D2A] hover:bg-primary/90 font-bold rounded-xl text-base"
                  >
                    {isPending ? '전송 중...' : '이 구성으로 상담하기'}
                    {!isPending && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-2">
                    실제 가격은 현장 조건에 따라 달라질 수 있습니다
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* ════════════ RIGHT: Sticky Sidebar (Desktop) ════════════ */}
          <div className="hidden lg:block">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card className="rounded-2xl border shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm font-bold text-foreground mb-4">내 구성</p>

                  {/* Model display */}
                  <div className="text-center mb-5 py-3 bg-muted/30 rounded-xl">
                    <p className="text-4xl font-black text-foreground">{config.size}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {modelInfo?.dims} · {modelInfo?.area}
                    </p>
                  </div>

                  {/* Price lines */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">기본가</span>
                      <span className="font-medium text-foreground">
                        {BASE_PRICES[config.size].toLocaleString()}만
                      </span>
                    </div>

                    <div className="border-t my-3" />

                    <AnimatePresence mode="popLayout">
                      {sidebarItems.map((item, i) => (
                        <motion.div
                          key={`${item.label}-${item.value}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex justify-between"
                        >
                          <span className="text-muted-foreground truncate mr-2">{item.value}</span>
                          <span
                            className={cn(
                              'font-medium flex-shrink-0',
                              item.price > 0 ? 'text-primary' : 'text-muted-foreground',
                            )}
                          >
                            {item.price > 0 ? `+${item.price}만` : '포함'}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Total */}
                  <div className="border-t my-4" />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">예상 견적</p>
                    <p className="text-3xl font-black text-foreground">
                      ₩{animatedPrice.toLocaleString()}만~
                      {isOverBillion && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-block ml-1"
                        >
                          <Sparkles className="inline-block h-5 w-5 text-primary" />
                        </motion.span>
                      )}
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    type="button"
                    onClick={scrollToContact}
                    className="w-full h-12 mt-5 bg-primary text-[#2D2D2A] hover:bg-primary/90 font-bold rounded-xl text-base"
                  >
                    이 구성으로 상담하기
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <p className="text-[11px] text-center text-muted-foreground mt-3">
                    참고가이며 실제 가격은 상담 후 확정됩니다
                  </p>

                  {/* weet :) watermark */}
                  <p className="text-[10px] text-muted-foreground/20 text-right mt-4 select-none">
                    weet :)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ MOBILE: Sticky Bottom Bar ════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div>
            <p className="text-xs text-muted-foreground">예상 견적</p>
            <p className="text-lg font-black text-foreground">
              ₩{animatedPrice.toLocaleString()}만~
              {isOverBillion && <Sparkles className="inline-block h-4 w-4 ml-1 text-primary" />}
            </p>
          </div>
          <Button
            type="button"
            onClick={scrollToContact}
            className="h-10 px-5 bg-primary text-[#2D2D2A] hover:bg-primary/90 font-bold rounded-xl text-sm"
          >
            상담하기
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
