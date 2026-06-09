# GPT-5.5 Pro Review Packet (Slim Retry)

Marker: `WEET_REVIEW_20260609_SOLUTION_RENEWAL_06`

## Why this is a retry

The full local review packet `.codex/review-packet.md` exists and includes the full diff, but the first Chrome/ChatGPT run `WEET_REVIEW_20260609_SOLUTION_RENEWAL_05` hung after reading a 113k markdown attachment. This slim retry keeps the review focused while preserving the full packet locally.

## Task

Review Weet public `/solution` and solution detail renewal. User required Korean photorealistic option-focused images, not big house/building images. User wants a premium/trendy Korean mobile-home/modular-space site.

## What changed

- `/solution` rebuilt as four customer-facing operation options: `안심 출입`, `끊김 없는 연결`, `원격 준비`, `현장 완성`.
- Detail pages `/solution/cctv`, `/solution/network`, `/solution/iot`, `/solution/design` rebuilt with: recommended sites, scope, consultation decisions, outcomes, CTAs.
- Four final generated assets added under `public/images/solution/generated/`:
  - `kr-security-realphoto.webp`: CCTV/sensor-light/smart-lock close-up; earlier large-building security image was rejected after Stickies steering.
  - `kr-network-realphoto.webp`: POS/router/network cabinet in Korean roadside modular cafe.
  - `kr-control-realphoto.webp`: smart switch/control panel/phone detail in Korean modular interior.
  - `kr-brandfit-realphoto.webp`: facade/sign-frame/deck/planting/drainage site-finish detail.
- Metadata and E2E assertion updated.
- Antigravity was attempted but produced no code diff, recorded as failure; Codex implemented directly.

## Git status

```text
## zoo/customize-configurator...origin/zoo/customize-configurator
 M .codex/review-packet.md
 M .codex/state.md
 M agent-inbox/antigravity-failures.md
 M agent-inbox/findings-public-simulation.md
 M agent-inbox/implementation-backlog.md
 M agent-inbox/pro-review-failures.md
 M app/solution/cctv/layout.tsx
 M app/solution/cctv/page.tsx
 M app/solution/design/layout.tsx
 M app/solution/design/page.tsx
 M app/solution/iot/layout.tsx
 M app/solution/iot/page.tsx
 M app/solution/network/layout.tsx
 M app/solution/network/page.tsx
 M app/solution/page.tsx
 M components/solution/SolutionTemplate.tsx
 M e2e/public-pages.spec.ts
?? .codex/qa/solution-renewal-20260609/
?? .codex/qa/solution-renewal-before-20260609/
?? agent-inbox/solution-renewal-assets.md
?? public/images/solution/generated/

```

## Diff stat

```text
 app/solution/cctv/layout.tsx             |   8 +-
 app/solution/cctv/page.tsx               | 146 +++------
 app/solution/design/layout.tsx           |   8 +-
 app/solution/design/page.tsx             | 144 +++------
 app/solution/iot/layout.tsx              |   8 +-
 app/solution/iot/page.tsx                | 146 +++------
 app/solution/network/layout.tsx          |   8 +-
 app/solution/network/page.tsx            | 146 +++------
 app/solution/page.tsx                    | 498 +++++++++++++++++--------------
 components/solution/SolutionTemplate.tsx | 388 ++++++++++++------------
 e2e/public-pages.spec.ts                 |  13 +-
 11 files changed, 692 insertions(+), 821 deletions(-)

```

## Main package/data lines

