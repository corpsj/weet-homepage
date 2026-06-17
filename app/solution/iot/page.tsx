"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "control",
  href: "/solution/iot",
  image: "/images/solution/generated/kr-control-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "REMOTE READY OPTION",
      title: "원격으로 준비되는 공간",
      lead:
        "입실 전 냉난방, 조명, 환기, 잠금 상태를 수동으로 반복 확인하지 않도록 설계합니다. 원격 제어는 편의 기능이 아니라 운영 시간을 줄이는 제어 레이어입니다.",
      imageAlt: "한국형 모듈러 실내 벽면 스마트 스위치와 제어 패널 실사 이미지",
      problemTitle: "작은 방문이 계속 누적됩니다",
      problem:
        "예약제 숙박, 무인 쇼룸, 주말 주택은 고객이 오기 전 공간을 켜고, 맞추고, 잠그는 일이 반복됩니다. 이 과정을 수동 확인에만 의존하면 운영 시간이 계속 새어 나갑니다.",
      fitTitle: "추천 구성",
      fit: ["입실 전 온도 준비가 필요한 독채 숙박", "예약제로 운영되는 체험 공간", "운영자가 멀리 있는 주말 주택", "조명과 환기 상태가 중요한 쇼룸"],
      includedTitle: "구성 범위",
      included: ["스마트 스위치와 온도 제어 패널 위치 계획", "입실 전 냉난방과 환기 스케줄 정리", "도어락, 조명, 공조 알림 연동 범위", "운영 시간과 예약 시간 기준 자동화 구성"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["입실 몇 시간 전부터 공간을 준비해야 하는지", "조명, 냉난방, 환기 중 어떤 장비를 원격화할지", "운영자가 직접 확인할 알림과 자동으로 처리할 동작을 어떻게 나눌지", "고객이 조작할 수 있는 범위와 운영자만 제어할 범위를 어디까지 둘지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["고객 도착 전 공간 온도와 조명을 미리 맞출 수 있습니다.", "반복 방문 없이 문 잠금과 공조 상태를 확인합니다.", "에너지 낭비와 운영자의 이동 시간을 줄입니다.", "예약 시간에 따라 공간 상태를 더 일정하게 유지합니다."],
      ctaPrimary: "주문 옵션에서 원격 준비 확인",
      ctaSecondary: "제어 옵션 문의",
    },
    EN: {
      eyebrow: "REMOTE READY OPTION",
      title: "Prepare The Space Without Visiting",
      lead:
        "HVAC, lighting, ventilation, and lock status can be checked before guests arrive. Remote control is not just convenience; it reduces operating time.",
      imageAlt: "Photorealistic smart switches and control panels inside a Korean modular interior",
      problemTitle: "Small visits add up",
      problem:
        "Reservation-based stays, unmanned showrooms, and weekend houses repeatedly need the space turned on, adjusted, and locked. Relying on manual checks leaks operating time.",
      fitTitle: "Recommended setups",
      fit: ["Private stays needing pre-arrival temperature control", "Reservation-based experience rooms", "Weekend houses managed remotely", "Showrooms where lighting and ventilation matter"],
      includedTitle: "Scope",
      included: ["Smart-switch and temperature-panel placement", "Pre-arrival HVAC and ventilation schedule", "Door lock, lighting, and HVAC alert links", "Automation based on operating and booking hours"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["How many hours before arrival the space should be prepared", "Which devices need remote control: lighting, HVAC, ventilation", "Which alerts require operator confirmation and which actions can be automatic", "What guests can control versus what only operators can control"],
      outcomesTitle: "Operational outcomes",
      outcomes: ["Set temperature and lighting before guests arrive.", "Check lock and HVAC status without repeated visits.", "Reduce wasted energy and operator travel time.", "Keep the space state more consistent across booking times."],
      ctaPrimary: "Check remote readiness in order options",
      ctaSecondary: "Discuss operating workflow",
    },
    ES: {
      eyebrow: "REMOTE READY OPTION",
      title: "Prepare El Espacio Sin Desplazarse",
      lead:
        "El estado de la climatización, la iluminación, la ventilación y la cerradura puede comprobarse antes de que lleguen los huéspedes. El control remoto no es solo comodidad; reduce el tiempo de operación.",
      imageAlt: "Imagen fotorrealista de interruptores inteligentes y paneles de control dentro de un interior modular coreano",
      problemTitle: "Las pequeñas visitas se acumulan",
      problem:
        "Las estancias con reserva, los showrooms sin personal y las casas de fin de semana necesitan encender, ajustar y cerrar el espacio una y otra vez. Depender de comprobaciones manuales hace que se pierda tiempo de operación.",
      fitTitle: "Configuraciones recomendadas",
      fit: ["Estancias privadas que necesitan control de temperatura previo a la llegada", "Salas de experiencia con reserva", "Casas de fin de semana gestionadas en remoto", "Showrooms donde la iluminación y la ventilación importan"],
      includedTitle: "Alcance",
      included: ["Ubicación de interruptores inteligentes y paneles de temperatura", "Programación de climatización y ventilación previa a la llegada", "Vínculos de alerta de cerradura, iluminación y climatización", "Automatización basada en horarios de operación y de reserva"],
      decisionsTitle: "Decisiones durante la consulta",
      decisions: ["Cuántas horas antes de la llegada debe prepararse el espacio", "Qué dispositivos necesitan control remoto: iluminación, climatización, ventilación", "Qué alertas requieren confirmación del operador y qué acciones pueden ser automáticas", "Qué pueden controlar los huéspedes frente a lo que solo controlan los operadores"],
      outcomesTitle: "Resultados operativos",
      outcomes: ["Ajuste la temperatura y la iluminación antes de que lleguen los huéspedes.", "Compruebe el estado de la cerradura y la climatización sin visitas repetidas.", "Reduzca la energía desperdiciada y el tiempo de desplazamiento del operador.", "Mantenga el estado del espacio más constante en los distintos horarios de reserva."],
      ctaPrimary: "Ver preparación remota en las opciones de pedido",
      ctaSecondary: "Consultar el flujo de operación",
    },
  },
};

export default function IOTSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
