const TYPE_LABELS = {
  leche: "Leche",
  maiz: "Maíz",
  gasto: "Gasto",
  inventario: "Inventario",
  mantenimiento: "Mantenimiento"
};

function countByType(activities) {
  return activities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1;
    return acc;
  }, {});
}

function drawActivityChart(activities) {
  const canvas = document.querySelector("#activityChart");
  const ctx = canvas.getContext("2d");
  const counts = countByType(activities);
  const entries = Object.entries(TYPE_LABELS).map(([key, label]) => ({
    key,
    label,
    value: counts[key] || 0
  }));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "15px system-ui";
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--muted");

  if (activities.length === 0) {
    ctx.fillText("Sin datos para graficar. Carga datos de prueba o registra actividades.", 24, 160);
    return;
  }

  const max = Math.max(...entries.map((entry) => entry.value), 1);
  const startX = 150;
  const startY = 42;
  const barHeight = 32;
  const gap = 22;
  const maxWidth = 310;

  entries.forEach((entry, index) => {
    const y = startY + index * (barHeight + gap);
    const width = (entry.value / max) * maxWidth;
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--muted");
    ctx.fillText(entry.label, 22, y + 22);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--primary");
    ctx.fillRect(startX, y, width, barHeight);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text");
    ctx.fillText(String(entry.value), startX + width + 12, y + 22);
  });
}
