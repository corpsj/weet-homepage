import fs from "node:fs";

const slice = JSON.parse(fs.readFileSync("/Users/zoopark-studio/Documents/dev/weet-homepage/.understand-anything/tmp/batch-slice-3.json", "utf8"));
const bid = slice.batchImportData;

const nodes = [];
const edges = [];
const nodeIds = new Set();

function addNode(n) {
  if (nodeIds.has(n.id)) return;
  nodeIds.add(n.id);
  nodes.push(n);
}
function addEdge(e) {
  if (e.source === e.target) return;
  edges.push(e);
}

// ---- FILE NODES ----
const fileNodes = {
  "app/actions/analytics-actions.ts": {
    name: "analytics-actions.ts",
    summary: "GA4 분석 데이터를 관리자에게 노출하는 Server Action 모음. requireAdmin 인증 후 트래픽·인구통계·유입경로·인기페이지를 모듈 레벨 캐시로 감싸 반환하며, fetchAnalyticsDashboard는 Promise.race 타임아웃으로 전체 대시보드 데이터를 한 번에 로드한다.",
    tags: ["server-action", "analytics", "api-handler", "caching"],
    complexity: "moderate",
    languageNotes: "Promise.allSettled로 부분 실패를 허용하고 Promise.race로 타임아웃을 거는 방어적 패턴."
  },
  "app/actions/cms-actions.ts": {
    name: "cms-actions.ts",
    summary: "홈 메인 CMS(히어로 슬라이드, 시그니처 제품)를 관리하는 Server Action 모음. 히어로 슬라이드 CRUD·정렬·활성화와 제품 시그니처 토글을 Supabase admin 클라이언트로 처리하고, 변경 시 revalidatePath로 캐시를 무효화한다.",
    tags: ["server-action", "cms", "api-handler", "validation"],
    complexity: "complex",
    languageNotes: "URL 정규화·마지막 활성 슬라이드 비활성 방지 등 입력 검증 로직 다수."
  },
  "app/actions/storage-actions.ts": {
    name: "storage-actions.ts",
    summary: "이미지 업로드를 처리하는 Server Action. 버킷·MIME·경로 prefix 화이트리스트와 매직바이트 검증으로 안전한 파일만 받아 Supabase Storage에 업로드하고 public URL을 반환한다.",
    tags: ["server-action", "storage", "security", "validation"],
    complexity: "moderate",
    languageNotes: "매직바이트(시그니처) 검사로 확장자 위조 업로드를 차단하는 보안 패턴."
  },
  "app/admin/DashboardContainer.tsx": {
    name: "DashboardContainer.tsx",
    summary: "관리자 인사이트 대시보드의 데이터 로딩 컨테이너. analytics-actions의 fetch 함수들을 Promise.all로 병렬 호출해 AnalyticsDashboard에 props로 전달한다.",
    tags: ["component", "container", "analytics", "data-fetching"],
    complexity: "simple"
  },
  "app/admin/gallery/[id]/page.tsx": {
    name: "page.tsx",
    summary: "갤러리 항목 수정 페이지(동적 라우트). gallery-actions로 항목을 조회해 없으면 notFound, 있으면 GalleryForm에 초기값을 전달한다.",
    tags: ["page", "admin", "gallery", "dynamic-route"],
    complexity: "simple"
  },
  "app/admin/gallery/new/page.tsx": {
    name: "page.tsx",
    summary: "갤러리 신규 등록 페이지. ConsolePrimitives 헤더와 빈 GalleryForm을 렌더링한다.",
    tags: ["page", "admin", "gallery"],
    complexity: "simple"
  },
  "app/admin/insights/page.tsx": {
    name: "page.tsx",
    summary: "관리자 분석 인사이트 페이지. fetchAnalyticsDashboard로 GA4 데이터를 받아 AnalyticsDashboard에 전달하며, 데이터 미연동 시 안내 상태를 표시한다.",
    tags: ["page", "admin", "analytics"],
    complexity: "moderate"
  },
  "app/admin/main/page.tsx": {
    name: "page.tsx",
    summary: "홈 메인 CMS 페이지. getHeroSlides·getSignatureProducts로 초기 데이터를 받아 MainCmsClient에 전달한다.",
    tags: ["page", "admin", "cms"],
    complexity: "simple"
  },
  "app/admin/page.tsx": {
    name: "page.tsx",
    summary: "관리자 메인 대시보드 페이지. Supabase에서 활성 제품·신규 상담·프로젝트·옵션 카운트를 집계해 메트릭 카드·준비도 링·빠른 작업 링크로 콘솔 홈을 구성한다.",
    tags: ["page", "admin", "dashboard", "entry-point"],
    complexity: "complex"
  },
  "app/admin/products/[id]/page.tsx": {
    name: "page.tsx",
    summary: "제품 수정 페이지(동적 라우트). requireAdmin 후 Supabase admin으로 제품을 조회해 ProductForm에 초기값을 전달한다.",
    tags: ["page", "admin", "product", "dynamic-route"],
    complexity: "simple"
  },
  "app/admin/products/new/page.tsx": {
    name: "page.tsx",
    summary: "제품 신규 등록 페이지. ConsolePrimitives 헤더와 빈 ProductForm을 렌더링한다.",
    tags: ["page", "admin", "product"],
    complexity: "simple"
  },
  "app/admin/projects/[id]/page.tsx": {
    name: "page.tsx",
    summary: "프로젝트 수정 페이지(클라이언트 컴포넌트). useParams로 id를 읽어 project-actions의 getProject로 데이터를 로드하고 ProjectForm을 렌더링한다.",
    tags: ["page", "admin", "project", "dynamic-route"],
    complexity: "moderate"
  },
  "app/admin/projects/new/page.tsx": {
    name: "page.tsx",
    summary: "프로젝트 신규 등록 페이지. ConsolePrimitives 헤더와 빈 ProjectForm을 렌더링한다.",
    tags: ["page", "admin", "project"],
    complexity: "simple"
  },
  "app/admin/utm/page.tsx": {
    name: "page.tsx",
    summary: "UTM 캠페인 링크 빌더 페이지. ConsolePrimitives 헤더와 UtmBuilder 컴포넌트를 렌더링한다.",
    tags: ["page", "admin", "utm", "marketing"],
    complexity: "simple"
  },
  "components/admin/AdminCommandSearch.tsx": {
    name: "AdminCommandSearch.tsx",
    summary: "관리자 콘솔 상단의 커맨드 팔레트 검색 컴포넌트. 등록된 명령 목록을 키워드로 필터링하고 키보드(↑↓/Enter/Esc) 네비게이션으로 해당 관리 페이지로 이동시킨다.",
    tags: ["component", "admin", "command-palette", "search"],
    complexity: "moderate"
  },
  "components/admin/ConsolePrimitives.tsx": {
    name: "ConsolePrimitives.tsx",
    summary: "관리자 콘솔 공용 UI 프리미티브 모음. 입력·버튼 클래스 상수와 페이지 헤더·메트릭 카드·패널·상태 핀·준비도 링 등 재사용 컴포넌트를 제공한다.",
    tags: ["component", "admin", "ui-kit", "design-system"],
    complexity: "moderate"
  },
  "components/admin/ProductForm.tsx": {
    name: "ProductForm.tsx",
    summary: "제품 생성·수정 폼 컴포넌트. 메인·평면도·서브 이미지 업로드와 필드 입력을 관리하고 product-actions로 저장하며, 미저장 변경 경고와 toast 피드백을 제공한다.",
    tags: ["component", "admin", "form", "product"],
    complexity: "complex"
  },
  "components/admin/cms/MainCmsClient.tsx": {
    name: "MainCmsClient.tsx",
    summary: "홈 메인 CMS의 클라이언트 컨트롤러. 히어로 슬라이드 섹션(@dnd-kit 정렬·CRUD·활성 토글)과 시그니처 라인 섹션(낙관적 토글)을 탭으로 묶어 cms-actions와 연동한다.",
    tags: ["component", "admin", "cms", "drag-and-drop"],
    complexity: "complex",
    languageNotes: "useTransition + 낙관적 업데이트, 실패 시 router.refresh로 롤백하는 패턴."
  },
  "components/admin/gallery/GalleryForm.tsx": {
    name: "GalleryForm.tsx",
    summary: "갤러리(SNS) 항목 생성·수정 폼. react-hook-form+zod 검증, 다중 이미지 압축·업로드와 @dnd-kit 순서 변경을 지원하며 gallery-actions로 저장한다.",
    tags: ["component", "admin", "form", "gallery"],
    complexity: "complex"
  },
  "components/admin/insights/AnalyticsDashboard.tsx": {
    name: "AnalyticsDashboard.tsx",
    summary: "GA4 분석 데이터를 시각화하는 대시보드 컴포넌트. recharts 기반 트래픽 추이·기기/유입 분포·인기 페이지 차트와 요약 카드를 ResizeObserver로 반응형 렌더링한다.",
    tags: ["component", "admin", "analytics", "data-visualization"],
    complexity: "complex"
  },
  "components/admin/media/ImageUpload.tsx": {
    name: "ImageUpload.tsx",
    summary: "단일 이미지 업로드 위젯. 이미지 압축 후 storage-actions의 uploadImageAction으로 업로드하고 미리보기·해상도 안내·실패 처리를 제공한다.",
    tags: ["component", "admin", "media", "upload"],
    complexity: "moderate"
  },
  "components/admin/media/MultiImageUpload.tsx": {
    name: "MultiImageUpload.tsx",
    summary: "다중 이미지 일괄 업로드 위젯. 여러 파일을 압축·병렬 업로드하고 성공 URL 목록을 onUpload 콜백으로 전달한다.",
    tags: ["component", "admin", "media", "upload"],
    complexity: "moderate"
  },
  "components/admin/projects/ProjectForm.tsx": {
    name: "ProjectForm.tsx",
    summary: "프로젝트(준공 사례) 생성·수정 폼. react-hook-form+zod 검증, 다중 이미지 업로드/압축/정렬과 태그·메타 입력을 관리하고 project-actions로 저장한다.",
    tags: ["component", "admin", "form", "project"],
    complexity: "complex"
  },
  "components/admin/utm/UtmBuilder.tsx": {
    name: "UtmBuilder.tsx",
    summary: "UTM 캠페인 URL 빌더 컴포넌트. 프리셋·소스/매체/캠페인 입력으로 추적 URL을 실시간 생성하고, classifyAcquisition으로 유입 채널을 미리보기하며 복사/열기를 지원한다.",
    tags: ["component", "admin", "utm", "marketing"],
    complexity: "complex"
  },
  "hooks/useUnsavedChangesWarning.ts": {
    name: "useUnsavedChangesWarning.ts",
    summary: "미저장 변경이 있을 때 brower beforeunload 경고를 띄우는 커스텀 hook. isDirty가 true인 동안 이탈 확인 다이얼로그를 활성화한다.",
    tags: ["hook", "utility", "form", "navigation-guard"],
    complexity: "simple"
  },
  "lib/analytics.ts": {
    name: "analytics.ts",
    summary: "Google Analytics Data API(GA4) 래퍼. 트래픽·인구통계·도시·유입경로·인기페이지 리포트를 runReport로 조회하며, withGaTimeout으로 각 호출에 타임아웃을 건다.",
    tags: ["utility", "analytics", "api-client", "google-analytics"],
    complexity: "moderate"
  },
  "lib/analytics/acquisition.ts": {
    name: "acquisition.ts",
    summary: "유입 채널 분류 유틸리티. URL에서 UTM·클릭ID를 파싱·정규화하고, 검색/소셜 호스트 및 유료 신호를 기준으로 트래픽을 채널/소스/매체로 분류한다.",
    tags: ["utility", "analytics", "acquisition", "classification"],
    complexity: "complex",
    languageNotes: "검색/소셜 호스트 집합과 유료 광고 클릭ID로 규칙 기반 분류를 수행하는 순수 함수."
  },
  "lib/utm/builder.ts": {
    name: "builder.ts",
    summary: "UTM 파라미터를 URL에 부착하는 빌더 유틸리티. base URL·경로·UTM 값을 받아 searchParams로 조합한 완성 URL 문자열을 반환한다.",
    tags: ["utility", "utm", "url-builder", "marketing"],
    complexity: "simple"
  }
};

