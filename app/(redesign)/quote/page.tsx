"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AirVent,
  LayoutGrid,
  Sun,
  Home,
  AppWindow,
  Paintbrush,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type QuoteData = {
  model: "S" | "M" | "L" | "XL" | null;
  purposes: string[];
  options: string[];
  name: string;
  phone: string;
  email: string;
  notes: string;
};

type ModelCode = NonNullable<QuoteData["model"]>;

const steps = ["모델 선택", "용도 선택", "옵션 선택", "연락처 입력"] as const;

const modelCards: {
  code: ModelCode;
  model: string;
  area: string;
  startingPrice: string;
}[] = [
  { code: "S", model: "3X6", area: "약 5평", startingPrice: "기본형부터 상담 안내" },
  { code: "M", model: "3X9", area: "약 8평", startingPrice: "맞춤형부터 상담 안내" },
  { code: "L", model: "18평", area: "가족형 주거", startingPrice: "주거형부터 상담 안내" },
  { code: "XL", model: "30평", area: "프리미엄 주거", startingPrice: "프리미엄형부터 상담 안내" },
];

const purposeOptions = [
  "세컨하우스",
  "농막",
  "체류형 쉼터",
  "본 주거",
  "사무공간",
  "카페/상업",
  "기타",
];

const optionItems = [
  { label: "데크 설치", icon: LayoutGrid },
  { label: "에어컨 설치", icon: AirVent },
  { label: "태양광 패널", icon: Sun },
  { label: "스마트홈 IoT", icon: Home },
  { label: "추가 창문", icon: AppWindow },
  { label: "맞춤 인테리어", icon: Paintbrush },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -60 : 60, opacity: 0 }),
};

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [quoteData, setQuoteData] = useState<QuoteData>({
    model: null,
    purposes: [],
    options: [],
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const progress = useMemo(() => (step / steps.length) * 100, [step]);

  const canMoveNext = useMemo(() => {
    if (step === 1) return quoteData.model !== null;
    if (step === 2) return quoteData.purposes.length > 0;
    if (step === 3) return true;
    return quoteData.name.trim().length > 0 && quoteData.phone.trim().length > 0;
  }, [quoteData, step]);

  const goToNext = () => {
    if (step >= steps.length || !canMoveNext) return;
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const goToPrev = () => {
    if (step <= 1) return;
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const togglePurpose = (value: string) => {
    setQuoteData((prev) => ({
      ...prev,
      purposes: prev.purposes.includes(value)
        ? prev.purposes.filter((item) => item !== value)
        : [...prev.purposes, value],
    }));
  };

  const toggleOption = (value: string) => {
    setQuoteData((prev) => ({
      ...prev,
      options: prev.options.includes(value)
        ? prev.options.filter((item) => item !== value)
        : [...prev.options, value],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canMoveNext || isSubmitting) return;

    setErrorMessage("");
    setIsSubmitting(true);

    const message = [
      "[가이드 견적 신청]",
      `선택 모델: ${quoteData.model ?? "미선택"}`,
      `사용 용도: ${quoteData.purposes.length ? quoteData.purposes.join(", ") : "없음"}`,
      `추가 옵션: ${quoteData.options.length ? quoteData.options.join(", ") : "없음"}`,
      `추가 메모: ${quoteData.notes.trim() || "없음"}`,
    ].join("\n");

    const { error } = await supabase.from("inquiries").insert({
      category: "견적문의",
      name: quoteData.name.trim(),
      email: quoteData.email.trim() || "미입력",
      phone: quoteData.phone.trim(),
      message,
      status: "new",
    });

    if (error) {
      setErrorMessage("전송 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    setSuccess(true);
    setIsSubmitting(false);
    setQuoteData((prev) => ({ ...prev, notes: "" }));
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(254,189,22,0.2),transparent_35%),linear-gradient(180deg,#fff9e8_0%,#ffffff_35%)] pt-28 pb-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-8 rounded-3xl border border-gray-200 bg-white/80 p-5 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">{step}/{steps.length}</p>
            <p className="text-sm text-gray-500">{steps[step - 1]}</p>
          </div>
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 sm:text-sm">
            {steps.map((label, index) => (
              <div
                key={label}
                className={cn(
                  "rounded-xl border px-3 py-2 text-center",
                  step - 1 >= index
                    ? "border-primary bg-primary/10 text-gray-900"
                    : "border-gray-200 bg-white text-gray-400"
                )}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] sm:p-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {step === 1 && (
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    어떤 크기가 좋으세요?
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">원하시는 모델을 하나 선택해주세요.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {modelCards.map((card) => {
                      const selected = quoteData.model === card.code;
                      return (
                        <button
                          key={card.code}
                          type="button"
                          onClick={() => setQuoteData((prev) => ({ ...prev, model: card.code }))}
                          className={cn(
                            "rounded-2xl border p-4 text-left transition",
                            selected
                              ? "border-primary bg-primary/5 ring-2 ring-primary"
                              : "border-gray-200 hover:border-gray-400"
                          )}
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">{card.code}</p>
                          <p className="mt-2 text-lg font-semibold text-gray-900">{card.model}</p>
                          <p className="mt-1 text-sm text-gray-500">{card.area}</p>
                          <p className="mt-3 text-sm font-medium text-gray-700">{card.startingPrice}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    어떤 용도로 사용하시나요?
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">해당되는 항목을 모두 선택해주세요.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {purposeOptions.map((item) => {
                      const selected = quoteData.purposes.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => togglePurpose(item)}
                          className={cn(
                            "min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition",
                            selected
                              ? "border-primary bg-primary/10 text-gray-900"
                              : "border-gray-300 bg-white text-gray-600 hover:border-gray-500"
                          )}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    추가 옵션이 있으신가요?
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">원하시는 옵션을 체크해주세요.</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {optionItems.map((item) => {
                      const selected = quoteData.options.includes(item.label);
                      const Icon = item.icon;
                      return (
                        <label
                          key={item.label}
                          className={cn(
                            "flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition",
                            selected
                              ? "border-primary bg-primary/10"
                              : "border-gray-200 hover:border-gray-400"
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span className="rounded-xl bg-gray-100 p-2">
                              <Icon className="h-4 w-4 text-gray-700" />
                            </span>
                            <span className="text-sm font-medium text-gray-800">{item.label}</span>
                          </span>
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleOption(item.label)}
                            className="h-4 w-4 accent-primary"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    견적을 보내드릴게요!
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    아래 정보를 남겨주시면 빠르게 연락드리겠습니다.
                  </p>
                  <div className="mt-6 grid gap-4">
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      이름
                      <input
                        required
                        type="text"
                        value={quoteData.name}
                        onChange={(event) =>
                          setQuoteData((prev) => ({ ...prev, name: event.target.value }))
                        }
                        className="min-h-[44px] rounded-xl border border-gray-300 px-4 py-2 text-base outline-none transition focus:border-primary"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      연락처
                      <input
                        required
                        type="tel"
                        value={quoteData.phone}
                        onChange={(event) =>
                          setQuoteData((prev) => ({ ...prev, phone: event.target.value }))
                        }
                        className="min-h-[44px] rounded-xl border border-gray-300 px-4 py-2 text-base outline-none transition focus:border-primary"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      이메일
                      <input
                        type="email"
                        value={quoteData.email}
                        onChange={(event) =>
                          setQuoteData((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className="min-h-[44px] rounded-xl border border-gray-300 px-4 py-2 text-base outline-none transition focus:border-primary"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium text-gray-700">
                      추가 메모
                      <textarea
                        rows={4}
                        value={quoteData.notes}
                        onChange={(event) =>
                          setQuoteData((prev) => ({ ...prev, notes: event.target.value }))
                        }
                        className="rounded-xl border border-gray-300 px-4 py-3 text-base outline-none transition focus:border-primary"
                      />
                    </label>
                  </div>

                  {errorMessage && (
                    <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {errorMessage}
                    </p>
                  )}

                  {success && (
                    <p className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                      견적 신청이 완료되었어요! 빠른 시일 내에 맞춤 견적서를 보내드릴게요 :)
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={goToPrev}
              disabled={step === 1 || isSubmitting}
              className="min-h-[44px] rounded-full px-5 text-sm font-semibold text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              이전
            </button>

            {step < steps.length ? (
              <button
                type="button"
                onClick={goToNext}
                disabled={!canMoveNext}
                className="min-h-[44px] rounded-full bg-primary px-6 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                다음
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canMoveNext || isSubmitting || success}
                className="min-h-[44px] rounded-full bg-primary px-6 text-sm font-semibold text-black transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? "전송 중..." : "견적 신청하기"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