```text
app/solution/page.tsx:20:  href: string;
app/solution/page.tsx:21:  image: string;
app/solution/page.tsx:23:  title: string;
app/solution/page.tsx:24:  subtitle: string;
app/solution/page.tsx:25:  problem: string;
app/solution/page.tsx:26:  promise: string;
app/solution/page.tsx:27:  details: string[];
app/solution/page.tsx:28:  proof: string;
app/solution/page.tsx:33:  title: string;
app/solution/page.tsx:43:  ctaPrimary: string;
app/solution/page.tsx:44:  ctaSecondary: string;
app/solution/page.tsx:46:  process: Array<{ title: string; body: string }>;
app/solution/page.tsx:52:    title: "운영까지 준비된 모듈러 공간",
app/solution/page.tsx:65:    ctaPrimary: "주문 옵션 확인",
app/solution/page.tsx:66:    ctaSecondary: "상담으로 현장 맞추기",
app/solution/page.tsx:70:        href: "/solution/cctv",
app/solution/page.tsx:71:        image: "/images/solution/generated/kr-security-realphoto.webp",
app/solution/page.tsx:73:        title: "안심 출입",
app/solution/page.tsx:74:        subtitle: "CCTV · 스마트락 · 센서등",
app/solution/page.tsx:75:        problem: "운영자가 항상 머물 수 없는 외곽·야간·예약제 공간의 보안 공백을 줄입니다.",
app/solution/page.tsx:76:        promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
app/solution/page.tsx:77:        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한 방식 정리"],
app/solution/page.tsx:78:        proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
app/solution/page.tsx:82:        href: "/solution/network",
app/solution/page.tsx:83:        image: "/images/solution/generated/kr-network-realphoto.webp",
app/solution/page.tsx:85:        title: "끊김 없는 연결",
app/solution/page.tsx:86:        subtitle: "POS · 예약 · 게스트 Wi-Fi",
app/solution/page.tsx:87:        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 상업 공간의 손실 리스크를 줄입니다.",
app/solution/page.tsx:88:        promise: "운영망, 고객망, 장비망을 구분하고 현장 조건에 맞는 회선과 라우터를 제안합니다.",
app/solution/page.tsx:89:        details: ["POS/업무/게스트망 분리", "라우터와 통신함 위치 계획", "백업 회선 필요성 점검"],
app/solution/page.tsx:90:        proof: "카드 결제와 예약 확인이 끊기지 않아 운영자가 현장에서 덜 불안합니다.",
app/solution/page.tsx:94:        href: "/solution/iot",
app/solution/page.tsx:95:        image: "/images/solution/generated/kr-control-realphoto.webp",
app/solution/page.tsx:97:        title: "원격 준비",
app/solution/page.tsx:98:        subtitle: "조명 · 냉난방 · 환기",
app/solution/page.tsx:99:        problem: "입실 전마다 현장에 가야 하는 숙박·체험·무인 운영의 반복 업무를 줄입니다.",
app/solution/page.tsx:100:        promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
app/solution/page.tsx:101:        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 스케줄", "도어 상태와 운영 알림"],
app/solution/page.tsx:102:        proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
app/solution/page.tsx:106:        href: "/solution/design",
app/solution/page.tsx:107:        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
app/solution/page.tsx:109:        title: "현장 완성",
app/solution/page.tsx:110:        subtitle: "외장 · 간판 · 데크 동선",
app/solution/page.tsx:111:        problem: "모듈러가 현장 상권, 브랜드 톤, 고객 진입 동선과 따로 노는 느낌을 줄입니다.",
app/solution/page.tsx:112:        promise: "외장재, 간판 자리, 데크·조경·배수 마감을 함께 정리해 첫인상을 완성합니다.",
app/solution/page.tsx:113:        details: ["브랜드 톤에 맞는 외장", "간판/조명 자리 사전 계획", "데크·조경·배수 디테일"],
app/solution/page.tsx:114:        proof: "공간이 ‘놓인 건물’이 아니라 바로 영업 가능한 상업 장소처럼 보입니다.",
app/solution/page.tsx:118:      { title: "운영 상황 인터뷰", body: "무인, 예약제, 상시 상주, 야간 운영 여부를 먼저 확인합니다." },
app/solution/page.tsx:119:      { title: "현장 리스크 표시", body: "출입, 통신, 공조, 간판, 배수 위치를 도면과 현장 조건 위에 표시합니다." },
app/solution/page.tsx:120:      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 관리 범위를 먼저 정합니다." },
app/solution/page.tsx:125:    title: "Modular Spaces Ready To Operate",
app/solution/page.tsx:138:    ctaPrimary: "Check order options",
app/solution/page.tsx:139:    ctaSecondary: "Match my site",
app/solution/page.tsx:143:        href: "/solution/cctv",
app/solution/page.tsx:144:        image: "/images/solution/generated/kr-security-realphoto.webp",
app/solution/page.tsx:146:        title: "Secure Access",
app/solution/page.tsx:147:        subtitle: "CCTV · smart lock · sensor light",
app/solution/page.tsx:148:        problem: "Reduce security gaps in remote, night, and reservation-based spaces where staff cannot stay all day.",
app/solution/page.tsx:149:        promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
app/solution/page.tsx:150:        details: ["Entrance blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
app/solution/page.tsx:151:        proof: "Operators know who entered at night and which alerts deserve attention.",
app/solution/page.tsx:155:        href: "/solution/network",
app/solution/page.tsx:156:        image: "/images/solution/generated/kr-network-realphoto.webp",
app/solution/page.tsx:158:        title: "Stable Connection",
app/solution/page.tsx:159:        subtitle: "POS · booking · guest Wi-Fi",
app/solution/page.tsx:160:        problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
app/solution/page.tsx:161:        promise: "We separate operator, guest, and device networks and recommend the right line and router for the site.",
app/solution/page.tsx:162:        details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
app/solution/page.tsx:163:        proof: "Payments and reservations stay reliable, so operators feel less exposed on site.",
app/solution/page.tsx:167:        href: "/solution/iot",
app/solution/page.tsx:168:        image: "/images/solution/generated/kr-control-realphoto.webp",
app/solution/page.tsx:170:        title: "Remote Ready",
app/solution/page.tsx:171:        subtitle: "lighting · HVAC · ventilation",
app/solution/page.tsx:172:        problem: "Reduce repeated site visits for hospitality, experience rooms, and unmanned operations.",
app/solution/page.tsx:173:        promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
app/solution/page.tsx:174:        details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
app/solution/page.tsx:175:        proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
app/solution/page.tsx:179:        href: "/solution/design",
app/solution/page.tsx:180:        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
app/solution/page.tsx:182:        title: "Site Finish",
app/solution/page.tsx:183:        subtitle: "facade · signage · deck flow",
app/solution/page.tsx:184:        problem: "Prevent the module from feeling detached from the brand, local market, and customer flow.",
app/solution/page.tsx:185:        promise: "Facade, signage position, deck, landscape, and drainage details are aligned before completion.",
app/solution/page.tsx:186:        details: ["Brand-fit exterior palette", "Sign and lighting placement", "Deck, planting, and drainage detail"],
app/solution/page.tsx:187:        proof: "The space reads as a business-ready site, not just a placed building.",
app/solution/page.tsx:191:      { title: "Operating interview", body: "We first check unmanned, reservation-only, staffed, and night-operation needs." },
app/solution/page.tsx:192:      { title: "Site risk map", body: "Access, connection, HVAC, signage, and drainage points are marked against the real site." },
app/solution/page.tsx:193:      { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
app/solution/page.tsx:324:          {copy.ctaPrimary}
app/solution/page.tsx:331:          {copy.ctaSecondary}
app/solution/iot/page.tsx:7:  href: "/solution/iot",
app/solution/iot/page.tsx:8:  image: "/images/solution/generated/kr-control-realphoto.webp",
app/solution/iot/page.tsx:12:      title: "현장에 가지 않아도 준비되게",
app/solution/iot/page.tsx:17:      problem:
app/solution/iot/page.tsx:27:      ctaPrimary: "주문 옵션에서 원격 준비 확인",
app/solution/iot/page.tsx:28:      ctaSecondary: "운영 방식 상담",
app/solution/iot/page.tsx:32:      title: "Prepare The Space Without Visiting",
app/solution/iot/page.tsx:37:      problem:
app/solution/iot/page.tsx:47:      ctaPrimary: "Check remote readiness in order options",
app/solution/iot/page.tsx:48:      ctaSecondary: "Discuss operating workflow",
app/solution/network/page.tsx:7:  href: "/solution/network",
app/solution/network/page.tsx:8:  image: "/images/solution/generated/kr-network-realphoto.webp",
app/solution/network/page.tsx:12:      title: "결제와 예약이 끊기지 않게",
app/solution/network/page.tsx:17:      problem:
app/solution/network/page.tsx:27:      ctaPrimary: "주문 옵션에서 연결 확인",
app/solution/network/page.tsx:28:      ctaSecondary: "통신 환경 상담",
app/solution/network/page.tsx:32:      title: "Keep Payment And Booking Online",
app/solution/network/page.tsx:37:      problem:
app/solution/network/page.tsx:47:      ctaPrimary: "Check connection in order options",
app/solution/network/page.tsx:48:      ctaSecondary: "Discuss network conditions",
app/solution/cctv/page.tsx:7:  href: "/solution/cctv",
app/solution/cctv/page.tsx:8:  image: "/images/solution/generated/kr-security-realphoto.webp",
app/solution/cctv/page.tsx:12:      title: "무인 운영도 안심되게",
app/solution/cctv/page.tsx:17:      problem:
app/solution/cctv/page.tsx:27:      ctaPrimary: "주문 옵션에서 보안 확인",
app/solution/cctv/page.tsx:28:      ctaSecondary: "현장 보안 상담",
app/solution/cctv/page.tsx:32:      title: "Make Unmanned Operation Feel Safe",
app/solution/cctv/page.tsx:37:      problem:
app/solution/cctv/page.tsx:47:      ctaPrimary: "Check security in order options",
app/solution/cctv/page.tsx:48:      ctaSecondary: "Discuss site security",
app/solution/design/page.tsx:7:  href: "/solution/design",
app/solution/design/page.tsx:8:  image: "/images/solution/generated/kr-brandfit-realphoto.webp",
app/solution/design/page.tsx:12:      title: "상권과 브랜드에 어긋나지 않게",
app/solution/design/page.tsx:17:      problem:
app/solution/design/page.tsx:27:      ctaPrimary: "주문 옵션에서 현장 완성 확인",
app/solution/design/page.tsx:28:      ctaSecondary: "브랜드 현장 상담",
app/solution/design/page.tsx:32:      title: "Fit The Brand And Local Market",
app/solution/design/page.tsx:37:      problem:
app/solution/design/page.tsx:47:      ctaPrimary: "Check site finish in order options",
app/solution/design/page.tsx:48:      ctaSecondary: "Discuss brand site fit",

```

