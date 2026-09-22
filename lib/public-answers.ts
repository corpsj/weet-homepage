// Reviewed public answers. Keep conditions alongside each claim. Admin-managed
// questions still appear; these established topics use this current wording.
export const PUBLIC_ANSWERS = [
  { question: '제품 가격 외에 어떤 비용이 더 들 수 있나요?', answer: '기본 제품가와 유상 옵션 외에 운반·크레인, 기초 공사, 전기·상하수도 연결, 정화조와 행정 비용 등이 발생할 수 있습니다. 필요한 항목과 담당 업체는 부지 조건에 따라 달라집니다. 견적서에서 포함·제외 범위와 부가세를 확인해 주세요.' },
  { question: '제작 및 설치 기간은 얼마나 소요되나요?', answer: '모델과 선택 사양, 제작 일정, 현장 준비 상태에 따라 달라집니다. 상담에서 제작 가능 시점과 운반·설치 일정을 확인한 뒤 계약서에 정리합니다.' },
  { question: '사후 관리(A/S)는 어떻게 진행되나요?', answer: '고객센터에 제품과 불편한 증상을 알려주시면 점검 방법을 안내합니다. 보증 기간과 적용 범위는 계약서 및 각 설비의 보증 조건을 확인해 주세요.' },
  { question: '위트의 모듈러 주택은 내구성이 어떤가요?', answer: '구조, 단열, 창호와 마감 사양은 모델과 선택 옵션에 따라 달라집니다. 사용 목적과 설치 환경을 알려주시면 해당 구성의 사양과 관리 방법을 상담에서 확인할 수 있습니다.' },
  { question: '농막으로 설치하려면 어떤 절차가 필요한가요?', answer: '농막 설치는 사용 목적과 부지, 적용 법령 및 지역별 기준을 확인해야 합니다. 3x6이라는 제품 규격만으로 설치가 허용되는 것은 아닙니다. 토지 정보와 계획을 관할 지자체에 제시해 필요한 절차를 확인해 주세요.' },
  { question: '농촌체류형 쉼터로도 설치할 수 있나요?', answer: '설치하려는 토지, 이용 목적과 제도상 요건을 먼저 확인해야 합니다. 모델 크기가 맞더라도 설치 가능 여부가 자동으로 결정되지는 않습니다. 관할 지자체 확인 후 필요한 사양과 현장 조건을 상담합니다.' },
  { question: '운반비는 얼마나 나오나요?', answer: '출고지에서 현장까지의 거리, 운반 차량, 진입로와 크레인 작업 조건에 따라 달라집니다. 설치 예정 지역과 현장 사진을 준비하면 필요한 운반·설치 항목을 확인하는 데 도움이 됩니다.' },
  { question: '전기·수도가 없는 땅인데 설치할 수 있나요?', answer: '부지 확인이 먼저 필요합니다. 진입과 설치 조건뿐 아니라 전기·급수·배수 시설의 연결 가능 여부, 거리와 공사 범위를 확인해야 합니다. 기반 시설이 없다는 정보만으로 설치 가능 여부나 비용을 확정할 수 없습니다.' },
  { question: '이동식주택에서 전입신고(상시 주거)가 가능한가요?', answer: '이동할 수 있는 제품이라는 이유만으로 상시 주거나 전입신고가 가능한 것은 아닙니다. 계획한 건축물의 용도, 부지와 필요한 절차를 관할 지자체에 확인해야 합니다. 주거 목적이라면 상담할 때 미리 알려주세요.' },
];

export function reviewedPublicAnswers(faqs: { question: string; answer: string }[]) {
  const reviewed = new Map(PUBLIC_ANSWERS.map((faq) => [faq.question, faq.answer]));
  const combined = faqs.map((faq) => ({ ...faq, answer: reviewed.get(faq.question) ?? faq.answer }));
  const existing = new Set(combined.map((faq) => faq.question));
  return [...combined, ...PUBLIC_ANSWERS.filter((faq) => !existing.has(faq.question))];
}