// node type mapping (all code -> file)
for (const f of slice.files) {
  const meta = fileNodes[f.path];
  addNode({
    id: `file:${f.path}`,
    type: "file",
    name: meta.name,
    filePath: f.path,
    summary: meta.summary,
    tags: meta.tags,
    complexity: meta.complexity,
    ...(meta.languageNotes ? { languageNotes: meta.languageNotes } : {})
  });
}

// ---- FUNCTION NODES (significance: >=10 lines OR exported; skip trivial) ----
// fn: [path, name, [start,end], summary, tags, complexity, exported?]
const fns = [
  // analytics-actions.ts
  ["app/actions/analytics-actions.ts","fetchAnalyticsDashboard",[96,131],"관리자 인증 후 5개 GA4 리포트를 병렬 로드해 단일 대시보드 객체로 반환하는 Server Action. Promise.race 타임아웃으로 응답 지연을 방어한다.",["server-action","analytics","aggregation"],"moderate",true],
  // cms-actions.ts
  ["app/actions/cms-actions.ts","normalizeHeroUrl",[20,42],"히어로 슬라이드 URL 입력을 trim·상대경로 허용 여부에 따라 정규화·검증하는 헬퍼.",["validation","url","helper"],"simple",false],
  ["app/actions/cms-actions.ts","assertCanDeactivateHeroSlide",[60,79],"마지막 활성 히어로 슬라이드 비활성화를 차단하는 가드. 활성 슬라이드 수를 세어 0이 되는 변경을 막는다.",["validation","guard","cms"],"simple",false],
  ["app/actions/cms-actions.ts","getHeroSlides",[83,98],"관리자용 히어로 슬라이드 전체를 정렬 순서대로 조회하는 Server Action.",["server-action","cms","query"],"simple",true],
  ["app/actions/cms-actions.ts","createHeroSlide",[100,141],"히어로 슬라이드를 정규화·검증 후 마지막 sort_order 다음 위치로 삽입하는 Server Action.",["server-action","cms","create"],"moderate",true],
  ["app/actions/cms-actions.ts","updateHeroSlide",[143,172],"히어로 슬라이드를 정규화·비활성 가드 검사 후 업데이트하고 캐시를 무효화하는 Server Action.",["server-action","cms","update"],"moderate",true],
  ["app/actions/cms-actions.ts","deleteHeroSlide",[174,191],"히어로 슬라이드를 삭제하고 관련 경로를 revalidate하는 Server Action.",["server-action","cms","delete"],"simple",true],
  ["app/actions/cms-actions.ts","setHeroSlideActive",[193,219],"히어로 슬라이드 활성 상태를 토글하는 Server Action. 비활성화 시 마지막 활성 가드를 적용한다.",["server-action","cms","update"],"moderate",true],
  ["app/actions/cms-actions.ts","reorderHeroSlides",[221,249],"전달받은 id 순서대로 히어로 슬라이드 sort_order를 일괄 갱신하는 Server Action.",["server-action","cms","reorder"],"moderate",true],
  ["app/actions/cms-actions.ts","getSignatureProducts",[253,269],"시그니처 라인 후보 제품 전체를 표시 순서대로 조회하는 Server Action.",["server-action","cms","query"],"simple",true],
  ["app/actions/cms-actions.ts","updateSignatureStatus",[271,313],"제품의 시그니처 지정 여부를 토글하는 Server Action. 활성 제품 수 제한 등을 검증한다.",["server-action","cms","update","validation"],"moderate",true],
  // storage-actions.ts
  ["app/actions/storage-actions.ts","hasValidImageMagicBytes",[31,53],"버퍼의 매직바이트를 검사해 선언된 MIME과 실제 이미지 포맷이 일치하는지 확인하는 보안 헬퍼.",["security","validation","helper"],"simple",false],
  ["app/actions/storage-actions.ts","uploadImageAction",[55,156],"버킷·MIME·경로 화이트리스트와 매직바이트 검증을 거쳐 이미지를 Supabase Storage에 업로드하고 public URL을 반환하는 Server Action.",["server-action","storage","security","upload"],"complex",true],
  // DashboardContainer
  ["app/admin/DashboardContainer.tsx","DashboardContainer",[10,28],"analytics fetch 함수들을 Promise.all로 병렬 호출해 AnalyticsDashboard에 데이터를 주입하는 컨테이너 컴포넌트.",["component","container","data-fetching"],"simple",true],
  // gallery [id]
  ["app/admin/gallery/[id]/page.tsx","EditGalleryPage",[8,31],"갤러리 항목을 id로 조회해 없으면 notFound, 있으면 GalleryForm을 렌더링하는 수정 페이지.",["page","gallery","admin"],"simple",true],
  // gallery new
  ["app/admin/gallery/new/page.tsx","NewGalleryPage",[6,18],"빈 GalleryForm을 렌더링하는 갤러리 신규 등록 페이지.",["page","gallery","admin"],"simple",true],
  // insights page
  ["app/admin/insights/page.tsx","InsightsPage",[8,74],"GA4 대시보드 데이터를 조회해 AnalyticsDashboard에 전달하고 미연동 상태를 처리하는 인사이트 페이지.",["page","analytics","admin"],"moderate",true],
  // main page
  ["app/admin/main/page.tsx","CMSMainPage",[6,16],"히어로 슬라이드·시그니처 제품 초기 데이터를 받아 MainCmsClient에 전달하는 홈 CMS 페이지.",["page","cms","admin"],"simple",true],
  // admin page
  ["app/admin/page.tsx","getCount",[33,47],"Supabase 테이블의 행 수를 필터 적용해 집계하는 헬퍼.",["helper","query","aggregation"],"simple",false],
  ["app/admin/page.tsx","AdminPage",[61,298],"활성 제품·신규 상담·프로젝트·옵션 카운트를 집계해 메트릭 카드·준비도 링·빠른 작업으로 관리자 홈을 렌더링하는 페이지.",["page","dashboard","admin","entry-point"],"complex",true],
  // products [id]
  ["app/admin/products/[id]/page.tsx","EditProductPage",[14,39],"requireAdmin 후 제품을 조회해 ProductForm에 초기값을 전달하는 수정 페이지.",["page","product","admin"],"simple",true],
  // products new
  ["app/admin/products/new/page.tsx","NewProductPage",[4,15],"빈 ProductForm을 렌더링하는 제품 신규 등록 페이지.",["page","product","admin"],"simple",true],
  // projects [id]
  ["app/admin/projects/[id]/page.tsx","EditProjectPage",[11,66],"useParams로 id를 읽어 getProject로 프로젝트를 로드하고 ProjectForm을 렌더링하는 클라이언트 수정 페이지.",["page","project","admin"],"moderate",true],
  // projects new
  ["app/admin/projects/new/page.tsx","NewProjectPage",[6,18],"빈 ProjectForm을 렌더링하는 프로젝트 신규 등록 페이지.",["page","project","admin"],"simple",true],
  // utm page
  ["app/admin/utm/page.tsx","AdminUtmPage",[6,18],"UtmBuilder를 렌더링하는 UTM 링크 빌더 페이지.",["page","utm","admin"],"simple",true],
  // AdminCommandSearch
  ["components/admin/AdminCommandSearch.tsx","AdminCommandSearch",[21,128],"관리 명령을 키워드 필터·키보드 네비게이션으로 검색해 해당 페이지로 이동시키는 커맨드 팔레트 컴포넌트.",["component","command-palette","search"],"moderate",true],
  // ConsolePrimitives
  ["components/admin/ConsolePrimitives.tsx","ConsolePageHeader",[20,41],"eyebrow·제목·설명·액션 영역을 가진 관리자 콘솔 페이지 헤더 컴포넌트.",["component","ui-kit","layout"],"simple",false],
  ["components/admin/ConsolePrimitives.tsx","ConsoleMetricCard",[43,75],"라벨·값·캡션·아이콘과 톤(neutral/positive 등)을 받는 관리자 메트릭 카드 컴포넌트.",["component","ui-kit","metric"],"simple",false],
  ["components/admin/ConsolePrimitives.tsx","ConsoleStatusPill",[100,120],"톤에 따라 색상이 바뀌는 상태 표시 핀 컴포넌트.",["component","ui-kit","status"],"simple",false],
  ["components/admin/ConsolePrimitives.tsx","ReadinessRing",[122,137],"0~100 점수를 원형 게이지로 시각화하는 준비도 링 컴포넌트.",["component","ui-kit","visualization"],"simple",false],
  // ProductForm
  ["components/admin/ProductForm.tsx","ProductForm",[24,376],"제품 필드와 메인·평면도·서브 이미지를 관리하고 product-actions로 생성/수정하는 폼 컴포넌트. 미저장 경고와 toast 피드백을 포함한다.",["component","form","product"],"complex",true],
  // MainCmsClient
  ["components/admin/cms/MainCmsClient.tsx","MainCmsClient",[67,139],"히어로/시그니처 섹션을 탭으로 전환하는 홈 CMS 최상위 클라이언트 컴포넌트.",["component","cms","container"],"moderate",true],
  ["components/admin/cms/MainCmsClient.tsx","HeroSectionEditor",[141,287],"히어로 슬라이드의 @dnd-kit 정렬·생성·삭제·활성 토글을 cms-actions와 연동하는 에디터.",["component","cms","drag-and-drop"],"complex",false],
  ["components/admin/cms/MainCmsClient.tsx","SortableHeroSlideItem",[289,433],"개별 히어로 슬라이드의 드래그 핸들·인라인 수정·활성 토글을 처리하는 정렬 가능 항목 컴포넌트.",["component","cms","drag-and-drop"],"complex",false],
  ["components/admin/cms/MainCmsClient.tsx","HeroSlideForm",[435,550],"히어로 슬라이드 제목·부제·이미지·활성 입력을 받는 생성/수정 서브폼.",["component","cms","form"],"moderate",false],
  ["components/admin/cms/MainCmsClient.tsx","SignatureLineEditor",[552,676],"제품 시그니처 지정을 낙관적 토글로 관리하는 시그니처 라인 에디터.",["component","cms","optimistic-update"],"complex",false],
  // GalleryForm
  ["components/admin/gallery/GalleryForm.tsx","GalleryForm",[54,323],"react-hook-form+zod 검증과 다중 이미지 압축·업로드·정렬을 갖춘 갤러리 항목 생성/수정 폼.",["component","form","gallery"],"complex",true],
  ["components/admin/gallery/GalleryForm.tsx","SortableImage",[325,385],"갤러리 이미지의 드래그 정렬·삭제를 처리하는 정렬 가능 썸네일 컴포넌트.",["component","gallery","drag-and-drop"],"moderate",false],
  // AnalyticsDashboard
  ["components/admin/insights/AnalyticsDashboard.tsx","ChartShell",[45,82],"ResizeObserver로 컨테이너 크기를 측정해 차트를 반응형으로 렌더링하는 래퍼 컴포넌트.",["component","chart","responsive"],"moderate",false],
  ["components/admin/insights/AnalyticsDashboard.tsx","AnalyticsDashboard",[84,369],"GA4 원시 데이터를 가공해 트래픽·기기·유입·인기페이지 차트와 요약 카드로 시각화하는 대시보드 컴포넌트.",["component","analytics","data-visualization"],"complex",true],
  ["components/admin/insights/AnalyticsDashboard.tsx","SummaryCard",[371,384],"제목·값·보조텍스트·아이콘을 표시하는 요약 카드 컴포넌트.",["component","ui-kit","metric"],"simple",false],
  // ImageUpload
  ["components/admin/media/ImageUpload.tsx","ImageUpload",[21,187],"이미지를 압축 후 uploadImageAction으로 업로드하고 미리보기·해상도 안내·실패 처리를 제공하는 단일 업로드 위젯.",["component","media","upload"],"complex",true],
  // MultiImageUpload
  ["components/admin/media/MultiImageUpload.tsx","MultiImageUpload",[16,147],"여러 이미지를 압축·병렬 업로드하고 성공 URL 목록을 콜백으로 전달하는 다중 업로드 위젯.",["component","media","upload"],"complex",true],
  // ProjectForm
  ["components/admin/projects/ProjectForm.tsx","ProjectForm",[57,382],"react-hook-form+zod 검증과 다중 이미지 업로드·정렬, 태그/메타 입력을 갖춘 프로젝트 생성/수정 폼.",["component","form","project"],"complex",true],
  ["components/admin/projects/ProjectForm.tsx","SortableImage",[384,444],"프로젝트 이미지의 드래그 정렬·삭제를 처리하는 정렬 가능 썸네일 컴포넌트.",["component","project","drag-and-drop"],"moderate",false],
  // UtmBuilder
  ["components/admin/utm/UtmBuilder.tsx","UtmBuilder",[37,319],"프리셋·UTM 입력으로 추적 URL을 실시간 생성하고 classifyAcquisition으로 유입 채널을 미리보기하는 빌더 컴포넌트.",["component","utm","marketing"],"complex",true],
  // useUnsavedChangesWarning
  ["hooks/useUnsavedChangesWarning.ts","useUnsavedChangesWarning",[12,25],"isDirty가 true인 동안 beforeunload 이탈 경고를 활성화하는 커스텀 hook.",["hook","navigation-guard","form"],"simple",true],
  // lib/analytics.ts
  ["lib/analytics.ts","withGaTimeout",[16,28],"GA Data API 요청에 타임아웃을 거는 Promise.race 래퍼 헬퍼.",["utility","timeout","helper"],"simple",false],
  ["lib/analytics.ts","getTrafficStats",[30,53],"일자별 트래픽(사용자·세션·페이지뷰·이탈률) GA4 리포트를 조회한다.",["analytics","api-client","query"],"moderate",true],
  ["lib/analytics.ts","getUserDemographics",[55,82],"기기·사용자 인구통계 GA4 리포트를 조회한다.",["analytics","api-client","query"],"moderate",true],
  ["lib/analytics.ts","getCityDemographics",[84,102],"도시별 사용자 분포 GA4 리포트를 조회한다.",["analytics","api-client","query"],"simple",true],
  ["lib/analytics.ts","getAcquisitionSources",[104,122],"유입 채널/소스 GA4 리포트를 조회한다.",["analytics","api-client","query"],"simple",true],
  ["lib/analytics.ts","getTopPages",[124,142],"인기 페이지 GA4 리포트를 조회한다.",["analytics","api-client","query"],"simple",true],
  // lib/analytics/acquisition.ts
  ["lib/analytics/acquisition.ts","parseUtmFromUrl",[90,100],"URL 쿼리스트링에서 UTM 파라미터를 추출·정규화한다.",["analytics","parsing","utm"],"simple",true],
  ["lib/analytics/acquisition.ts","parseClickIdsFromUrl",[102,112],"URL에서 광고 클릭ID(gclid/fbclid 등)를 추출·정규화한다.",["analytics","parsing","acquisition"],"simple",true],
  ["lib/analytics/acquisition.ts","isPaidByUtmOrClickIds",[127,141],"UTM 매체와 클릭ID로 유료 유입 여부를 판정하는 헬퍼.",["analytics","classification","helper"],"simple",false],
  ["lib/analytics/acquisition.ts","classifyAcquisition",[143,254],"UTM·클릭ID·레퍼러 호스트를 종합해 트래픽을 채널/소스/매체로 분류하는 핵심 함수.",["analytics","classification","acquisition"],"complex",true],
  // lib/utm/builder.ts
  ["lib/utm/builder.ts","buildUtmUrl",[10,29],"base URL·경로·UTM 값을 받아 searchParams로 조합한 추적 URL을 생성한다.",["utility","url-builder","utm"],"simple",true]
];

