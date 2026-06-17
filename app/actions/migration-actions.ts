'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { requireAdmin } from '@/lib/admin-auth';

const productsData = [
    {
        name: "3X9 집",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/01-3x9-house.webp",
        description: `완벽하게 계산된 3m x 9m의 효율적인 공간. 하지만 이 집의 진짜 매력은 발코니문을 여는 순간 시작됩니다.
나만의 작은 발코니에서 즐기는 아침의 커피 한 잔,
살랑이는 바람을 맞으며 읽는 오후의 책 한 권,
저녁노을을 바라보며 즐기는 시원한 맥주 한 캔.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "박공지붕",
        exterior_finish: "갈바륨 골강판",
        interior_finish: "자작나무,벽지,안타민",
        size: "3.2m X 6.2m X 높이 3.8m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=300%&crop_h=440%&crop_t=-111%&crop_l=0%",
        display_order: 1,
        tagline: ""
    },
    {
        name: "3X6 집 (Zinc)",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/02-3x6-house-render.webp",
        description: `우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다.
마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "쉐이드 지붕",
        exterior_finish: "적삼목, 징크",
        interior_finish: "자작나무,벽지,안타민",
        size: "3.2m X 6.2m X 높이 3.6m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=407%&crop_h=448%&crop_t=-115%&crop_l=-137%",
        display_order: 2,
        tagline: ""
    },
    {
        name: "3X6 집 (Stucco)",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/03-3x6-house-stucco.webp",
        description: `우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다.
마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "평지붕",
        exterior_finish: "스타코",
        interior_finish: "자작나무,벽지,안타민",
        size: "3.2m X 6.2m X 높이 3.2m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=407%&crop_h=448%&crop_t=-115%&crop_l=-137%",
        display_order: 3,
        tagline: ""
    },
    {
        name: "3X6 집 (Corrugated)",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/04-3x6-house-corrugated.webp",
        description: `우리는 이 공간을 건축물처럼 짓지 않고, 가구처럼 정밀하게 짜 맞췄습니다.
마치 잘 설계된 수납장을 열었을 때 감탄하게 되는 짜임새처럼, 현관부터 거실, 주방, 욕실까지 모든 공간이 유기적으로 연결되어 단 1cm의 낭비도 허용하지 않습니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "평지붕",
        exterior_finish: "갈바륨 골강판",
        interior_finish: "자작나무,벽지,안타민",
        size: "3.2m X 6.2m X 높이 3.2m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=407%&crop_h=448%&crop_t=-115%&crop_l=-137%",
        display_order: 4,
        tagline: ""
    },
    {
        name: "3X6 CAMPER",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/05-3x6-camper.webp",
        description: `벽을 없애 자연과 하나 되는 개방감을 주되, 생활의 필수 요소인 위생과 조리 시설은 모듈러 공법으로 완벽하게 갖췄습니다.
텐트를 걷으면 탁 트인 파빌리온이 되고, 텐트를 치면 나만의 요새가 됩니다.
물과 불, 그리고 지붕. 인류의 가장 오래된 안식처를 현대 기술로 재해석했습니다.
훗날 벽을 세워 온전한 집이 될 여지까지 남겨둔, 가능성으로 가득 찬 공간입니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "평지붕",
        exterior_finish: "적삼목",
        interior_finish: "자작나무,타일,안타민",
        size: "3.2m X 6.2m X 높이 3.2m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=401%&crop_h=440%&crop_t=-112%&crop_l=-226%",
        display_order: 5,
        tagline: ""
    },
    {
        name: "3X3 SAUNA",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/06-3x3-sauna.webp",
        description: `진정한 휴식은 비워내는 것에서 시작합니다.
그윽한 나무 향기가 가득한 3x3m의 아늑한 방. 뜨거운 공기 속에 땀과 스트레스를 온전히 흘려보내세요.
그리고 문을 열고 나가보세요. 길게 뻗은 처마가 만들어준 프라이빗한 공간 아래, 시원하게 쏟아지는 야외 냉수 샤워가 당신을 기다립니다.
몸은 뜨겁게, 머리는 차갑게. 핀란드의 사우나 문화와 한국의 정자(처마) 감성이 만난 이곳에서, 당신의 몸과 마음은 다시 태어납니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "평지붕",
        exterior_finish: "적삼목",
        interior_finish: "히노끼",
        size: "3.2m X 3.2m X 높이 2.8m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=714%&crop_h=448%&crop_t=-115%&crop_l=-592%",
        display_order: 6,
        tagline: ""
    },
    {
        name: "3X3 내서재",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/07-3x3-library.webp",
        description: `3면을 채운 책들의 지혜와, 1면을 채운 자연의 영감. 오직 당신만을 위한 '지적 요새'입니다.
누구의 방해도 받지 않는 고요함. 문을 닫는 순간, 등 뒤로는 당신이 사랑하는 장서들이 든든한 벽이 되어주고, 눈앞의 긴 창으로는 계절의 변화가 한 폭의 그림처럼 펼쳐집니다.
창가에 놓인 넓은 책상에 앉아보세요. 시선은 확 트이고, 집중력은 깊어집니다.
글을 쓰든, 연구를 하든, 혹은 그저 사색에 잠기든. 이곳은 당신의 내면이 가장 또렷해지는 세상에 단 하나뿐인 몰입의 공간입니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "쉐이드지붕",
        exterior_finish: "합성데크",
        interior_finish: "자작나무",
        size: "3.2m X 3.2m X 높이 3.2m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=564%&crop_h=479%&crop_t=-236%&crop_l=-7%",
        display_order: 7,
        tagline: ""
    },
    {
        name: "3X3 리트릿",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/08-3x3-retreat.webp",
        description: `소란스러운 세상을 차단하고, 오직 당신의 호흡과 낮은 햇살만이 머무는 공간.
진정한 몰입을 위해 우리는 창의 높이를 과감히 낮췄습니다.
바닥과 맞닿은 낮고 긴 창을 통해 들어온 햇살은 눈을 찌르는 대신, 바닥에 차분하고 깊은 그림자를 만듭니다.
방석 위에 앉아, 혹은 요가 매트 위에 누워 시선을 떨구면 창틀이 담아낸 흙과 풀, 그리고 고요한 빛의 입자만이 보입니다.
따뜻한 차 한 잔을 우리거나 깊은 호흡을 내쉬는 순간. 이 낮은 공간은 당신을 가장 깊은 무의식의 휴식으로 안내할 것입니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "평지붕",
        exterior_finish: "적삼목",
        interior_finish: "자작나무",
        size: "3.2m X 3.2m X 높이 3.2m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=657%&crop_h=479%&crop_t=-236%&crop_l=-137%",
        display_order: 8,
        tagline: ""
    },
    {
        name: "3X6 맨스케이브",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/09-3x6-manscave.webp",
        description: `가족의 행복을 위해, 회사의 목표를 위해 치열하게 살아온 당신. 오직 당신의 룰대로 움직이는 공간이 필요합니다.
외부는 어떤 시선도 허용하지 않는 견고한 디자인입니다.
하지만 육중한 문을 열고 들어서는 순간, 완벽히 다른 세상이 펼쳐집니다.
고가의 오디오 모듈러, 수집해온 피규어, 몰입을 위한 게이밍 기어, 혹은 짙은 향의 위스키 바.
누구의 눈치도 볼 필요 없는 이 단단한 벙커 안에서, 잊고 있던 당신의 '소년'을 다시 깨우십시오.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "평지붕",
        exterior_finish: "징크",
        interior_finish: "자작나무,벽지,안타민",
        size: "3.2m X 6.2m X 높이 3.8m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=420%&crop_h=479%&crop_t=-236%&crop_l=-147%",
        display_order: 9,
        tagline: ""
    },
    {
        name: "3X6 피터팬의 모험",
        category: "Small unit",
        sub_category: "Private",
        size_category: "S",
        image_url: "/images/products/small/private/10-3x6-peterpan.webp",
        description: `아이들의 가장 위대한 능력은 보이지 않는 것을 보는 힘입니다.
이 공간은 아이들의 상상력이 더해지는 순간, 완전히 다른 세상으로 변합니다.
어떤 날은 인디언의 비밀 텐트가, 어떤 날은 해적선이, 또 어떤 날은 요정의 숲이 됩니다.
우리는 아이들이 마음껏 상상의 나래를 펼칠 수 있도록, 가장 깨끗하고 안전한 '하얀 도화지' 같은 공간을 만들었습니다.
스마트폰 화면 대신, 아이들 스스로 만들어내는 이야기가 가득 채워지는 곳.
이곳에서 아이들의 꿈은 피터팬의 그림자처럼 늘 함께 자라납니다.`,
        price: "위트문의",
        structure: "철골구조 + 목구조",
        roof_type: "쉐이드 지붕",
        exterior_finish: "적삼목, 징크",
        interior_finish: "자작나무,벽지",
        size: "3.2m X 6.2m X 높이 3.6m",
        floor_plan_url: "/images/products/floor-plans/small-private-plans.webp?crop_w=427%&crop_h=479%&crop_t=-236%&crop_l=-251%",
        display_order: 10,
        tagline: ""
    },
    {
        name: "3X6 버스정류장",
        category: "Small unit",
        sub_category: "Public",
        size_category: "S",
        image_url: "/images/products/small/public/11-3x6-busstop.webp",
        description: `시골 버스는 조금 늦게 와도 괜찮습니다. 우리에게는 이야기꽃을 피울 수 있는 넓은 '평상'이 있으니까요.
위트는 시골 어르신들이 버스를 기다리는 시간이 지루하지 않도록, 다리를 펴고 편히 쉬거나 이웃과 담소를 나눌 수 있는 한국적인 평상 구조를 도입했습니다.
또한, 정류장 한편에는 어르신들의 발이 되어주는 유모차(보행기)와 학생들의 자전거가 비를 맞지 않도록 3m x 6m의 넉넉한 공간을 나누어 전용 주차 구역을 마련했습니다.
단순히 버스를 타는 곳이 아닙니다. 마을의 정이 머물고, 사람을 배려하는 따뜻한 쉼터입니다.`,
        price: "위트문의",
        structure: "철골구조",
        roof_type: "평지붕",
        exterior_finish: "스테인레스",
        interior_finish: "-",
        size: "3.2m X 6.2m X 높이 2.5m",
        floor_plan_url: "/images/products/floor-plans/small-public-plans.webp?crop_w=407%&crop_h=628%&crop_t=-257%&crop_l=0%",
        display_order: 11,
        tagline: ""
    },
    {
        name: "4X8 공중화장실",
        category: "Small unit",
        sub_category: "Public",
        size_category: "S",
        image_url: "/images/products/small/public/12-4x8-restroom.webp",
        description: `시선은 차단하고, 하늘은 열었습니다.
가장 프라이빗한 곳에서 만나는 자유, 'The Sky' 공중화장실의 핵심은 첫째도 청결, 둘째도 유지보수입니다.
우리는 습기와 오염에 가장 강한 소재인 '스테인리스 스틸'을 내외장재로 채택했습니다.
물청소 한 번이면 새것처럼 빛나는 유지 관리의 용이함, 부식이나 파손 걱정 없는 압도적인 내구성, 자연 채광이 쏟아지는 밝은 실내는 세균 번식을 억제하고 심리적으로도 더 깨끗한 환경을 만듭니다.
설치하는 순간부터 관리자의 고민을 덜어주는 가장 스마트한 선택입니다.`,
        price: "위트문의",
        structure: "철골구조",
        roof_type: "평지붕",
        exterior_finish: "스테인레스",
        interior_finish: "타일,안타민",
        size: "3.2m X 6.2m X 높이 2.5m",
        floor_plan_url: "/images/products/floor-plans/small-public-plans.webp?crop_w=353%&crop_h=454%&crop_t=-185%&crop_l=-115%",
        display_order: 12,
        tagline: ""
    },
    {
        name: "3X9 파고라",
        category: "Small unit",
        sub_category: "Public",
        size_category: "S",
        image_url: "/images/products/small/public/13-3x9-pergola.webp",
        description: `최소한의 기둥, 최대한의 개방감. 철의 강인함으로 나무의 온기를 공중에 띄웠습니다.
아름다운 건축은 풍경을 가리지 않습니다. 단지 풍경이 머물 자리를 만들어줄 뿐입니다.
위트의 파고라는 3m x 9m의 긴 지붕을 지탱하는 구조체를 극한으로 얇게 설계했습니다.
마치 허공에 선을 그은 듯 슬림한 스틸 기둥(Steel Column)은 시각적 무게감을 없애고 압도적인 개방감을 선사합니다.
그리고 그 차가운 금속 프레임 사이를 채우는 것은 따뜻한 물성의 천연 목재(Wood)입니다.
차가움과 따뜻함, 얇음과 견고함. 상반된 두 가치가 만나 완성한 구조적 미학의 정점을 경험해 보세요.`,
        price: "위트문의",
        structure: "철골구조",
        roof_type: "평지붕",
        exterior_finish: "금속,합성목재",
        interior_finish: "-",
        size: "3.2m X 9.2m X 높이 2.5m",
        floor_plan_url: "/images/products/floor-plans/small-public-plans.webp?crop_w=367%&crop_h=621%&crop_t=-254%&crop_l=-257%",
        display_order: 13,
        tagline: ""
    }
];

export async function migrateProducts() {
    await requireAdmin();

    // Safety guard (F10): this is a one-time SEED for an empty products table.
    // It must never delete the live, admin-managed catalog and replace it with
    // this stale hardcoded list. If any products already exist, abort instead of
    // destroying data. (The previous implementation deleted ALL rows first.)
    const { count, error: countError } = await supabaseAdmin
        .from('products')
        .select('id', { count: 'exact', head: true });

    if (countError) {
        console.error('Failed to check existing products:', countError);
        throw new Error('제품 데이터 확인 중 오류가 발생했습니다.');
    }

    if ((count ?? 0) > 0) {
        throw new Error(
            `이미 ${count}개의 제품이 등록되어 있어 시드 마이그레이션을 중단했습니다. 기존 데이터를 삭제하거나 덮어쓰지 않습니다.`,
        );
    }

    // Insert seed data only into the empty table.
    for (const product of productsData) {
        const { error } = await supabaseAdmin
            .from('products')
            .insert(product as any);

        if (error) {
            console.error(`Failed to insert ${product.name}:`, error);
        } else {
            console.log(`Inserted ${product.name}`);
        }
    }

    return { success: true };
}
