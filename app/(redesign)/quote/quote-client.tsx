'use client';

import { useState, useActionState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Ruler,
  Home,
  Palette,
  Send,
  Layers,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { submitInquiry } from '@/app/actions/submit-inquiry';
import { productTaglines, sectionHeadlines, successMessages } from '@/lib/witty-copy';
import { toast } from 'sonner';
import type { SizeCategory } from '@/lib/types';

/* ─────────────────────────────────────────
   Step definitions
   ───────────────────────────────────────── */

const STEPS = [
  { id: 'purpose', label: '용도', icon: Home },
  { id: 'size', label: '사이즈', icon: Ruler },
  { id: 'exterior', label: '외장', icon: Palette },
  { id: 'interior', label: '내장', icon: Layers },
  { id: 'options', label: '옵션', icon: Settings },
  { id: 'location', label: '설치 장소', icon: MapPin },
  { id: 'contact', label: '연락처', icon: Send },
] as const;

const STEP_COPY = [
  { title: '어떤 용도로 쓸 건가요?', subtitle: '용도에 맞는 집이 행복의 시작이에요' },
  { title: '어디에 놓을 건가요?', subtitle: '크기가 곧 가능성입니다' },
  { title: '겉은 어떻게 할까요?', subtitle: '첫인상은 외장이 결정해요' },
  { title: '안은요?', subtitle: '매일 마주하는 공간이니까요' },
  { title: '뭐 더 넣을까요?', subtitle: '있으면 좋고, 없어도 괜찮아요' },
  { title: '어디에 설치할까요?', subtitle: '좋은 곳에 좋은 집을 놓아야죠' },
  { title: '거의 다 왔어요!', subtitle: '연락처만 남겨주시면 맞춤 견적을 보내드려요' },
];

/* ─────────────────────────────────────────
   Purpose options
   ───────────────────────────────────────── */

const PURPOSES = [
  {
    id: 'farmhouse',
    label: '농막·체류형 쉼터',
    emoji: '🌿',
    desc: '주말엔 여기서 힐링하고 싶어요',
    witty: '건축 허가 없이 내 땅에 쏙',
    sizes: ['S', 'M'] as SizeCategory[],
  },
  {
    id: 'secondhouse',
    label: '세컨하우스·주말주택',
    emoji: '🏡',
    desc: '금요일 저녁이 기다려지는 집',
    witty: '주말마다 떠나는 내 집',
    sizes: ['M', 'L'] as SizeCategory[],
  },
  {
    id: 'primary',
    label: '본 주거·단독주택',
    emoji: '🏠',
    desc: '진짜 집, 제대로 지어볼까요',
    witty: '온 가족이 함께하는 공간',
    sizes: ['L', 'XL'] as SizeCategory[],
  },
  {
    id: 'commercial',
    label: '상업·사무 공간',
    emoji: '🏢',
    desc: '일하는 공간도 위트있게',
    witty: '비즈니스에 맞춤 설계',
    sizes: ['M', 'L', 'XL'] as SizeCategory[],
  },
];

/* ─────────────────────────────────────────
   Size options
   ───────────────────────────────────────── */

const SIZE_OPTIONS: { size: SizeCategory; dims: string; area: string; price: string }[] = [
  { size: 'S', dims: '3×6m', area: '18㎡', price: '2,500만~' },
  { size: 'M', dims: '3×9m', area: '27㎡', price: '3,800만~' },
  { size: 'L', dims: '6×9m', area: '54㎡', price: '6,500만~' },
  { size: 'XL', dims: '6×12m', area: '72㎡', price: '8,900만~' },
];

/* ─────────────────────────────────────────
   Exterior styles
   ───────────────────────────────────────── */

const EXTERIOR_STYLES = [
  {
    id: 'modern',
    label: '모던 미니멀',
    desc: '깔끔하고 세련된, 도시적인 감각',
    color: '#E8E8E8',
    personality: '심플 이즈 베스트',
  },
  {
    id: 'natural',
    label: '내추럴 우드',
    desc: '자연과 어우러지는 따뜻한 나무결',
    color: '#C4A882',
    personality: '자연이 좋아하는 집',
  },
  {
    id: 'classic',
    label: '클래식 블랙',
    desc: '시간이 지나도 변하지 않는 묵직함',
    color: '#2D2D2A',
    personality: '묵직한 존재감',
  },
  {
    id: 'custom',
    label: '커스텀',
    desc: '나만의 스타일로, 비스포크',
    color: '#FFCA0D',
    gradient: true as const,
    personality: '세상에 하나뿐인 집',
  },
];

/* ─────────────────────────────────────────
   Interior styles
   ───────────────────────────────────────── */

const INTERIOR_STYLES = [
  {
    id: 'white',
    label: '화이트 미니멀',
    desc: '밝고 깨끗한 공간의 정석',
    color: '#F5F5F5',
    personality: '깔끔한 게 최고',
  },
  {
    id: 'wood',
    label: '원목 내추럴',
    desc: '원목의 따뜻함이 가득한 공간',
    color: '#D4B896',
    personality: '나무 향기가 나는 집',
  },
  {
    id: 'gray',
    label: '모던 그레이',
    desc: '세련되고 차분한 모던 감성',
    color: '#9E9E9E',
    personality: '어른의 취향',
  },
  {
    id: 'custom',
    label: '커스텀',
    desc: '직접 고르는 나만의 인테리어',
    color: '#FFCA0D',
    gradient: true as const,
    personality: '취향을 담은 공간',
  },
];

/* ─────────────────────────────────────────
   Special options (grouped)
   ───────────────────────────────────────── */

const OPTION_GROUPS = [
  {
    category: '주방',
    emoji: '🍳',
    items: [
      { id: 'builtinKitchen', label: '빌트인 주방' },
      { id: 'islandTable', label: '아일랜드 식탁' },
    ],
  },
  {
    category: '욕실',
    emoji: '🚿',
    items: [
      { id: 'dryBathroom', label: '건식 욕실' },
      { id: 'bathtub', label: '욕조 옵션' },
    ],
  },
  {
    category: '설비',
    emoji: '⚙️',
    items: [
      { id: 'heating', label: '난방 시스템' },
      { id: 'aircon', label: '에어컨 사전 배관' },
      { id: 'smartHome', label: '스마트홈 패키지' },
    ],
  },
  {
    category: '외부',
    emoji: '🌳',
    items: [
      { id: 'terrace', label: '테라스/데크' },
      { id: 'outdoorFaucet', label: '외부 수전' },
      { id: 'outdoorLighting', label: '외부 조명' },
    ],
  },
  {
    category: '기타',
    emoji: '✨',
    items: [
      { id: 'soundproofing', label: '방음 강화' },
      { id: 'extraWindows', label: '추가 창문' },
    ],
  },
];

const ALL_OPTION_IDS = OPTION_GROUPS.flatMap(g => g.items.map(i => i.id));

const initialState = { success: false, message: '' };

/* ═════════════════════════════════════════
   QuoteClient Component
   ═════════════════════════════════════════ */

export function QuoteClient() {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [size, setSize] = useState<SizeCategory | ''>('');
  const [exterior, setExterior] = useState('');
  const [interior, setInterior] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const prevCountRef = useRef(0);
  const [showCareful, setShowCareful] = useState(false);
  const fullOptionsToastRef = useRef(false);

  useEffect(() => {
    if (state.success) {
      toast.success(successMessages.quote);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  // 인비져블: 풀옵션 이스터에그
  useEffect(() => {
    if (
      selectedOptions.length === ALL_OPTION_IDS.length &&
      !fullOptionsToastRef.current
    ) {
      fullOptionsToastRef.current = true;
      toast('풀옵션이시네요! 😎', { duration: 2500 });
    }
  }, [selectedOptions]);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return purpose !== '';
      case 1: return size !== '';
      case 2: return exterior !== '';
      case 3: return interior !== '';
      case 4: return true;
      case 5: return location !== '';
      case 6: return name !== '' && phone !== '';
      default: return false;
    }
  };

  const next = () => {
    if (canProceed() && step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) {
      prevCountRef.current += 1;
      // 인비져블: 꼼꼼하시네요 이스터에그 (뒤로 3회 이상)
      if (prevCountRef.current >= 3 && !showCareful) {
        setShowCareful(true);
      }
      setStep(step - 1);
    }
  };

  const recommendedSizes = purpose
    ? PURPOSES.find(p => p.id === purpose)?.sizes ?? []
    : [];

  // 인비져블: 프리미엄 구성 감지
  const isPremium =
    size === 'XL' &&
    exterior === 'custom' &&
    interior === 'custom' &&
    selectedOptions.length >= 5;

  // 인비져블: 상황별 다음 버튼 텍스트
  const getNextLabel = (): string => {
    if (step >= 5) return '거의 다 됐어요';
    if (step >= 4) return '좋아요, 다음';
    return '다음';
  };

  // 인비져블: 집 짓기 진행 이모지
  const getProgressEmoji = (): string => {
    if (step <= 1) return '🏗️';
    if (step <= 4) return '🏠';
    return '🏡';
  };

  const buildMessage = (): string => {
    const purposeLabel = PURPOSES.find(p => p.id === purpose)?.label ?? '';
    const sizeOpt = SIZE_OPTIONS.find(s => s.size === size);
    const exteriorLabel =
      EXTERIOR_STYLES.find(e => e.id === exterior)?.label ?? '';
    const interiorLabel =
      INTERIOR_STYLES.find(i => i.id === interior)?.label ?? '';
    const allItems = OPTION_GROUPS.flatMap(g => g.items);
    const optionLabels = selectedOptions
      .map(id => allItems.find(gi => gi.id === id)?.label)
      .filter(Boolean);

    return [
      '[견적 요청]',
      `용도: ${purposeLabel}`,
      `사이즈: ${size} (${sizeOpt?.dims ?? ''} / ${sizeOpt?.area ?? ''})`,
      `외장 스타일: ${exteriorLabel}`,
      `내장 스타일: ${interiorLabel}`,
      `설치 장소: ${location}${locationDetail ? ` — ${locationDetail}` : ''}`,
      optionLabels.length > 0 ? `선택 옵션: ${optionLabels.join(', ')}` : '',
      additionalMessage ? `추가 요청: ${additionalMessage}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  /* ═══════════════════════════════════════
     Success state
     ═══════════════════════════════════════ */

  if (state.success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className="text-center max-w-md"
        >
          {/* 인비져블: 컨페티 느낌 스케일 바운스 (primary yellow #FFCA0D) */}
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(255, 202, 13, 0.2)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: 2, duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Check className="h-10 w-10" style={{ color: '#FFCA0D' }} />
            </motion.div>
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            견적 요청 완료
          </h2>
          <p className="text-muted-foreground">{successMessages.quote}</p>
        </motion.div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     Main render
     ═══════════════════════════════════════ */

  return (
    <div className="min-h-[80vh] py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h1 className="text-h2 text-foreground mb-3">
            {sectionHeadlines.quote}
          </h1>
          <p className="text-body-lg text-muted-foreground">
            {sectionHeadlines.quoteSub}
          </p>
        </div>

        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-1.5 md:gap-2 mb-3">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (i < step) setStep(i);
                  }}
                  className={cn(
                    'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all',
                    i < step && 'bg-primary text-[#2D2D2A] cursor-pointer',
                    i === step && 'bg-foreground text-background',
                    i > step && 'bg-muted text-muted-foreground cursor-default'
                  )}
                  disabled={i > step}
                  aria-label={`${s.label} 단계`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      'w-4 md:w-6 h-0.5',
                      i < step ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>
            ))}
            <span className="ml-2 text-lg" aria-hidden="true">
              {getProgressEmoji()}
            </span>
          </div>

          {/* 인비져블: 꼼꼼하시네요 이스터에그 */}
          <AnimatePresence>
            {showCareful && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground"
              >
                꼼꼼하시네요 :)
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {STEP_COPY[step].title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {STEP_COPY[step].subtitle}
              </p>
            </div>

            {/* ═══ Step 0: 용도 선택 ═══ */}
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PURPOSES.map(p => (
                  <Card
                    key={p.id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      purpose === p.id
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border'
                    )}
                    onClick={() => setPurpose(p.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl" aria-hidden="true">
                          {p.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">
                            {p.label}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {p.desc}
                          </p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            {p.witty}
                          </p>
                          <div className="flex gap-1.5 mt-2">
                            {p.sizes.map(s => (
                              <Badge
                                key={s}
                                variant="secondary"
                                className="text-xs"
                              >
                                {s}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* ═══ Step 1: 사이즈 선택 ═══ */}
            {step === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SIZE_OPTIONS.map(opt => {
                  const isRecommended = recommendedSizes.includes(opt.size);
                  return (
                    <Card
                      key={opt.size}
                      className={cn(
                        'cursor-pointer transition-all hover:shadow-md relative',
                        size === opt.size
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border',
                        isRecommended &&
                          size !== opt.size &&
                          'border-primary/40'
                      )}
                      onClick={() => setSize(opt.size)}
                    >
                      <CardContent className="p-5 text-center">
                        {isRecommended && (
                          <Badge className="absolute -top-2 right-2 bg-primary text-[#2D2D2A] text-[10px]">
                            추천
                          </Badge>
                        )}
                        <p className="text-3xl font-bold text-foreground mb-1">
                          {opt.size}
                        </p>
                        <p className="text-xs text-primary font-medium mb-2">
                          {productTaglines[opt.size]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {opt.dims}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {opt.area}
                        </p>
                        <p className="text-sm font-medium text-foreground mt-2">
                          ₩{opt.price}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* ═══ Step 2: 외장 스타일 ═══ */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXTERIOR_STYLES.map(style => (
                  <Card
                    key={style.id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      exterior === style.id
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border'
                    )}
                    onClick={() => setExterior(style.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex-shrink-0 border border-border/50"
                          style={{
                            background:
                              'gradient' in style
                                ? 'conic-gradient(#E8E8E8, #C4A882, #2D2D2A, #FFCA0D, #E8E8E8)'
                                : style.color,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">
                            {style.label}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {style.desc}
                          </p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            {style.personality}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* ═══ Step 3: 내장 스타일 ═══ */}
            {step === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INTERIOR_STYLES.map(style => (
                  <Card
                    key={style.id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md',
                      interior === style.id
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border'
                    )}
                    onClick={() => setInterior(style.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex-shrink-0',
                            style.id === 'white' && 'border border-border'
                          )}
                          style={{
                            background:
                              'gradient' in style
                                ? 'conic-gradient(#F5F5F5, #D4B896, #9E9E9E, #FFCA0D, #F5F5F5)'
                                : style.color,
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">
                            {style.label}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {style.desc}
                          </p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            {style.personality}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* ═══ Step 4: 특수 옵션 ═══ */}
            {step === 4 && (
              <div className="space-y-6">
                {OPTION_GROUPS.map(group => (
                  <div key={group.category}>
                    <p className="text-sm font-medium text-foreground mb-2">
                      {group.emoji} {group.category}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.items.map(opt => (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => {
                            setSelectedOptions(prev =>
                              prev.includes(opt.id)
                                ? prev.filter(id => id !== opt.id)
                                : [...prev, opt.id]
                            );
                          }}
                          className={cn(
                            'flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all',
                            selectedOptions.includes(opt.id)
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/30'
                          )}
                        >
                          <div
                            className={cn(
                              'w-5 h-5 rounded flex items-center justify-center flex-shrink-0',
                              selectedOptions.includes(opt.id)
                                ? 'bg-primary'
                                : 'border border-border'
                            )}
                          >
                            {selectedOptions.includes(opt.id) && (
                              <Check className="h-3 w-3 text-[#2D2D2A]" />
                            )}
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <Textarea
                  value={additionalMessage}
                  onChange={e => setAdditionalMessage(e.target.value)}
                  placeholder="추가 요청사항이 있으시면 자유롭게 적어주세요"
                  rows={3}
                  className="resize-none mt-2"
                />
              </div>
            )}

            {/* ═══ Step 5: 설치 장소 ═══ */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="quote-location"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    지역 <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="quote-location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="예: 경기도 양평군, 강원도 홍천군"
                    className="h-11"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quote-location-detail"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    상세 정보
                  </label>
                  <Textarea
                    id="quote-location-detail"
                    value={locationDetail}
                    onChange={e => setLocationDetail(e.target.value)}
                    placeholder="서울에서 1시간이면 갈 수 있는 곳이면 좋겠죠? 부지 면적, 도로 접근성, 전기/수도 여부 등을 알려주세요"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            )}

            {/* ═══ Step 6: 연락처 + 요약 ═══ */}
            {step === 6 && (
              <form ref={formRef} action={formAction} className="space-y-5">
                <input type="hidden" name="category" value="Quote" />
                <input type="hidden" name="message" value={buildMessage()} />

                <div>
                  <label
                    htmlFor="quote-name"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
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
                  <label
                    htmlFor="quote-phone"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
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
                  <label
                    htmlFor="quote-email"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
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

                <div className="bg-muted/50 rounded-xl p-5 mt-6">
                  <p className="text-sm font-medium text-foreground mb-3">
                    견적 요약 {isPremium && '✨'}
                  </p>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/70 w-16 flex-shrink-0">
                        용도
                      </span>
                      <span>
                        {PURPOSES.find(p => p.id === purpose)?.emoji}{' '}
                        {PURPOSES.find(p => p.id === purpose)?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/70 w-16 flex-shrink-0">
                        사이즈
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                      <span>
                        {SIZE_OPTIONS.find(s => s.size === size)?.area}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/70 w-16 flex-shrink-0">
                        외장
                      </span>
                      <div
                        className="w-4 h-4 rounded-full border border-border/50"
                        style={{
                          background:
                            EXTERIOR_STYLES.find(e => e.id === exterior)
                              ?.color ?? 'transparent',
                        }}
                      />
                      <span>
                        {EXTERIOR_STYLES.find(e => e.id === exterior)?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/70 w-16 flex-shrink-0">
                        내장
                      </span>
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full',
                          interior === 'white' && 'border border-border'
                        )}
                        style={{
                          background:
                            INTERIOR_STYLES.find(i => i.id === interior)
                              ?.color ?? 'transparent',
                        }}
                      />
                      <span>
                        {INTERIOR_STYLES.find(i => i.id === interior)?.label}
                      </span>
                    </div>
                    {location && (
                      <div className="flex items-start gap-2">
                        <span className="text-foreground/70 w-16 flex-shrink-0">
                          장소
                        </span>
                        <span>{location}</span>
                      </div>
                    )}
                    {selectedOptions.length > 0 && (
                      <div className="flex items-start gap-2">
                        <span className="text-foreground/70 w-16 flex-shrink-0">
                          옵션
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedOptions.map(id => {
                            const label = OPTION_GROUPS.flatMap(
                              g => g.items
                            ).find(gi => gi.id === id)?.label;
                            return label ? (
                              <Badge
                                key={id}
                                variant="outline"
                                className="text-xs"
                              >
                                {label}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPending || !canProceed()}
                  className="w-full h-12 bg-primary text-[#2D2D2A] hover:bg-primary/90 font-semibold rounded-xl text-base mt-4"
                >
                  {isPending ? '전송 중...' : '견적 요청하기'}
                </Button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {step < STEPS.length - 1 && (
          <div className="flex justify-between mt-10">
            <Button
              type="button"
              variant="outline"
              onClick={prev}
              disabled={step === 0}
              className="rounded-full px-6 h-11"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> 이전
            </Button>
            <Button
              type="button"
              onClick={next}
              disabled={!canProceed()}
              className="rounded-full px-6 h-11 bg-foreground text-background hover:bg-foreground/90"
            >
              {getNextLabel()} <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