for (const [path, name, range, summary, tags, complexity, exported] of fns) {
  const id = `function:${path}:${name}`;
  addNode({ id, type: "function", name, filePath: path, lineRange: range, summary, tags, complexity });
  // contains
  addEdge({ source: `file:${path}`, target: id, type: "contains", direction: "forward", weight: 1.0 });
  // exports
  if (exported) addEdge({ source: `file:${path}`, target: id, type: "exports", direction: "forward", weight: 0.8 });
}

// ---- IMPORTS edges (1:1) ----
let importCount = 0;
for (const f of slice.files) {
  for (const tgt of bid[f.path]) {
    addEdge({ source: `file:${f.path}`, target: `file:${tgt}`, type: "imports", direction: "forward", weight: 0.7 });
    importCount++;
  }
}

// ---- CALLS edges (cross-file function calls, high confidence) ----
const calls = [
  // analytics-actions -> lib/analytics (cached* wrap these); fetch fns call lib fns
  ["function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard","function:lib/analytics.ts:getTrafficStats"],
  ["function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard","function:lib/analytics.ts:getUserDemographics"],
  ["function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard","function:lib/analytics.ts:getAcquisitionSources"],
  ["function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard","function:lib/analytics.ts:getTopPages"],
  ["function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard","function:lib/analytics.ts:getCityDemographics"],
  // DashboardContainer -> analytics-actions
  ["function:app/admin/DashboardContainer.tsx:DashboardContainer","function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard"],
  // insights page -> analytics-actions
  ["function:app/admin/insights/page.tsx:InsightsPage","function:app/actions/analytics-actions.ts:fetchAnalyticsDashboard"],
  // main page -> cms-actions
  ["function:app/admin/main/page.tsx:CMSMainPage","function:app/actions/cms-actions.ts:getHeroSlides"],
  ["function:app/admin/main/page.tsx:CMSMainPage","function:app/actions/cms-actions.ts:getSignatureProducts"],
  // gallery [id] -> gallery-actions (cross batch, neighborMap)
  ["function:app/admin/gallery/[id]/page.tsx:EditGalleryPage","function:app/actions/gallery-actions.ts:getGalleryItemForAdmin"],
  // projects [id] -> project-actions (cross batch, neighborMap)
  ["function:app/admin/projects/[id]/page.tsx:EditProjectPage","function:app/actions/project-actions.ts:getProject"],
  // products [id] -> uses supabaseAdmin directly (no project fn); skip
  // MainCmsClient internals -> cms-actions
  ["function:components/admin/cms/MainCmsClient.tsx:HeroSectionEditor","function:app/actions/cms-actions.ts:reorderHeroSlides"],
  ["function:components/admin/cms/MainCmsClient.tsx:HeroSectionEditor","function:app/actions/cms-actions.ts:createHeroSlide"],
  ["function:components/admin/cms/MainCmsClient.tsx:HeroSectionEditor","function:app/actions/cms-actions.ts:deleteHeroSlide"],
  ["function:components/admin/cms/MainCmsClient.tsx:HeroSectionEditor","function:app/actions/cms-actions.ts:setHeroSlideActive"],
  ["function:components/admin/cms/MainCmsClient.tsx:SortableHeroSlideItem","function:app/actions/cms-actions.ts:updateHeroSlide"],
  ["function:components/admin/cms/MainCmsClient.tsx:SignatureLineEditor","function:app/actions/cms-actions.ts:updateSignatureStatus"],
  // ProductForm -> product-actions (cross batch)
  ["function:components/admin/ProductForm.tsx:ProductForm","function:app/actions/product-actions.ts:createProduct"],
  ["function:components/admin/ProductForm.tsx:ProductForm","function:app/actions/product-actions.ts:updateProduct"],
  // GalleryForm -> gallery-actions + storage-actions
  ["function:components/admin/gallery/GalleryForm.tsx:GalleryForm","function:app/actions/gallery-actions.ts:saveGalleryItem"],
  ["function:components/admin/gallery/GalleryForm.tsx:GalleryForm","function:app/actions/storage-actions.ts:uploadImageAction"],
  // ProjectForm -> project-actions + storage-actions
  ["function:components/admin/projects/ProjectForm.tsx:ProjectForm","function:app/actions/project-actions.ts:createProject"],
  ["function:components/admin/projects/ProjectForm.tsx:ProjectForm","function:app/actions/project-actions.ts:updateProject"],
  ["function:components/admin/projects/ProjectForm.tsx:ProjectForm","function:app/actions/storage-actions.ts:uploadImageAction"],
  // ImageUpload + MultiImageUpload -> storage-actions
  ["function:components/admin/media/ImageUpload.tsx:ImageUpload","function:app/actions/storage-actions.ts:uploadImageAction"],
  ["function:components/admin/media/MultiImageUpload.tsx:MultiImageUpload","function:app/actions/storage-actions.ts:uploadImageAction"],
  // UtmBuilder -> builder + acquisition
  ["function:components/admin/utm/UtmBuilder.tsx:UtmBuilder","function:lib/utm/builder.ts:buildUtmUrl"],
  ["function:components/admin/utm/UtmBuilder.tsx:UtmBuilder","function:lib/analytics/acquisition.ts:classifyAcquisition"],
  // lib/utm/builder imports acquisition types only; builder fn doesn't call acquisition fns -> skip calls
  // AnalyticsDashboard is rendered by container/insights; ConsolePrimitives used widely (contains, not calls)
  // AdminPage uses getCount helper (same file, skip) ; uses requireAdmin/getSupabaseAdmin cross-batch (not function nodes here)
];

