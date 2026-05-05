const SEED_ACTIVITIES = [
  {
    id: crypto.randomUUID(),
    type: "leche",
    name: "Ordeño de la mañana",
    quantity: 42,
    unit: "litros",
    date: "2026-05-01",
    responsible: "María",
    note: "Producción estable del lote A."
  },
  {
    id: crypto.randomUUID(),
    type: "maiz",
    name: "Cosecha parcela norte",
    quantity: 180,
    unit: "kilos",
    date: "2026-05-02",
    responsible: "Juan",
    note: "Se requiere revisar humedad del grano."
  },
  {
    id: crypto.randomUUID(),
    type: "gasto",
    name: "Compra de concentrado",
    quantity: 95000,
    unit: "pesos",
    date: "2026-05-03",
    responsible: "Laura",
    note: "Compra para alimentación semanal."
  },
  {
    id: crypto.randomUUID(),
    type: "inventario",
    name: "Bultos de abono disponibles",
    quantity: 12,
    unit: "unidades",
    date: "2026-05-04",
    responsible: "Camilo",
    note: "Inventario revisado antes de la siembra."
  },
  {
    id: crypto.randomUUID(),
    type: "mantenimiento",
    name: "Revisión de motobomba",
    quantity: 2,
    unit: "horas",
    date: "2026-05-05",
    responsible: "Sofía",
    note: "Se limpió filtro de entrada."
  }
];
