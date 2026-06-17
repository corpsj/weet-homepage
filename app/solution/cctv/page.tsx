"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "security",
  href: "/solution/cctv",
  image: "/images/solution/generated/kr-security-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "SECURE ACCESS OPTION",
      title: "무인 운영도 안심되게",
      lead:
        "CCTV와 도어락을 따로 사는 문제가 아닙니다. Weet는 현관, 창측, 야간 조명, 알림 기준을 한 번에 설계해 운영자가 멀리 있어도 확인 가능한 출입 흐름을 만듭니다.",
      imageAlt: "한국 전원 모듈러 공간 현관에 설치된 CCTV, 센서등, 스마트 도어락 실사 이미지",
      problemTitle: "운영자가 가장 불안해하는 순간",
      problem:
        "외곽 부지, 무인 카페, 독채 스테이는 사람이 늘 상주하기 어렵습니다. 출입 기록이 없거나 야간 조명이 부족하면 작은 이상 징후도 큰 운영 리스크가 됩니다.",
      fitTitle: "추천 구성",
      fit: ["무인 카페와 예약제 쇼룸", "외곽 독채 스테이와 주말 주택", "야간 관리가 필요한 워크스페이스", "장비와 재고가 보관되는 소형 상업공간"],
      includedTitle: "구성 범위",
      included: ["현관과 창측 사각지대 기준 CCTV 위치 제안", "스마트 도어락 권한과 일회성 출입 방식 정리", "센서등 밝기와 야간 점등 범위 계획", "운영자가 받을 알림 범위와 대응자 지정"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["운영자, 직원, 고객, 정비 담당자의 출입 권한을 어떻게 나눌지", "촬영이 필요한 구역과 사생활 보호가 필요한 구역을 어디까지 나눌지", "야간 알림을 누가 받고 어떤 상황에서 확인할지", "통신 장애 시 저장과 알림을 어떤 방식으로 보완할지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["밤에도 현관과 주변 상태를 바로 확인할 수 있습니다.", "예약 고객, 직원, 정비 담당자의 출입 흐름이 기록으로 남습니다.", "조명과 카메라 위치가 겹쳐 사각지대가 줄어듭니다.", "분실, 파손, 무단출입 대응이 감이 아니라 기록 중심으로 바뀝니다."],
      ctaPrimary: "주문 옵션에서 보안 확인",
      ctaSecondary: "보안 옵션 문의",
    },
    EN: {
      eyebrow: "SECURE ACCESS OPTION",
      title: "Make Unmanned Operation Feel Safe",
      lead:
        "This is not about buying a CCTV and a smart lock separately. Weet plans the entrance, window side, night lighting, and alert rules together so operators can verify access remotely.",
      imageAlt: "Photorealistic CCTV, sensor light, and smart lock detail on a Korean modular space entrance",
      problemTitle: "The moment operators worry most",
      problem:
        "Unmanned cafes, private stays, and remote weekend houses cannot always be staffed. Without access logs or night lighting, small signs can become large operating risks.",
      fitTitle: "Recommended setups",
      fit: ["Unmanned cafes and reservation showrooms", "Private stays and weekend houses", "Workspaces needing night checks", "Small commercial spaces storing equipment or stock"],
      includedTitle: "Scope",
      included: ["CCTV position based on entrance and window blind spots", "Smart-lock permissions and one-time access rules", "Sensor-light brightness and night coverage planning", "Alert scope and response-owner setup"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["How to split access for operators, staff, guests, and maintenance teams", "Which areas need recording and which need privacy protection", "Who receives night alerts and which situations require checks", "How to supplement storage and alerts during connectivity failures"],
      outcomesTitle: "Operational outcomes",
      outcomes: ["Check the entrance and surroundings at night.", "Keep access flow recorded for guests, staff, and maintenance.", "Reduce blind spots by aligning lights and cameras.", "Respond to loss, damage, or unauthorized access with records, not guesswork."],
      ctaPrimary: "Check security in order options",
      ctaSecondary: "Discuss security options",
    },
    ES: {
      eyebrow: "SECURE ACCESS OPTION",
      title: "Que La Operación Sin Personal Inspire Confianza",
      lead:
        "No se trata de comprar por separado una cámara CCTV y una cerradura inteligente. Weet planifica en conjunto la entrada, el lateral de las ventanas, la iluminación nocturna y las reglas de alerta para que los operadores puedan verificar el acceso de forma remota.",
      imageAlt: "Imagen fotorrealista del detalle de CCTV, luz con sensor y cerradura inteligente en la entrada de un espacio modular coreano",
      problemTitle: "El momento que más preocupa a los operadores",
      problem:
        "Las cafeterías sin personal, las estancias privadas y las casas de fin de semana remotas no siempre pueden contar con personal. Sin registros de acceso ni iluminación nocturna, las pequeñas señales pueden convertirse en grandes riesgos operativos.",
      fitTitle: "Configuraciones recomendadas",
      fit: ["Cafeterías sin personal y showrooms con reserva", "Estancias privadas y casas de fin de semana", "Espacios de trabajo que requieren controles nocturnos", "Pequeños espacios comerciales que almacenan equipos o existencias"],
      includedTitle: "Alcance",
      included: ["Posición de CCTV según los puntos ciegos de entrada y ventanas", "Permisos de cerradura inteligente y reglas de acceso de un solo uso", "Planificación del brillo de las luces con sensor y la cobertura nocturna", "Configuración del alcance de alertas y del responsable de respuesta"],
      decisionsTitle: "Decisiones durante la consulta",
      decisions: ["Cómo dividir el acceso para operadores, personal, huéspedes y equipos de mantenimiento", "Qué áreas necesitan grabación y cuáles requieren protección de la privacidad", "Quién recibe las alertas nocturnas y qué situaciones requieren comprobación", "Cómo complementar el almacenamiento y las alertas durante fallos de conectividad"],
      outcomesTitle: "Resultados operativos",
      outcomes: ["Verifique la entrada y los alrededores durante la noche.", "Mantenga el flujo de acceso registrado para huéspedes, personal y mantenimiento.", "Reduzca los puntos ciegos alineando luces y cámaras.", "Responda a pérdidas, daños o accesos no autorizados con registros, no con suposiciones."],
      ctaPrimary: "Ver seguridad en las opciones de pedido",
      ctaSecondary: "Consultar opciones de seguridad",
    },
  },
};

export default function CCTVSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
