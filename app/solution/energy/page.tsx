"use client";

import SolutionTemplate, { type SolutionPackageData } from "@/components/solution/SolutionTemplate";

const DATA: SolutionPackageData = {
  id: "energy",
  href: "/solution/energy",
  image: "/images/solution/generated/kr-energy-realphoto.webp",
  copy: {
    KO: {
      eyebrow: "ENERGY OPTION",
      title: "스스로 만드는 전기",
      lead:
        "햇빛으로 전기를 만들고 저장해, 전기요금과 정전 걱정을 줄입니다. 지붕 일체형 태양광, 가정용 ESS, EV 충전기를 한 집의 흐름으로 묶어 정전에도 끄떡없이 살 수 있게 설계합니다.",
      imageAlt: "이동식 세컨하우스 지붕의 태양광 패널과 가정용 전력 장비 실사 이미지",
      problemTitle: "세컨하우스일수록 전기 걱정은 큽니다",
      problem:
        "별장이나 주말주택은 도심에서 멀어 정전이 잦고, 냉난방·온수·조명·전기차 충전이 겹치면 전기요금도 부담입니다. 전력 흐름이 정리되지 않으면 차단기가 내려가고, 가족이 머무는 동안 불편을 겪을 수 있습니다.",
      fitTitle: "추천 구성",
      fit: ["전기차를 충전하며 쉬고 싶은 주말주택", "냉난방을 마음껏 쓰고 싶은 별장", "정전이 잦은 외곽의 세컨하우스", "전기요금을 줄이고 싶은 이동식주택"],
      includedTitle: "구성 범위",
      included: ["지붕 일체형 태양광 패널 방향", "가정용 ESS 용량과 정전 대비 백업 회로", "EV 완속 충전기 위치와 전력 분기", "냉난방, 온수, 조명, 가전 부하 분리 기준"],
      decisionsTitle: "확정할 시스템 값",
      decisions: ["가족이 머무는 동안 하루 전기 사용량을 어느 정도로 볼지", "가정용 ESS를 정전 대비 중심으로 둘지 전기요금 절감 중심으로 둘지", "EV 충전기를 우리 차 전용으로 둘지 손님 차까지 쓸지", "태양광 전기와 꼭 켜둘 회로(냉장고, 난방 등)를 어떤 우선순위로 연결할지"],
      outcomesTitle: "도입 후 달라지는 점",
      outcomes: ["전기요금과 사용량을 더 예측할 수 있습니다.", "정전이 와도 냉장고와 난방 같은 핵심 회로는 ESS로 계속 돌아갑니다.", "태양광과 가정용 ESS가 우리 집 생활 패턴에 맞게 연결됩니다.", "EV 충전과 냉난방을 함께 고려해 전기 걱정이 줄어듭니다."],
      ctaPrimary: "주문 옵션에서 에너지 확인",
      ctaSecondary: "에너지 옵션 문의",
    },
    EN: {
      eyebrow: "ENERGY OPTION",
      title: "Make Your Own Electricity",
      lead:
        "Generate and store power from the sun to ease both your electricity bills and your worry about outages. Roof-integrated solar, a home ESS, and an EV charger are tied into one household flow so your place stays running even when the grid goes down.",
      imageAlt: "Photorealistic solar panels and home power equipment on the roof of a movable second home",
      problemTitle: "A second home worries most about power",
      problem:
        "Weekend homes and cabins sit far from the city, where outages are more common, and bills add up fast when heating, hot water, lighting, and EV charging all run at once. Without a clear power path, breakers trip and your family is left without comfort while you're there.",
      fitTitle: "Recommended configuration",
      fit: ["Weekend homes where you charge the EV and relax", "Cabins where you want heating and cooling freely", "Off-grid second homes prone to outages", "Movable houses where you want to cut the power bill"],
      includedTitle: "Scope",
      included: ["Roof-integrated solar direction", "Home ESS capacity and outage-backup circuits", "EV slow charger position and branch power", "Load separation for heating, hot water, lighting, and appliances"],
      decisionsTitle: "System values to define",
      decisions: ["Expected daily power use while the family is staying", "Whether the home ESS prioritizes outage backup or bill savings", "Whether the EV charger is for your car only or for guests too", "How solar power and must-on circuits (fridge, heating) are prioritized"],
      outcomesTitle: "What changes after install",
      outcomes: ["Your bills and power use become more predictable.", "Even during an outage, essentials like the fridge and heating keep running on the ESS.", "Solar and the home ESS connect to how your household actually lives.", "EV charging and HVAC are planned together, easing power worries."],
      ctaPrimary: "Check energy in order options",
      ctaSecondary: "Ask about energy options",
    },
    ES: {
      eyebrow: "ENERGY OPTION",
      title: "Genere Su Propia Electricidad",
      lead:
        "Genere y almacene energía del sol para reducir tanto su factura de electricidad como su preocupación por los apagones. La energía solar integrada en el techo, un ESS doméstico y un cargador para vehículos eléctricos se unen en un solo flujo del hogar, para que su casa siga funcionando incluso cuando se va la luz.",
      imageAlt: "Imagen fotorrealista de paneles solares y equipos eléctricos domésticos en el techo de una segunda vivienda móvil",
      problemTitle: "Una segunda vivienda es la que más se preocupa por la luz",
      problem:
        "Las casas de fin de semana y las cabañas están lejos de la ciudad, donde los apagones son más frecuentes, y la factura sube rápido cuando la calefacción, el agua caliente, la iluminación y la carga del coche eléctrico funcionan a la vez. Sin una ruta eléctrica clara, saltan los interruptores y su familia se queda sin comodidad mientras está allí.",
      fitTitle: "Configuración recomendada",
      fit: ["Casas de fin de semana donde carga el coche eléctrico y descansa", "Cabañas donde quiere usar la calefacción y el aire libremente", "Segundas viviendas aisladas propensas a los apagones", "Casas móviles donde quiere reducir la factura de la luz"],
      includedTitle: "Alcance",
      included: ["Orientación de la integración solar en el techo", "Capacidad del ESS doméstico y circuitos de respaldo ante apagones", "Posición del cargador EV lento y derivación de energía", "Separación de cargas para calefacción, agua caliente, iluminación y electrodomésticos"],
      decisionsTitle: "Valores del sistema a definir",
      decisions: ["Uso diario de energía previsto mientras la familia se hospeda", "Si el ESS doméstico prioriza el respaldo ante apagones o el ahorro en la factura", "Si el cargador EV es solo para su coche o también para invitados", "Cómo se priorizan la energía solar y los circuitos que deben seguir encendidos (nevera, calefacción)"],
      outcomesTitle: "Lo que cambia tras la instalación",
      outcomes: ["Su factura y su consumo se vuelven más predecibles.", "Incluso durante un apagón, lo esencial como la nevera y la calefacción siguen funcionando con el ESS.", "La energía solar y el ESS doméstico se conectan a cómo vive realmente su hogar.", "La carga del coche eléctrico y la climatización se planifican juntas, reduciendo la preocupación eléctrica."],
      ctaPrimary: "Ver energía en las opciones de pedido",
      ctaSecondary: "Consultar opciones de energía",
    },
  },
};

export default function EnergySolutionPage() {
  return <SolutionTemplate data={DATA} />;
}