## Main page excerpt

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Paintbrush,
  Router,
  SlidersHorizontal,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Lang = "KO" | "EN";

type PackageCopy = {
  id: string;
  href: string;
  image: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  problem: string;
  promise: string;
  details: string[];
  proof: string;
};

type PageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  selectLabel: string;
  detailLabel: string;
  proofLabel: string;
  processTitle: string;
  processLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  packages: PackageCopy[];
  process: Array<{ title: string; body: string }>;
};

const COPY: Record<Lang, PageCopy> = {
  KO: {
    eyebrow: "WEET OPERATION OPTIONS",
    title: "운영까지 준비된 모듈러 공간",
    lead:
      "좋은 공간은 예쁜 외관에서 끝나지 않습니다. Weet는 보안, 연결, 원격 준비, 브랜드 마감을 실제 운영자가 매일 겪는 문제 기준으로 설계합니다.",
    heroLabel: "옵션은 장식이 아니라 운영 리스크 관리입니다",
    heroTitle: "상담 때 장비명이 아니라 운영 상황부터 묻습니다.",
    heroBody:
      "무인으로 열어야 하는지, 결제가 끊기면 안 되는지, 입실 전 냉난방이 필요한지, 상권에서 첫인상이 중요한지부터 확인한 뒤 필요한 옵션만 조합합니다.",
    selectLabel: "선택 기준",
    detailLabel: "포함되는 것",
    proofLabel: "운영자가 체감하는 변화",
    processTitle: "옵션을 붙이는 방식도 다릅니다",
    processLead:
      "완공 후 장비를 덧붙이는 방식이 아니라, 출입 동선·배선·조명·마감 위치를 설계 단계에서 함께 잡습니다.",
    ctaPrimary: "주문 옵션 확인",
    ctaSecondary: "상담으로 현장 맞추기",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        title: "안심 출입",
        subtitle: "CCTV · 스마트락 · 센서등",
        problem: "운영자가 항상 머물 수 없는 외곽·야간·예약제 공간의 보안 공백을 줄입니다.",
        promise: "출입 기록, 야간 감지, 현관 조명을 하나의 운영 흐름으로 설계합니다.",
        details: ["현관/창측 사각지대 검토", "CCTV와 센서등 위치 제안", "스마트락 권한 방식 정리"],
        proof: "밤에도 누가 들어왔는지, 어떤 알림을 받아야 하는지 명확해집니다.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        title: "끊김 없는 연결",
        subtitle: "POS · 예약 · 게스트 Wi-Fi",
        problem: "결제, 예약, 원격 제어가 인터넷 품질에 묶이는 상업 공간의 손실 리스크를 줄입니다.",
        promise: "운영망, 고객망, 장비망을 구분하고 현장 조건에 맞는 회선과 라우터를 제안합니다.",
        details: ["POS/업무/게스트망 분리", "라우터와 통신함 위치 계획", "백업 회선 필요성 점검"],
        proof: "카드 결제와 예약 확인이 끊기지 않아 운영자가 현장에서 덜 불안합니다.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        title: "원격 준비",
        subtitle: "조명 · 냉난방 · 환기",
        problem: "입실 전마다 현장에 가야 하는 숙박·체험·무인 운영의 반복 업무를 줄입니다.",
        promise: "조명, 공조, 환기, 도어 상태를 예약과 운영 시간에 맞춰 제어할 수 있게 구성합니다.",
        details: ["스마트 스위치/온도 패널", "입실 전 냉난방 스케줄", "도어 상태와 운영 알림"],
        proof: "고객이 도착하기 전 공간 상태를 미리 준비하고, 불필요한 방문을 줄입니다.",
      },
      {
        id: "brand",
        href: "/solution/design",
        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
        icon: Paintbrush,
        title: "현장 완성",
        subtitle: "외장 · 간판 · 데크 동선",
        problem: "모듈러가 현장 상권, 브랜드 톤, 고객 진입 동선과 따로 노는 느낌을 줄입니다.",
        promise: "외장재, 간판 자리, 데크·조경·배수 마감을 함께 정리해 첫인상을 완성합니다.",
        details: ["브랜드 톤에 맞는 외장", "간판/조명 자리 사전 계획", "데크·조경·배수 디테일"],
        proof: "공간이 ‘놓인 건물’이 아니라 바로 영업 가능한 상업 장소처럼 보입니다.",
      },
    ],
    process: [
      { title: "운영 상황 인터뷰", body: "무인, 예약제, 상시 상주, 야간 운영 여부를 먼저 확인합니다." },
      { title: "현장 리스크 표시", body: "출입, 통신, 공조, 간판, 배수 위치를 도면과 현장 조건 위에 표시합니다." },
      { title: "필요 옵션만 확정", body: "장비 스펙보다 운영자가 실제로 받을 알림과 관리 범위를 먼저 정합니다." },
    ],
  },
  EN: {
    eyebrow: "WEET OPERATION OPTIONS",
    title: "Modular Spaces Ready To Operate",
    lead:
      "A good space does not end with a beautiful shell. Weet plans security, connection, remote readiness, and site finish around the problems operators face every day.",
    heroLabel: "Options are risk control, not decoration",
    heroTitle: "We start with the operating situation, not a device list.",
    heroBody:
      "We check whether the space runs unmanned, whether payments must never fail, whether HVAC is needed before arrival, and whether first impression matters in the local market.",
    selectLabel: "How to choose",
    detailLabel: "What is included",
    proofLabel: "Operational change",
    processTitle: "The option workflow is different",
    processLead:
      "We do not bolt devices on after completion. Access flow, wiring, lighting, and finish details are planned with the space.",
    ctaPrimary: "Check order options",
    ctaSecondary: "Match my site",
    packages: [
      {
        id: "security",
        href: "/solution/cctv",
        image: "/images/solution/generated/kr-security-realphoto.webp",
        icon: LockKeyhole,
        title: "Secure Access",
        subtitle: "CCTV · smart lock · sensor light",
        problem: "Reduce security gaps in remote, night, and reservation-based spaces where staff cannot stay all day.",
        promise: "Access logs, night detection, and entrance lighting are planned as one operating flow.",
        details: ["Entrance blind-spot review", "CCTV and sensor-light placement", "Smart-lock permission planning"],
        proof: "Operators know who entered at night and which alerts deserve attention.",
      },
      {
        id: "network",
        href: "/solution/network",
        image: "/images/solution/generated/kr-network-realphoto.webp",
        icon: Router,
        title: "Stable Connection",
        subtitle: "POS · booking · guest Wi-Fi",
        problem: "Reduce losses when payment, booking, or remote control depends on unstable connectivity.",
        promise: "We separate operator, guest, and device networks and recommend the right line and router for the site.",
        details: ["POS/work/guest network split", "Router and network-box placement", "Backup-line review"],
        proof: "Payments and reservations stay reliable, so operators feel less exposed on site.",
      },
      {
        id: "control",
        href: "/solution/iot",
        image: "/images/solution/generated/kr-control-realphoto.webp",
        icon: SlidersHorizontal,
        title: "Remote Ready",
        subtitle: "lighting · HVAC · ventilation",
        problem: "Reduce repeated site visits for hospitality, experience rooms, and unmanned operations.",
        promise: "Lighting, HVAC, ventilation, and door state can follow booking time and operating hours.",
        details: ["Smart switches and temperature panels", "Pre-arrival HVAC schedule", "Door state and operation alerts"],
        proof: "The space can be prepared before guests arrive, with fewer unnecessary visits.",
      },
      {
        id: "brand",
        href: "/solution/design",
        image: "/images/solution/generated/kr-brandfit-realphoto.webp",
        icon: Paintbrush,
        title: "Site Finish",
        subtitle: "facade · signage · deck flow",
        problem: "Prevent the module from feeling detached from the brand, local market, and customer flow.",
        promise: "Facade, signage position, deck, landscape, and drainage details are aligned before completion.",
        details: ["Brand-fit exterior palette", "Sign and lighting placement", "Deck, planting, and drainage detail"],
        proof: "The space reads as a business-ready site, not just a placed building.",
      },
    ],
    process: [
      { title: "Operating interview", body: "We first check unmanned, reservation-only, staffed, and night-operation needs." },
      { title: "Site risk map", body: "Access, connection, HVAC, signage, and drainage points are marked against the real site." },
      { title: "Option confirmation", body: "We define actual alerts and management scope before chasing device specs." },
    ],
  },
};