for (const [src, tgt] of calls) {
  addEdge({ source: src, target: tgt, type: "calls", direction: "forward", weight: 0.8 });
}

// ---- DEPENDS_ON edges (runtime UI dependency on shared kit/hook beyond plain import already covered) ----
// imports already cover file->file. Add depends_on for component->hook consumers where wiring is runtime-critical and not over-redundant: skip to avoid noise (imports edge suffices).

// ---- SPLIT into parts (nodes>60 or edges>120) ----
const nodeCount = nodes.length;
const edgeCount = edges.length;
const parts = (nodeCount <= 60 && edgeCount <= 120) ? 1 : Math.ceil(Math.max(nodeCount / 60, edgeCount / 120));

// path -> part index (alphabetical chunking)
const sortedPaths = slice.files.map(f => f.path).sort();
const chunkSize = Math.ceil(sortedPaths.length / parts);
const pathToPart = new Map();
for (let i = 0; i < sortedPaths.length; i++) {
  pathToPart.set(sortedPaths[i], Math.floor(i / chunkSize) + 1); // 1-indexed
}

function nodePart(n) {
  // node filePath (file nodes) or path embedded in id (function/class)
  let p = n.filePath;
  if (!p) {
    const m = n.id.match(/^(?:function|class):(.+):[^:]+$/);
    if (m) p = m[1];
  }
  return pathToPart.get(p);
}

