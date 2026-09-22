# Weet AEO / GEO 운영 기록

적용 기준: 2026-09-22. 공개 디자인은 3ae1ec0 기준으로 복원하며, 현재 커스터마이징과 보안·공개 조건은 유지한다.

## 구현

- /products/[model]: 공개 중인 맞춤 구성 모델과 같은 카탈로그에서 규격·기본가·기본 사양을 읽는 서버 렌더링 페이지. 현재 compact-3x6, standard-3x9. 비활성·없는 모델은 404. 300초 재검증.
- /guides/mobile-home-cost: 제품/옵션/운반/현장 비용과 견적 준비 항목. 세금 포함 여부나 법적 설치 가능 여부를 추정하지 않는다.
- 모델별 canonical, Product(사양)와 BreadcrumbList. 주문 제작 상담 상품을 InStock으로 표시하던 구성 페이지 마크업을 CollectionPage + ListItem으로 변경. Offer·별점·사용자 리뷰를 만들어 넣지 않는다. Product rich result 자격 확보를 주장하지 않는다.
- Organization/LocalBusiness 연락처와 sameAs는 공개 사이트 설정과 연동. 공식 Naver 블로그 포함.
- sitemap에 활성 모델과 비용 안내 URL 포함. 배포할 때마다 모든 페이지 lastmod를 오늘로 바꾸지 않는다. 확인 가능한 콘텐츠 날짜가 없으면 생략한다.
- 주요 답변은 초기 HTML에 포함. FAQ의 질문과 schema는 동일한 데이터 사용. 기존 공개 FAQ의 확인되지 않은 수치·A/S 앱·보증 기간 주장은 lib/public-answers.ts의 조건을 포함한 설명으로 정리. 같은 질문의 편집 문구는 이 파일에서 관리하고, 추가 FAQ는 기존 관리자 데이터와 병합한다.
- robots의 기존 공개 크롤링 허용 정책 유지. 검색 봇 허용과 학습 허용은 다른 개념. 별도 llms.txt나 숨겨진 AI용 설명을 만들지 않는다.

## 2026-09-22 계정 확인

- Search Console의 we-et.com 도메인 소유권이 인증된 상태를 확인했다.
- 기존 non-www 사이트맵의 마지막 읽기 표시는 2026-01-05였다. 현재 정규 주소인 https://www.we-et.com/sitemap.xml을 제출했고, 2026-09-22에 사이트맵 처리 완료와 공개 중인 URL 15개 발견을 확인했다. 이는 기존 운영 배포의 URL이며, 새 모델·가이드 페이지의 색인 완료를 뜻하지 않는다.
- Google 검색 생성형 AI 설정은 ‘내 사이트의 링크 및 콘텐츠 포함 (기본)’이 선택되어 있었다. 설정을 변경할 필요가 없었다.
- 새 URL의 색인·인용 성과, Bing 및 실제 AI 봇 접근은 아직 확인하지 않았다.

## 운영자가 확인할 계정 항목

Search Console의 도메인 소유권, sitemap 등록/처리와 새 URL 색인 여부, Search 생성형 AI 포함 설정을 실제 계정에서 확인한다. 코드 배포만으로 설정 또는 색인 완료를 주장하지 않는다. Bing Webmaster Tools의 AI Performance는 지원되는 검색 경험의 인용 관찰용이며 전체 ChatGPT 노출을 뜻하지 않는다.

GA4 기본 소스/매체와 referrer에서 chatgpt.com, chat.openai.com, perplexity.ai, copilot.microsoft.com, gemini.google.com, claude.ai 유입을 별도로 분류해 본다. 모든 AI 클릭이 referrer를 전달하지 않으며 Direct 유입을 전부 AI로 취급하지 않는다. Google AI 화면 유입과 일반 Google 검색은 referrer만으로 분리할 수 없다. 기존 consult_click, 상담 접수와 실제 유효 상담/계약을 별도 지표로 본다.

## 반복 확인 질문

같은 지역·언어·검색 활성 여부를 기록하고 다음 질문에서 브랜드 언급, 자사 URL 인용, 제품 가격·조건의 정확성을 구분한다. 결과 1회로 순위를 단정하지 않는다.

1. 이동식주택 3x6 18㎡ 가격을 알려줘.
2. 3x9 27㎡ 이동식주택 기본 가격은 얼마야?
3. 위트 Compact 3x6와 Standard 3x9 차이는?
4. 이동식주택 가격에 운반과 크레인이 포함돼?
5. 이동식주택 견적 받을 때 뭘 준비해야 해?
6. 전기 수도 없는 땅에 이동식주택을 놓으려면?
7. 이동식주택 옵션을 직접 고르고 견적 볼 수 있는 업체는?
8. 전남 함평에서 이동식주택 만드는 회사 알려줘.
9. 위트 이동식주택 상담은 어디서 신청해?
10. 3x9 크기면 농촌체류형 쉼터 설치가 자동으로 가능한가?

인용 성과는 아직 측정되지 않았다. 신규 페이지의 실제 검색 수집·색인·AI 인용은 배포 검증과 별개다. 실제 고객 사례는 사진·지역·사양·비용 공개 승인을 확보한 경우에만 추가한다.

## 공식 근거

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide (2026-09-22 확인): 기본 SEO, 유용한 고유 콘텐츠, 크롤링/색인과 생성형 AI 포함 설정. 특별 AI 파일과 llms.txt는 Google 노출을 개선하지 않음.
- https://developers.openai.com/api/docs/bots (2026-09-22 확인): OAI-SearchBot(검색)과 GPTBot(학습)의 목적 분리.
- https://support.google.com/webmasters/answer/16984139 (2026-09-22 확인): 생성형 AI 검색 실적 보고서의 범위와 노출 조건.
- https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
