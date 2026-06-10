// Seed conversion-critical FAQs (permits, insulation, costs) into the faqs table.
// Idempotent: skips any question_ko that already exists. Never deletes or overwrites.
// Run: node scripts/seed-faqs.mjs
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const FAQS = [
  {
    question_ko: '농막으로 설치하려면 어떤 절차가 필요한가요?',
    answer_ko:
      '농막은 농지에 가설건축물 축조 신고로 설치하는 연면적 20㎡ 이하의 시설로, 위트 3x6 모델(18㎡)이 이 범위에 해당합니다. 신고 절차와 정화조·데크 등 부속시설 기준은 지자체마다 달라, 상담 시 부지 주소를 기준으로 함께 확인해 드립니다.',
  },
  {
    question_ko: '농촌체류형 쉼터로도 설치할 수 있나요?',
    answer_ko:
      '2024년 12월부터 시행된 농촌체류형 쉼터 제도는 농지에 연면적 33㎡ 이하의 임시 숙소를 둘 수 있게 합니다. 위트 3x9 모델(27㎡)이 검토 대상이 되는 크기입니다. 본인 영농 활동 등 적용 요건과 세부 기준은 관할 지자체 확인이 필요하며, 상담 단계에서 함께 정리해 드립니다.',
  },
  {
    question_ko: '겨울에도 따뜻하게 지낼 수 있나요? 단열은 어떻게 되나요?',
    answer_ko:
      '벽체와 지붕에 단열재를 시공하고 창호 사양으로 열 손실을 줄입니다. 적용 단열재와 창호, 난방 방식은 모델과 옵션 구성에 따라 달라지므로, 상담 시 선택하신 구성 기준의 사양을 문서로 안내해 드립니다. 겨울 상주 목적이라면 상담에서 그 용도를 알려주시는 것이 가장 정확합니다.',
  },
  {
    question_ko: '운반비는 얼마나 나오나요?',
    answer_ko:
      '운반비는 공장(전남 함평)에서 설치 현장까지의 거리, 차량 종류, 하차 장비(크레인 등)에 따라 정해집니다. 부지 주소를 알려주시면 상담 단계에서 바로 산정해 드리며, 견적서에 항목별로 표기되어 계약 후 추가되는 일이 없도록 합니다.',
  },
  {
    question_ko: '제품 가격 외에 어떤 비용이 더 들 수 있나요?',
    answer_ko:
      '현장에 따라 운반비, 하차·설치 장비(크레인), 기초 공사, 전기·상하수 인입, 정화조 설치 비용이 추가될 수 있습니다. 어떤 항목이 필요한지는 부지 조건에 따라 달라지므로, 현장 확인 후 항목별 총액 견적으로 확정해 드립니다.',
  },
  {
    question_ko: '전기·수도가 없는 땅인데 설치할 수 있나요?',
    answer_ko:
      '설치 자체는 가능하지만 생활을 위해서는 전기와 상하수 인입 공사가 필요합니다. 인입 비용은 연결 지점까지의 거리에 따라 달라지며, 욕실을 사용할 경우 정화조 설치도 함께 검토해야 합니다. 상담 시 부지 상태를 기준으로 필요한 공사를 정리해 드립니다.',
  },
  {
    question_ko: '이동식주택에서 전입신고(상시 주거)가 가능한가요?',
    answer_ko:
      '농막과 농촌체류형 쉼터는 상시 주거 목적 사용이 제한됩니다. 상시 주거나 펜션 등 영업 목적이라면 지목과 용도지역에 따라 건축신고(허가) 절차를 거쳐야 하며, 절차와 비용이 달라집니다. 어떤 방식이 맞는지 상담 단계에서 부지 기준으로 확인해 드립니다.',
  },
];

const { data: existing, error: fetchError } = await supabase
  .from('faqs')
  .select('question_ko, order_index');

if (fetchError) {
  console.error('Failed to fetch existing FAQs:', fetchError.message);
  process.exit(1);
}

const existingQuestions = new Set((existing ?? []).map((row) => row.question_ko));
const maxOrder = Math.max(0, ...(existing ?? []).map((row) => row.order_index ?? 0));

let order = maxOrder;
let inserted = 0;
for (const faq of FAQS) {
  if (existingQuestions.has(faq.question_ko)) {
    console.log('skip (exists):', faq.question_ko);
    continue;
  }
  order += 10;
  const { error } = await supabase.from('faqs').insert({
    question_ko: faq.question_ko,
    answer_ko: faq.answer_ko,
    category: 'general',
    is_active: true,
    order_index: order,
  });
  if (error) {
    console.error('insert failed:', faq.question_ko, error.message);
    process.exit(1);
  }
  inserted += 1;
  console.log('inserted:', faq.question_ko);
}

console.log(`done — ${inserted} inserted, ${FAQS.length - inserted} skipped`);