const outBase = "/Users/zoopark-studio/Documents/dev/weet-homepage/.understand-anything/intermediate";

if (parts === 1) {
  fs.writeFileSync(`${outBase}/batch-3.json`, JSON.stringify({ nodes, edges }, null, 2));
} else {
  // assign nodes to parts
  const nodesByPart = {};
  const nodeIdToPart = new Map();
  for (let k = 1; k <= parts; k++) nodesByPart[k] = [];
  for (const n of nodes) {
    const k = nodePart(n);
    nodesByPart[k].push(n);
    nodeIdToPart.set(n.id, k);
  }
  // edges go with their source's part
  const edgesByPart = {};
  for (let k = 1; k <= parts; k++) edgesByPart[k] = [];
  for (const e of edges) {
    const k = nodeIdToPart.get(e.source);
    if (k == null) { console.log("WARN edge source has no part:", e.source); continue; }
    edgesByPart[k].push(e);
  }
  for (let k = 1; k <= parts; k++) {
    fs.writeFileSync(`${outBase}/batch-3-part-${k}.json`, JSON.stringify({ nodes: nodesByPart[k], edges: edgesByPart[k] }, null, 2));
    console.log(`part ${k}: nodes=${nodesByPart[k].length} edges=${edgesByPart[k].length}`);
  }
}

