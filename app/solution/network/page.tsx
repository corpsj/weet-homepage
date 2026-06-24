"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "network",
  href: "/solution/network",
  image: "/images/solution/generated/kr-network-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "NETWORK OPTION",
      title: "어디서나 끊김 없이",
      lead:
        "산속이나 외진 부지의 세컨하우스라도 인터넷은 더 이상 변수가 아닙니다. 집 전체를 덮는 와이파이에 위성·LTE 백업까지 더해 영상통화와 스트리밍이 어느 방에서든 끊기지 않습니다.",
      imageAlt: "한국 산속 세컨하우스 내부의 와이파이 라우터와 통신함 실사 이미지",
      problemTitle: "외진 곳일수록 연결이 불안합니다",
      problem:
        "전망 좋은 산지나 한적한 시골 부지일수록 통신 품질이 흔들리기 쉽습니다. 거실에선 잘 되던 와이파이가 안방이나 다락에서 끊기면 영상통화도, 원격근무도 답답해집니다.",
      fitTitle: "이런 분께 맞습니다",
      fit: ["산속·외진 부지에 짓는 세컨하우스", "주말마다 가족과 머무는 주말주택", "영상통화로 가족과 자주 연결하는 별장", "원격근무와 스트리밍을 함께 쓰는 거주자"],
      includedTitle: "구성 범위",
      included: ["집 전체를 덮는 와이파이 커버리지 설계", "라우터와 통신함 위치 및 전원 계획", "위성·LTE 백업 회선 조합 검토", "끊김 발생 시 자동 전환과 알림 방식 정리"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["유선 회선 가능 여부와 위성·LTE 보완 필요성", "영상통화·원격근무를 어느 공간에서 주로 쓸지", "와이파이를 어느 방까지 균일하게 닿게 할지", "스트리밍·원격근무 중 어느 쪽 속도를 우선할지"],
      outcomesTitle: "완공 후 달라지는 점",
      outcomes: ["가족 영상통화와 스트리밍이 방마다 끊김 없이 이어집니다.", "회선 경로가 정리되어 끊김 원인을 빠르게 찾습니다.", "통신함과 배선이 노출되지 않아 집의 완성도가 유지됩니다.", "휴대폰 앱으로 집 안 연결 상태를 어디서든 확인할 수 있습니다."],
      ctaPrimary: "주문 옵션에서 연결 확인",
      ctaSecondary: "네트워크 옵션 문의",
    },
    EN: {
      eyebrow: "NETWORK OPTION",
      title: "Connected Everywhere, Always",
      lead:
        "Even a second home tucked deep in the mountains no longer has to worry about the internet. Whole-home Wi-Fi backed by satellite and LTE keeps video calls and streaming smooth in every room.",
      imageAlt: "Photorealistic Wi-Fi router and network cabinet inside a Korean mountain second home",
      problemTitle: "Remote sites are where connections falter",
      problem:
        "The more scenic the mountain plot or the quieter the rural site, the easier it is for signal quality to waver. When Wi-Fi that works in the living room drops in the bedroom or the loft, video calls and remote work quickly become frustrating.",
      fitTitle: "A good fit for",
      fit: ["Second homes built on remote mountain plots", "Weekend homes where the family stays often", "Vacation houses with frequent family video calls", "Residents who mix remote work with streaming"],
      includedTitle: "Scope",
      included: ["Whole-home Wi-Fi coverage design", "Router, network cabinet, and power placement", "Satellite and LTE backup line review", "Automatic failover and alert method planning"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["Whether a wired line is possible and satellite/LTE backup is needed", "Which rooms will host most video calls and remote work", "How evenly Wi-Fi should reach the farthest rooms", "Whether streaming or remote-work speed takes priority"],
      outcomesTitle: "What changes after completion",
      outcomes: ["Family video calls and streaming run smoothly room to room.", "Tidy line paths make it quick to trace any dropout.", "Network boxes and cables stay hidden, keeping the home polished.", "A phone app lets you check the home's connection status from anywhere."],
      ctaPrimary: "Check connection in order options",
      ctaSecondary: "Discuss network conditions",
    },
    ES: {
      eyebrow: "NETWORK OPTION",
      title: "Conectado En Todas Partes, Siempre",
      lead:
        "Ni siquiera una segunda residencia en plena montaña tiene que preocuparse ya por el internet. Un Wi-Fi que cubre toda la casa, respaldado por satélite y LTE, mantiene fluidas las videollamadas y el streaming en cada habitación.",
      imageAlt: "Imagen fotorrealista de router Wi-Fi y armario de red dentro de una segunda residencia coreana de montaña",
      problemTitle: "Cuanto más remoto, más falla la conexión",
      problem:
        "Cuanto más espectacular es la parcela de montaña o más tranquilo el terreno rural, más fácil es que la calidad de la señal flaquee. Cuando el Wi-Fi que funciona en el salón se cae en el dormitorio o el altillo, las videollamadas y el trabajo remoto se vuelven frustrantes.",
      fitTitle: "Ideal para",
      fit: ["Segundas residencias en parcelas de montaña remotas", "Casas de fin de semana donde la familia se queda a menudo", "Casas de vacaciones con frecuentes videollamadas familiares", "Residentes que combinan el trabajo remoto con el streaming"],
      includedTitle: "Alcance",
      included: ["Diseño de cobertura Wi-Fi para toda la casa", "Ubicación de router, armario de red y alimentación", "Revisión de línea de respaldo por satélite y LTE", "Planificación de conmutación automática y método de alertas"],
      decisionsTitle: "Decisiones durante la consulta",
      decisions: ["Si es posible una línea cableada y si se necesita respaldo por satélite/LTE", "En qué habitaciones se harán la mayoría de videollamadas y trabajo remoto", "Con qué uniformidad debe llegar el Wi-Fi a las habitaciones más alejadas", "Si tiene prioridad la velocidad del streaming o la del trabajo remoto"],
      outcomesTitle: "Lo que cambia tras la finalización",
      outcomes: ["Las videollamadas familiares y el streaming fluyen sin cortes de una habitación a otra.", "Las rutas de línea ordenadas permiten rastrear rápidamente cualquier corte.", "Los armarios de red y los cables quedan ocultos, manteniendo la casa impecable.", "Una app del móvil te permite consultar el estado de conexión de la casa desde cualquier lugar."],
      ctaPrimary: "Ver conexión en las opciones de pedido",
      ctaSecondary: "Consultar condiciones de red",
    },
  },
};

export default function NetworkSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
