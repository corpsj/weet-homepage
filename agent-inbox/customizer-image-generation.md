# Customizer Image Generation And Asset Decisions

## Image Asset 1: right-wall anchored compact floorplan SVG

- 사용 위치: `/customize` left floorplan stage and consultation modal floorplan preview.
- 기존 문제: Compact 3x6 base SVG가 right edge를 Standard 3x9와 공유하지 않아 3x6→3x9 전환이 좌향 확장보다 이미지 교체처럼 보일 수 있었다.
- 생성 목적: 새 AI 이미지를 만들지 않고 기존 floorplan source SVG를 제품 이해에 맞게 정렬한다.
- 프롬프트: 사용하지 않음. 기존 SVG geometry를 직접 수정함.
- 생성 결과 파일: `public/images/customize/compact-3x6-base.svg`
- 적용 여부: 적용함.
- 적용 파일: `public/images/customize/compact-3x6-base.svg`, `components/customize/CustomizeConfigurator.tsx`
- 미적용 시 사유: 해당 없음.
- 검증 결과: E2E에서 compact footprint `x=400 width=600`, standard footprint `x=100 width=900`, rail `6m/9m`, base image 1개, fallback footprint 0개를 확인함.

## Image Asset 2: generated lifestyle/customizer reference image

- 사용 위치: 미정.
- 기존 문제: 현재 customizer의 주요 이해 과제는 lifestyle 분위기보다 floorplan, 포함/유상/상담 구분, 상담 정보 목적 설명이다.
- 생성 목적: 고객 이해를 실제로 높이는 visual asset이 필요한지 판단한다.
- 프롬프트: 생성하지 않음.
- 생성 결과 파일: 없음.
- 적용 여부: 미적용.
- 적용 파일: 없음.
- 미적용 시 사유: 현재 slice는 existing floorplan SVG가 실제 제품 이해에 더 직접적이며, user instruction상 프로젝트 UI/reference image generation은 Chrome/ChatGPT web control로 해야 한다. 첫 Pro review와 visual QA에서는 새 raster image가 필수로 보이지 않았다.
- 검증 결과: `.codex/qa/customizer-implementation-20260607-profix/` screenshots에서 floorplan-first structure가 충분히 설명력을 갖는지 확인함.

## Image Asset 3: future optional product-context visual

- 사용 위치: `상담 신청` step 또는 future model recommendation accordion.
- 기존 문제: 제품 설치 환경, 운반/크레인 조건, 실내 사용감을 텍스트만으로 설명하면 초보 고객이 상상하기 어려울 수 있다.
- 생성 목적: 필요 시 실제 이동식주택 설치/진입/생활 장면을 보조하는 bitmap reference를 만든다.
- 프롬프트: 생성 전 GPT-5.5 Pro image plan/review 필요.
- 생성 결과 파일: 없음.
- 적용 여부: 미적용.
- 적용 파일: 없음.
- 미적용 시 사유: 현재 completion 조건에서 핵심 MUST_FIX는 구조/도면/옵션/모달 copy였고, 새 이미지가 없을 때도 tests와 visual QA가 통과했다.
- 검증 결과: 후속 생성 시 PC/tablet/mobile screenshot, image clarity, no text overlap, no decorative-only usage를 확인해야 함.