// stats + validation
const imports = edges.filter(e => e.type === "imports").length;
const idSet = new Set(nodes.map(n => n.id));
// neighbor + import target validity set
const neighborPaths = new Set();
for (const k of Object.keys(slice.neighborMap || {})) {
  for (const nb of slice.neighborMap[k]) neighborPaths.add(nb.path);
}
const importTargets = new Set();
for (const k of Object.keys(bid)) for (const p of bid[k]) importTargets.add(p);

let bad = [];
for (const e of edges) {
  for (const ep of [e.source, e.target]) {
    if (idSet.has(ep)) continue;
    // file:<path> allowed if in neighborMap or importTargets or a batch file
    const m = ep.match(/^(file|function|class):(.+?)(?::(.+))?$/);
    if (!m) { bad.push([e.type, ep, "unparseable"]); continue; }
    const kind = m[1]; const path = m[2];
    const known = neighborPaths.has(path) || importTargets.has(path);
    if (!known) bad.push([e.type, ep, "unknown-target"]);
  }
}

console.log("TOTAL nodes:", nodes.length);
console.log("TOTAL edges:", edges.length);
console.log("imports edges:", imports, "(expected 69)");
console.log("function nodes:", nodes.filter(n=>n.type==="function").length);
console.log("calls edges:", edges.filter(e=>e.type==="calls").length);
console.log("parts written:", parts);
console.log("global invalid edge endpoints:", bad.length);
if (bad.length) console.log(JSON.stringify(bad, null, 2));

// per-part validation: each endpoint must be a global batch node id, or a known cross-batch file/function/class ref
const allBatchIds = new Set(nodes.map(n => n.id));
function endpointOk(ep) {
  if (allBatchIds.has(ep)) return true; // in some part of this batch
  const m = ep.match(/^(file|function|class):(.+?)(?::(.+))?$/);
  if (!m) return false;
  const path = m[2];
  return neighborPaths.has(path) || importTargets.has(path);
}
let partBad = [];
for (let k = 1; k <= parts; k++) {
  const fp = `${outBase}/batch-3-part-${k}.json`;
  if (!fs.existsSync(fp)) continue;
  const frag = JSON.parse(fs.readFileSync(fp, "utf8"));
  for (const e of frag.edges) {
    if (!endpointOk(e.source)) partBad.push([k, e.type, "source", e.source]);
    if (!endpointOk(e.target)) partBad.push([k, e.type, "target", e.target]);
  }
}
console.log("per-part invalid endpoints:", partBad.length);
if (partBad.length) console.log(JSON.stringify(partBad, null, 2));
