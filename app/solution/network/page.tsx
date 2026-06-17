"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "network",
  href: "/solution/network",
  image: "/images/solution/generated/kr-network-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "STABLE CONNECTION OPTION",
      title: "결제와 예약이 끊기지 않게",
      lead:
        "모듈러 상업공간의 인터넷은 단순 Wi-Fi가 아닙니다. 카드 결제, 예약 확인, CCTV, 원격 제어가 같은 회선에 몰리지 않도록 운영망을 목적별로 나눕니다.",
      imageAlt: "한국 도로변 모듈러 카페 내부의 POS, 라우터, 통신함 실사 이미지",
      problemTitle: "연결 실패는 바로 매출 손실입니다",
      problem:
        "국도변, 산지, 관광지 입구처럼 입지가 좋아도 통신 품질이 흔들리면 결제와 예약 확인이 멈춥니다. 고객용 Wi-Fi와 운영 장비가 같은 망에 묶이면 장애 원인도 찾기 어렵습니다.",
      fitTitle: "추천 구성",
      fit: ["카드 결제가 많은 카페와 팝업스토어", "예약 확인이 필요한 독채 숙박", "CCTV와 원격 제어를 함께 쓰는 무인 공간", "업무망과 고객망을 분리해야 하는 워크스페이스"],
      includedTitle: "구성 범위",
      included: ["POS, 업무, 게스트, 장비망 분리 기준 제안", "라우터와 통신함 위치 및 전원 계획", "유선/무선/셀룰러 회선 조합 검토", "장애 시 백업 회선과 알림 방식 정리"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["유선 회선 가능 여부와 LTE/5G 보완 필요성", "POS와 예약 시스템이 어느 망에 연결될지", "고객 Wi-Fi 제공 범위와 속도 제한을 어떻게 둘지", "CCTV, 스마트락, 원격 제어 장비의 우선순위를 어떻게 나눌지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["결제와 예약 확인이 고객 Wi-Fi 트래픽에 덜 흔들립니다.", "장비마다 연결 경로가 정리되어 장애 대응이 빨라집니다.", "통신함과 배선이 노출되지 않아 공간 완성도가 유지됩니다.", "원격 상태 패널로 핵심 장비 상태를 확인하기 쉬워집니다."],
      ctaPrimary: "주문 옵션에서 연결 확인",
      ctaSecondary: "네트워크 옵션 문의",
    },
    EN: {
      eyebrow: "STABLE CONNECTION OPTION",
      title: "Keep Payment And Booking Online",
      lead:
        "Connectivity in a modular commercial space is more than Wi-Fi. Payment, booking, CCTV, and remote control are separated so the operating network fits the purpose of the space.",
      imageAlt: "Photorealistic POS, router, and network cabinet inside a Korean roadside modular cafe",
      problemTitle: "Connection failure becomes revenue loss",
      problem:
        "Even a strong location can fail operationally if connectivity is unstable. When guest Wi-Fi and operation devices share one network, failures are harder to diagnose.",
      fitTitle: "Recommended setups",
      fit: ["Cafes and pop-up stores with card payments", "Private stays needing booking checks", "Unmanned spaces using CCTV and remote control", "Workspaces separating work and guest networks"],
      includedTitle: "Scope",
      included: ["POS, work, guest, and device network separation", "Router, network cabinet, and power placement", "Wired, wireless, and cellular line review", "Backup-line and alert method planning"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["Whether a wired line is possible and cellular backup is needed", "Which network connects POS and booking systems", "How far guest Wi-Fi should reach and whether speed limits are needed", "How to prioritize CCTV, smart locks, and remote-control devices"],
      outcomesTitle: "Operational outcomes",
      outcomes: ["Payments and booking checks are less affected by guest traffic.", "Device connection paths are clearer, speeding up troubleshooting.", "Network boxes and cables stay clean within the finished space.", "Operators can check critical device status from the control panel."],
      ctaPrimary: "Check connection in order options",
      ctaSecondary: "Discuss network conditions",
    },
    ES: {
      eyebrow: "STABLE CONNECTION OPTION",
      title: "Mantenga El Pago Y La Reserva En Línea",
      lead:
        "La conectividad en un espacio comercial modular es más que Wi-Fi. El pago, la reserva, el CCTV y el control remoto se separan para que la red operativa se adapte al propósito del espacio.",
      imageAlt: "Imagen fotorrealista de TPV, router y armario de red dentro de una cafetería modular coreana a pie de carretera",
      problemTitle: "Un fallo de conexión se convierte en pérdida de ingresos",
      problem:
        "Incluso una buena ubicación puede fallar operativamente si la conectividad es inestable. Cuando el Wi-Fi de invitados y los dispositivos de operación comparten una sola red, los fallos son más difíciles de diagnosticar.",
      fitTitle: "Configuraciones recomendadas",
      fit: ["Cafeterías y tiendas pop-up con pagos con tarjeta", "Estancias privadas que necesitan verificación de reservas", "Espacios sin personal que usan CCTV y control remoto", "Espacios de trabajo que separan las redes de trabajo y de invitados"],
      includedTitle: "Alcance",
      included: ["Separación de redes TPV, trabajo, invitados y dispositivos", "Ubicación de router, armario de red y alimentación", "Revisión de líneas cableadas, inalámbricas y celulares", "Planificación de línea de respaldo y método de alertas"],
      decisionsTitle: "Decisiones durante la consulta",
      decisions: ["Si es posible una línea cableada y si se necesita respaldo celular", "Qué red conecta los sistemas de TPV y reservas", "Hasta dónde debe llegar el Wi-Fi de invitados y si se necesitan límites de velocidad", "Cómo priorizar los dispositivos de CCTV, cerraduras inteligentes y control remoto"],
      outcomesTitle: "Resultados operativos",
      outcomes: ["Los pagos y las verificaciones de reservas se ven menos afectados por el tráfico de invitados.", "Las rutas de conexión de los dispositivos son más claras, agilizando la resolución de problemas.", "Los armarios de red y los cables se mantienen limpios dentro del espacio terminado.", "Los operadores pueden comprobar el estado de los dispositivos críticos desde el panel de control."],
      ctaPrimary: "Ver conexión en las opciones de pedido",
      ctaSecondary: "Consultar condiciones de red",
    },
  },
};

export default function NetworkSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
