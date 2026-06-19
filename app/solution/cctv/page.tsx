"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "security",
  href: "/solution/cctv",
  image: "/images/solution/generated/kr-security-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "SECURITY OPTION",
      title: "집을 비워도 휴대폰으로 한눈에",
      lead:
        "CCTV와 스마트락을 따로 사는 문제가 아닙니다. Weet는 현관, 창측, 야간 조명, 알림 기준을 한 번에 설계해 멀리 떨어진 세컨하우스도 스마트폰으로 출입과 주변을 확인할 수 있게 만듭니다.",
      imageAlt: "한국 전원 모듈러 세컨하우스 현관에 설치된 CCTV, 동작 감지 센서등, 스마트락 실사 이미지",
      problemTitle: "집을 비웠을 때 가장 불안한 순간",
      problem:
        "주말주택, 별장, 외진 독채는 가족이 늘 머물 수 없습니다. 출입 기록이 없거나 야간 조명이 부족하면 작은 이상 징후도 큰 걱정거리가 됩니다.",
      fitTitle: "추천 구성",
      fit: ["주말에만 머무는 세컨하우스", "산속이나 바닷가의 외진 독채 별장", "부모님이 따로 지내시는 시골집", "오래 비우는 일이 잦은 주말주택"],
      includedTitle: "구성 범위",
      included: ["현관과 창측 사각지대 기준 CCTV 위치 제안", "스마트락 권한과 일회성 출입 방식 정리", "동작 감지 센서등 밝기와 야간 점등 범위 계획", "집주인이 받을 알림 범위와 가족 간 권한 지정"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["집주인, 가족, 방문객의 출입 권한을 어떻게 나눌지", "촬영이 필요한 구역과 사생활 보호가 필요한 구역을 어디까지 나눌지", "야간 알림을 누가 받고 어떤 상황에서 확인할지", "통신 장애 시 저장과 알림을 어떤 방식으로 보완할지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["밤에도 현관과 주변 상태를 휴대폰으로 바로 확인할 수 있습니다.", "가족과 방문객의 출입 흐름이 기록으로 남습니다.", "동작 감지 조명과 카메라 위치가 겹쳐 사각지대가 줄어듭니다.", "분실, 파손, 무단출입 대응이 감이 아니라 기록 중심으로 바뀝니다."],
      ctaPrimary: "주문 옵션에서 시큐리티 확인",
      ctaSecondary: "시큐리티 옵션 문의",
    },
    EN: {
      eyebrow: "SECURITY OPTION",
      title: "See Your Whole Home From Your Phone, Even When You're Away",
      lead:
        "This is not about buying a CCTV and a smart lock separately. Weet plans the entrance, window side, night lighting, and alert rules together so you can check access and surroundings of a far-off second home right from your phone.",
      imageAlt: "Photorealistic CCTV, motion-sensor light, and smart lock detail on a Korean modular second-home entrance",
      problemTitle: "The moment you worry most when the house is empty",
      problem:
        "Weekend houses, vacation homes, and remote cabins cannot always have family staying. Without access logs or night lighting, small signs can become big worries.",
      fitTitle: "Recommended setups",
      fit: ["Second homes used only on weekends", "Remote cabins in the mountains or by the sea", "A countryside home where parents live apart", "Weekend houses often left empty for long stretches"],
      includedTitle: "Scope",
      included: ["CCTV position based on entrance and window blind spots", "Smart-lock permissions and one-time access rules", "Motion-sensor light brightness and night coverage planning", "Alert scope for the owner and permission sharing across family"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["How to split access for the owner, family, and visitors", "Which areas need recording and which need privacy protection", "Who receives night alerts and which situations require checks", "How to supplement storage and alerts during connectivity failures"],
      outcomesTitle: "What changes after setup",
      outcomes: ["Check the entrance and surroundings at night, right from your phone.", "Keep access flow recorded for family and visitors.", "Reduce blind spots by aligning motion-sensor lights and cameras.", "Respond to loss, damage, or unauthorized access with records, not guesswork."],
      ctaPrimary: "Check security in order options",
      ctaSecondary: "Discuss security options",
    },
    ES: {
      eyebrow: "SECURITY OPTION",
      title: "Vea Toda Su Casa Desde El Móvil, Aunque Esté Lejos",
      lead:
        "No se trata de comprar por separado una cámara CCTV y una cerradura inteligente. Weet planifica en conjunto la entrada, el lateral de las ventanas, la iluminación nocturna y las reglas de alerta para que pueda verificar el acceso y los alrededores de una segunda vivienda lejana desde su propio móvil.",
      imageAlt: "Imagen fotorrealista del detalle de CCTV, luz con sensor de movimiento y cerradura inteligente en la entrada de una segunda vivienda modular coreana",
      problemTitle: "El momento de mayor preocupación cuando la casa está vacía",
      problem:
        "Las casas de fin de semana, las casas de campo y las cabañas remotas no siempre pueden tener a la familia presente. Sin registros de acceso ni iluminación nocturna, las pequeñas señales pueden convertirse en grandes preocupaciones.",
      fitTitle: "Configuraciones recomendadas",
      fit: ["Segundas viviendas usadas solo los fines de semana", "Cabañas remotas en la montaña o junto al mar", "Una casa rural donde los padres viven aparte", "Casas de fin de semana que a menudo quedan vacías largo tiempo"],
      includedTitle: "Alcance",
      included: ["Posición de CCTV según los puntos ciegos de entrada y ventanas", "Permisos de cerradura inteligente y reglas de acceso de un solo uso", "Planificación del brillo de las luces con sensor de movimiento y la cobertura nocturna", "Alcance de alertas para el propietario y reparto de permisos entre la familia"],
      decisionsTitle: "Decisiones durante la consulta",
      decisions: ["Cómo dividir el acceso para el propietario, la familia y las visitas", "Qué áreas necesitan grabación y cuáles requieren protección de la privacidad", "Quién recibe las alertas nocturnas y qué situaciones requieren comprobación", "Cómo complementar el almacenamiento y las alertas durante fallos de conectividad"],
      outcomesTitle: "Qué cambia tras la instalación",
      outcomes: ["Verifique la entrada y los alrededores por la noche, directamente desde el móvil.", "Mantenga el flujo de acceso registrado para la familia y las visitas.", "Reduzca los puntos ciegos alineando las luces con sensor de movimiento y las cámaras.", "Responda a pérdidas, daños o accesos no autorizados con registros, no con suposiciones."],
      ctaPrimary: "Ver seguridad en las opciones de pedido",
      ctaSecondary: "Consultar opciones de seguridad",
    },
  },
};

export default function CCTVSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