export default function SolutionPage() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-neutral-950">
      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-24 md:px-8 lg:pb-16 lg:pt-32">
        <div className="grid gap-10 border-b border-neutral-300 pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,0.7fr)] lg:gap-16 lg:pb-14">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.04] text-neutral-950 md:text-6xl lg:text-[76px] break-keep">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
              {copy.lead}
            </p>
          </div>

          <div className="self-end rounded-md border border-neutral-300 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#A77B00]">{copy.heroLabel}</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-neutral-950 md:text-3xl break-keep">
              {copy.heroTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 break-keep">{copy.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8 lg:pb-24">
        <div className="grid gap-6">
          {copy.packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <article
                key={pkg.id}
                className="grid gap-0 overflow-hidden rounded-md border border-neutral-300 bg-white lg:grid-cols-[minmax(340px,0.78fr)_1fr]"
              >
                <Link href={pkg.href} className="group relative block aspect-[16/10] overflow-hidden bg-neutral-200 lg:aspect-auto">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} ${pkg.subtitle}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-4 top-4 rounded-sm bg-neutral-950/85 px-3 py-2 text-xs font-black text-white backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </Link>

                <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[minmax(220px,0.75fr)_1fr] lg:p-10">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-neutral-300 bg-[#FEBD16] text-neutral-950">
                      <Icon className="h-6 w-6" strokeWidth={1.7} />
                    </div>
                    <h2 className="mt-5 text-3xl font-black leading-tight text-neutral-950 md:text-4xl break-keep">
                      {pkg.title}
                    </h2>
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-neutral-500">{pkg.subtitle}</p>
                    <p className="mt-5 text-base font-semibold leading-relaxed text-neutral-800 break-keep">{pkg.promise}</p>
                    <Link
                      href={pkg.href}

```

## Detail template excerpt

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type Lang = "KO" | "EN";

type LocalizedSolution = {
  eyebrow: string;
  title: string;
  lead: string;
  imageAlt: string;
  problemTitle: string;
  problem: string;
  fitTitle: string;
  fit: string[];
  includedTitle: string;
  included: string[];
  decisionsTitle: string;
  decisions: string[];
  outcomesTitle: string;
  outcomes: string[];
  ctaPrimary: string;
  ctaSecondary: string;
};

export type SolutionPackageData = {
  id: "security" | "network" | "control" | "brand";
  href: string;
  image: string;
  copy: Record<Lang, LocalizedSolution>;
};

const PACKAGE_NAV: Record<
  Lang,
  Array<{ id: SolutionPackageData["id"]; href: string; name: string; desc: string }>
> = {
  KO: [
    { id: "security", href: "/solution/cctv", name: "안심 출입", desc: "CCTV · 도어락 · 센서등" },
    { id: "network", href: "/solution/network", name: "끊김 없는 연결", desc: "POS · 예약 · 게스트 Wi-Fi" },
    { id: "control", href: "/solution/iot", name: "원격 준비", desc: "조명 · 냉난방 · 환기" },
    { id: "brand", href: "/solution/design", name: "현장 완성", desc: "외장 · 간판 · 동선" },
  ],
  EN: [
    { id: "security", href: "/solution/cctv", name: "Secure Access", desc: "CCTV · lock · sensor light" },
    { id: "network", href: "/solution/network", name: "Stable Connection", desc: "POS · booking · guest Wi-Fi" },
    { id: "control", href: "/solution/iot", name: "Remote Ready", desc: "lighting · HVAC · ventilation" },
    { id: "brand", href: "/solution/design", name: "Site Finish", desc: "facade · signage · flow" },
  ],
};

export default function SolutionTemplate({ data }: { data: SolutionPackageData }) {
  const { language } = useLanguage();
  const copy = data.copy[language];
  const nav = PACKAGE_NAV[language];

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#151515]">
      <section className="mx-auto max-w-[1440px] px-4 pb-14 pt-24 md:px-8 lg:pb-20 lg:pt-32">
        <Link
          href="/solution"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === "KO" ? "운영 옵션 전체" : "All operation options"}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neutral-500">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-neutral-950 md:text-6xl lg:text-[72px]">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl break-keep">
              {copy.lead}
            </p>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-neutral-200 shadow-[0_24px_70px_rgba(20,20,20,0.16)]">
            <Image
              src={data.image}
              alt={copy.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-4 py-3 md:px-8">
          {nav.map((item) => {
            const isActive = item.id === data.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "min-w-[220px] rounded-md border px-4 py-3 transition-colors",
                  isActive
                    ? "border-neutral-950 bg-neutral-950 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-950 hover:text-neutral-950",
                )}
              >
                <span className="block text-sm font-black">{item.name}</span>
                <span className={cn("mt-1 block text-xs", isActive ? "text-neutral-300" : "text-neutral-500")}>
                  {item.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 md:px-8 lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="border-l-2 border-neutral-950 pl-5">
            <p className="text-sm font-black text-neutral-950">{copy.problemTitle}</p>
            <p className="mt-3 text-base leading-relaxed text-neutral-600 break-keep">{copy.problem}</p>
          </div>
        </aside>

        <div className="grid gap-10">
          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.fitTitle}</h2>
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {copy.fit.map((item) => (
                <li key={item} className="flex gap-3 text-base font-semibold leading-relaxed text-neutral-800 break-keep">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#C69200]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.includedTitle}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {copy.included.map((item) => (
                <div key={item} className="rounded-md border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-neutral-800 break-keep">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 border-b border-neutral-200 pb-10 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.decisionsTitle}</h2>
            </div>
            <ol className="grid gap-3">
              {copy.decisions.map((item, index) => (
                <li key={item} className="grid grid-cols-[40px_1fr] items-start gap-3 border-b border-neutral-100 pb-3 last:border-b-0">
                  <span className="text-sm font-black text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base font-semibold leading-relaxed text-neutral-800 break-keep">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-5 md:grid-cols-[220px_1fr]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#C69200]" />
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{copy.outcomesTitle}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {copy.outcomes.map((item) => (
                <p key={item} className="rounded-md bg-neutral-950 px-5 py-5 text-sm font-semibold leading-relaxed text-white break-keep">
                  {item}
                </p>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Link
              href="/customize"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#FEBD16] px-6 text-sm font-black text-neutral-950 transition-colors hover:bg-[#E2A80F]"
            >
              {copy.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/support"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-neutral-300 px-6 text-sm font-black text-neutral-800 transition-colors hover:border-neutral-950 hover:text-neutral-950"
            >
              {copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

```

## Validation

```text
npx tsc --noEmit: passed
npm run lint: passed
npm test: passed, 3 files and 20 tests
npm run build: passed; existing warning: Next middleware convention is deprecated in favor of proxy
npx playwright test e2e/public-pages.spec.ts --project=chromium: passed, 14 tests
git diff --check: passed
```

## Visual QA summary

Local Playwright/visual QA ran desktop 1440x1100, tablet 834x1112, mobile 390x844 for `/solution`, `/solution/cctv`, `/solution/network`, `/solution/iot`, `/solution/design`. Manual screenshot review found no text overlap or clipped CTAs. Full summary:

```json
[
  {
    "route": "/solution",
    "viewport": "desktop",
    "title": "운영 솔루션 | 위트(weet)",
    "h1": "운영까지 준비된 모듈러 공간",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 4,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/cctv",
    "viewport": "desktop",
    "title": "안심 출입 옵션",
    "h1": "무인 운영도 안심되게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/network",
    "viewport": "desktop",
    "title": "끊김 없는 연결 옵션",
    "h1": "결제와 예약이 끊기지 않게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/iot",
    "viewport": "desktop",
    "title": "원격 준비 옵션",
    "h1": "현장에 가지 않아도 준비되게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/design",
    "viewport": "desktop",
    "title": "현장 완성 옵션",
    "h1": "상권과 브랜드에 어긋나지 않게",
    "overflowX": false,
    "scrollWidth": 1440,
    "clientWidth": 1440,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution",
    "viewport": "tablet",
    "title": "운영 솔루션 | 위트(weet)",
    "h1": "운영까지 준비된 모듈러 공간",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [
      {
        "src": "http://localhost:3000/_next/image?url=%2Fimages%2Fcompany%2Fweet-logo.webp&w=3840&q=75",
        "alt": "위트(weet) 로고",
        "complete": false,
        "w": 0,
        "h": 0,
        "visible": true
      }
    ],
    "generatedCount": 4,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/cctv",
    "viewport": "tablet",
    "title": "안심 출입 옵션",
    "h1": "무인 운영도 안심되게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/network",
    "viewport": "tablet",
    "title": "끊김 없는 연결 옵션",
    "h1": "결제와 예약이 끊기지 않게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/iot",
    "viewport": "tablet",
    "title": "원격 준비 옵션",
    "h1": "현장에 가지 않아도 준비되게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/design",
    "viewport": "tablet",
    "title": "현장 완성 옵션",
    "h1": "상권과 브랜드에 어긋나지 않게",
    "overflowX": false,
    "scrollWidth": 834,
    "clientWidth": 834,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution",
    "viewport": "mobile",
    "title": "운영 솔루션 | 위트(weet)",
    "h1": "운영까지 준비된 모듈러 공간",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [
      {
        "src": "http://localhost:3000/_next/image?url=%2Fimages%2Fcompany%2Fweet-logo.webp&w=3840&q=75",
        "alt": "위트(weet) 로고",
        "complete": false,
        "w": 0,
        "h": 0,
        "visible": true
      }
    ],
    "generatedCount": 4,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/cctv",
    "viewport": "mobile",
    "title": "안심 출입 옵션",
    "h1": "무인 운영도 안심되게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/network",
    "viewport": "mobile",
    "title": "끊김 없는 연결 옵션",
    "h1": "결제와 예약이 끊기지 않게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/iot",
    "viewport": "mobile",
    "title": "원격 준비 옵션",
    "h1": "현장에 가지 않아도 준비되게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  },
  {
    "route": "/solution/design",
    "viewport": "mobile",
    "title": "현장 완성 옵션",
    "h1": "상권과 브랜드에 어긋나지 않게",
    "overflowX": false,
    "scrollWidth": 390,
    "clientWidth": 390,
    "consoleErrors": [],
    "pageErrors": [],
    "badImgs": [],
    "generatedCount": 1,
    "oldRefs": [],
    "literalEscapes": false
  }
]
```

Known QA note: script intermittently reports the existing header logo with naturalWidth 0 on tablet/mobile `/solution`, but screenshots show the logo visible; likely measurement/timing artifact.

## Review questions

Review strictly for concrete pre-deploy defects only.

1. Any MUST_FIX issues that would harm Korean buyer trust, mobile readability, accessibility, responsiveness, or runtime/build reliability?
2. Do any image placements violate the user's latest instruction that option images must emphasize the option instead of the house/building?
3. Is the operations-first framing concrete enough, or is there a specific copy/IA problem to fix before deploy?
4. Any code-level issue visible in the excerpts: broken links, metadata mismatch, missing test assertion, Tailwind/Next issue, poor accessible naming?

Return exactly:

```text
MARKER: WEET_REVIEW_20260609_SOLUTION_RENEWAL_06
VERDICT: PASS | MUST_FIX

MUST_FIX:
- ...

OPTIONAL:
- ...

RATIONALE:
- ...
```
