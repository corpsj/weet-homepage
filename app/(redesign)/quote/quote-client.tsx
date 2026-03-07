'use client';

import { useState, useActionState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MapPin, Ruler, Home, Palette, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { submitInquiry } from '@/app/actions/submit-inquiry';
import { sectionHeadlines, successMessages } from '@/lib/witty-copy';
import { toast } from 'sonner';
import type { SizeCategory } from '@/lib/types';

const STEPS = [
  { id: 'purpose', label: '용도', icon: Home },
  { id: 'size', label: '사이즈', icon: Ruler },
  { id: 'location', label: '설치 장소', icon: MapPin },
  { id: 'options', label: '선택 사항', icon: Palette },
  { id: 'contact', label: '연락처', icon: Send },
] as const;

const PURPOSES = [
  { id: 'farmhouse', label: '농막·체류형 쉼터', desc: '건축 허가 없이 설치 가능', sizes: ['S', 'M'] as SizeCategory[] },
  { id: 'secondhouse', label: '세컨하우스·주말주택', desc: '주말 휴식을 위한 공간', sizes: ['M', 'L'] as SizeCategory[] },
  { id: 'primary', label: '본 주거·단독주택', desc: '가족이 함께 생활하는 공간', sizes: ['L', 'XL'] as SizeCategory[] },
  { id: 'commercial', label: '상업·사무 공간', desc: '비즈니스를 위한 맞춤 공간', sizes: ['M', 'L', 'XL'] as SizeCategory[] },
];

const SIZE_OPTIONS: { size: SizeCategory; dims: string; area: string; price: string }[] = [
  { size: 'S', dims: '3×6m', area: '18㎡', price: '2,500만~' },
  { size: 'M', dims: '3×9m', area: '27㎡', price: '3,800만~' },
  { size: 'L', dims: '6×9m', area: '54㎡', price: '6,500만~' },
  { size: 'XL', dims: '6×12m', area: '72㎡', price: '8,900만~' },
];

const OPTION_ITEMS = [
  { id: 'exterior', label: '외장 마감 선택' },
  { id: 'interior', label: '내장 마감 선택' },
  { id: 'kitchen', label: '주방 옵션' },
  { id: 'bathroom', label: '욕실 옵션' },
  { id: 'heating', label: '난방 시스템' },
  { id: 'smartHome', label: '스마트홈 패키지' },
];

const initialState = { success: false, message: '' };

export function QuoteClient() {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [size, setSize] = useState<SizeCategory | ''>('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(successMessages.quote);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return purpose !== '';
      case 1: return size !== '';
      case 2: return location !== '';
      case 3: return true;
      case 4: return name !== '' && phone !== '';
      default: return false;
    }
  };

  const next = () => { if (canProceed() && step < 4) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const recommendedSizes = purpose
    ? PURPOSES.find(p => p.id === purpose)?.sizes ?? []
    : [];

  const buildMessage = () => {
    const purposeLabel = PURPOSES.find(p => p.id === purpose)?.label ?? '';
    const sizeOption = SIZE_OPTIONS.find(s => s.size === size);
    const optionLabels = selectedOptions.map(id => OPTION_ITEMS.find(o => o.id === id)?.label).filter(Boolean);
    return [
      `[견적 요청]`,
      `용도: ${purposeLabel}`,
      `사이즈: ${size} (${sizeOption?.dims ?? ''} / ${sizeOption?.area ?? ''})`,
      `설치 장소: ${location}${locationDetail ? ` — ${locationDetail}` : ''}`,
      optionLabels.length > 0 ? `선택 사항: ${optionLabels.join(', ')}` : '',
      additionalMessage ? `추가 요청: ${additionalMessage}` : '',
    ].filter(Boolean).join('\n');
  };

  if (state.success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">견적 요청 완료</h2>
          <p className="text-muted-foreground">{successMessages.quote}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-h2 text-foreground mb-3">{sectionHeadlines.quote}</h1>
          <p className="text-body-lg text-muted-foreground">{sectionHeadlines.quoteSub}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { if (i < step) setStep(i); }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  i < step && 'bg-primary text-[#2D2D2A] cursor-pointer',
                  i === step && 'bg-foreground text-background',
                  i > step && 'bg-muted text-muted-foreground cursor-default'
                )}
                disabled={i > step}
                aria-label={`${s.label} 단계`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn('w-8 h-0.5', i < step ? 'bg-primary' : 'bg-muted')} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-6">어떤 용도로 사용하실 건가요?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PURPOSES.map(p => (
                    <Card
                      key={p.id}
                      className={cn(
                        'cursor-pointer transition-all hover:shadow-md',
                        purpose === p.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                      )}
                      onClick={() => setPurpose(p.id)}
                    >
                      <CardContent className="p-5">
                        <p className="font-semibold text-foreground mb-1">{p.label}</p>
                        <p className="text-sm text-muted-foreground">{p.desc}</p>
                        <div className="flex gap-1.5 mt-3">
                          {p.sizes.map(s => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-6">원하시는 사이즈를 선택하세요</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SIZE_OPTIONS.map(opt => {
                    const isRecommended = recommendedSizes.includes(opt.size);
                    return (
                      <Card
                        key={opt.size}
                        className={cn(
                          'cursor-pointer transition-all hover:shadow-md relative',
                          size === opt.size ? 'border-primary ring-2 ring-primary/20' : 'border-border',
                          isRecommended && size !== opt.size && 'border-primary/40'
                        )}
                        onClick={() => setSize(opt.size)}
                      >
                        <CardContent className="p-5 text-center">
                          {isRecommended && (
                            <Badge className="absolute -top-2 right-2 bg-primary text-[#2D2D2A] text-[10px]">추천</Badge>
                          )}
                          <p className="text-3xl font-bold text-foreground mb-2">{opt.size}</p>
                          <p className="text-sm text-muted-foreground">{opt.dims}</p>
                          <p className="text-sm text-muted-foreground">{opt.area}</p>
                          <p className="text-sm font-medium text-foreground mt-2">₩{opt.price}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">설치할 장소를 알려주세요</h2>
                <div>
                  <label htmlFor="quote-location" className="text-sm font-medium text-foreground mb-1.5 block">
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
                  <label htmlFor="quote-location-detail" className="text-sm font-medium text-foreground mb-1.5 block">
                    상세 정보
                  </label>
                  <Textarea
                    id="quote-location-detail"
                    value={locationDetail}
                    onChange={e => setLocationDetail(e.target.value)}
                    placeholder="부지 면적, 도로 접근성, 전기/수도 여부 등"
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-6">추가 옵션이 있으신가요?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OPTION_ITEMS.map(opt => (
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
                        'flex items-center gap-3 p-4 rounded-xl border text-left transition-all',
                        selectedOptions.includes(opt.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      <div className={cn(
                        'w-5 h-5 rounded flex items-center justify-center flex-shrink-0',
                        selectedOptions.includes(opt.id)
                          ? 'bg-primary'
                          : 'border border-border'
                      )}>
                        {selectedOptions.includes(opt.id) && <Check className="h-3 w-3 text-[#2D2D2A]" />}
                      </div>
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <Textarea
                  value={additionalMessage}
                  onChange={e => setAdditionalMessage(e.target.value)}
                  placeholder="추가 요청사항이 있으시면 자유롭게 적어주세요"
                  rows={3}
                  className="resize-none mt-4"
                />
              </div>
            )}

            {step === 4 && (
              <form ref={formRef} action={formAction} className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-6">연락받으실 정보를 입력해주세요</h2>
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

                <div className="bg-muted/50 rounded-xl p-4 mt-6">
                  <p className="text-sm font-medium text-foreground mb-2">견적 요약</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>용도: {PURPOSES.find(p => p.id === purpose)?.label}</p>
                    <p>사이즈: {size} ({SIZE_OPTIONS.find(s => s.size === size)?.area})</p>
                    <p>설치 장소: {location}</p>
                    {selectedOptions.length > 0 && (
                      <p>선택 옵션: {selectedOptions.map(id => OPTION_ITEMS.find(o => o.id === id)?.label).join(', ')}</p>
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

        {step < 4 && (
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
              다음 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
