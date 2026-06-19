"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "control",
  href: "/solution/iot",
  image: "/images/solution/generated/kr-control-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "IOT OPTION",
      title: "알아서 준비되는 집",
      lead:
        "도착 시간에 맞춰 조명·냉난방·환기가 미리 켜지도록 설계합니다. IoT는 화려한 기능이 아니라, 문을 열면 이미 쾌적한 집을 만드는 자동화 레이어입니다.",
      imageAlt: "한국형 모듈러 실내 벽면 스마트 스위치와 제어 패널 실사 이미지",
      problemTitle: "도착하면 늘 처음부터 시작합니다",
      problem:
        "세컨하우스, 주말주택, 별장은 가족이 도착한 뒤에야 냉난방을 켜고, 온도를 맞추고, 환기를 시작합니다. 매번 처음부터 데우고 식히다 보면 가장 좋은 시간을 추위와 더위에 양보하게 됩니다.",
      fitTitle: "추천 구성",
      fit: ["도착 전 온도 준비가 필요한 세컨하우스", "주말마다 다녀오는 주말주택", "오래 비워 두는 가족 별장", "퇴근·외출 후 집을 미리 데우고 싶은 집"],
      includedTitle: "구성 범위",
      included: ["스마트 스위치와 온도 제어 패널 위치 계획", "도착 전 냉난방과 환기 스케줄 정리", "도어락, 조명, 공조 음성·앱 제어 연동 범위", "도착 시간과 외출 상태 기준 자동화 구성"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["도착 몇 시간 전부터 집을 데우거나 식힐지", "조명, 냉난방, 환기 중 어떤 장비를 자동화할지", "음성·앱으로 직접 제어할 동작과 알아서 처리할 동작을 어떻게 나눌지", "가족 누구나 다룰 범위와 평소 자동으로 둘 범위를 어디까지 둘지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["도착 전에 집 온도와 조명을 미리 맞춰 둘 수 있습니다.", "현관에서 음성·앱으로 문 잠금과 공조 상태를 바로 확인합니다.", "빈집을 종일 켜 두지 않아 에너지 낭비를 줄입니다.", "오는 시간에 맞춰 집을 늘 일정한 상태로 유지합니다."],
      ctaPrimary: "주문 옵션에서 IoT 구성 확인",
      ctaSecondary: "IoT 옵션 문의",
    },
    EN: {
      eyebrow: "IOT OPTION",
      title: "A Home That Gets Itself Ready",
      lead:
        "Lighting, HVAC, and ventilation can switch on ahead of your arrival. IoT isn't a flashy feature; it's the automation layer that makes the home comfortable the moment you open the door.",
      imageAlt: "Photorealistic smart switches and control panels inside a Korean modular interior",
      problemTitle: "You always start from scratch on arrival",
      problem:
        "Second homes, weekend houses, and cabins only start heating, settling the temperature, and venting after the family arrives. Reheating and recooling each time hands your best hours over to the cold and the heat.",
      fitTitle: "Recommended setups",
      fit: ["Second homes needing pre-arrival temperature control", "Weekend houses visited every weekend", "Family cabins left empty for long stretches", "Homes you want warmed before you get back from work or errands"],
      includedTitle: "Scope",
      included: ["Smart-switch and temperature-panel placement", "Pre-arrival HVAC and ventilation schedule", "Door lock, lighting, and HVAC voice and app control links", "Automation based on arrival time and away status"],
      decisionsTitle: "Decisions during consultation",
      decisions: ["How many hours before arrival to start warming or cooling the home", "Which devices to automate: lighting, HVAC, ventilation", "Which actions you control by voice or app and which run on their own", "What anyone in the family can operate versus what stays automatic"],
      outcomesTitle: "What changes once it's in",
      outcomes: ["Set the home's temperature and lighting before you arrive.", "Check the lock and HVAC status by voice or app right at the door.", "Cut wasted energy by not leaving an empty home running all day.", "Keep the home in a consistent state, timed to when you're coming."],
      ctaPrimary: "Check the IoT setup in order options",
      ctaSecondary: "Ask about the IoT option",
    },
    ES: {
      eyebrow: "IOT OPTION",
      title: "Una Casa Que Se Prepara Sola",
      lead:
        "La iluminación, la climatización y la ventilación pueden encenderse antes de tu llegada. IoT no es una función vistosa; es la capa de automatización que hace que la casa esté cómoda en cuanto abres la puerta.",
      imageAlt: "Imagen fotorrealista de interruptores inteligentes y paneles de control dentro de un interior modular coreano",
      problemTitle: "Al llegar siempre empiezas desde cero",
      problem:
        "Las segundas residencias, las casas de fin de semana y las cabañas solo empiezan a calentar, ajustar la temperatura y ventilar después de que llega la familia. Recalentar y enfriar cada vez entrega tus mejores horas al frío y al calor.",
      fitTitle: "Configuraciones recomendadas",
      fit: ["Segundas residencias que necesitan control de temperatura previo a la llegada", "Casas de fin de semana que se visitan cada semana", "Cabañas familiares que quedan vacías durante largos periodos", "Casas que quieres caldear antes de volver del trabajo o de hacer recados"],
      includedTitle: "Alcance",
      included: ["Ubicación de interruptores inteligentes y paneles de temperatura", "Programación de climatización y ventilación previa a la llegada", "Control por voz y app de cerradura, iluminación y climatización", "Automatización basada en la hora de llegada y el estado de ausencia"],
      decisionsTitle: "Decisiones durante la consulta",
      decisions: ["Cuántas horas antes de la llegada empezar a caldear o enfriar la casa", "Qué dispositivos automatizar: iluminación, climatización, ventilación", "Qué acciones controlas por voz o app y cuáles funcionan solas", "Qué puede manejar cualquier miembro de la familia frente a lo que queda automático"],
      outcomesTitle: "Qué cambia una vez instalado",
      outcomes: ["Ajusta la temperatura y la iluminación de la casa antes de llegar.", "Comprueba el estado de la cerradura y la climatización por voz o app desde la puerta.", "Reduce la energía desperdiciada al no dejar una casa vacía encendida todo el día.", "Mantén la casa en un estado constante, sincronizado con tu llegada."],
      ctaPrimary: "Ver la configuración IoT en las opciones de pedido",
      ctaSecondary: "Consultar la opción IoT",
    },
  },
};

export default function IOTSolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
