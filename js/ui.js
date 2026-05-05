const elements = {
  form: document.querySelector("#activityForm"),
  tableBody: document.querySelector("#activityTableBody"),
  emptyState: document.querySelector("#emptyState"),
  searchInput: document.querySelector("#searchInput"),
  filterType: document.querySelector("#filterType"),
  metricTotal: document.querySelector("#metricTotal"),
  metricProduction: document.querySelector("#metricProduction"),
  metricExpenses: document.querySelector("#metricExpenses"),
  metricLast: document.querySelector("#metricLast"),
  debugOutput: document.querySelector("#debugOutput"),
  statusDot: document.querySelector("#systemStatusDot"),
  statusTitle: document.querySelector("#systemStatusTitle"),
  statusText: document.querySelector("#systemStatusText")
};

function formatCurrency(value) {
  return new Intl.NumberFormat(APP_CONFIG.currencyLocale, {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function getTypeLabel(type) {
  return TYPE_LABELS[type] || "Otro";
}

function getFormData() {
  return {
    type: document.querySelector("#activityType").value,
    name: document.querySelector("#activityName").value,
    quantity: document.querySelector("#activityQuantity").value,
    unit: document.querySelector("#activityUnit").value,
    date: document.querySelector("#activityDate").value,
    responsible: document.querySelector("#activityResponsible").value,
    note: document.querySelector("#activityNote").value
  };
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((item) => {
    item.textContent = "";
  });
}

function showErrors(errors) {
  clearErrors();
  Object.entries(errors).forEach(([field, message]) => {
    const errorElement = document.querySelector(`[data-error-for="${field}"]`);
    if (errorElement) errorElement.textContent = message;
  });
}

function resetForm() {
  elements.form.reset();
  clearErrors();
}

function getFilteredActivities() {
  const activities = readActivities();
  const search = normalizeText(elements.searchInput.value).toLowerCase();
  const type = elements.filterType.value;

  return activities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(search) ||
      activity.responsible.toLowerCase().includes(search);
    const matchesType = type === "todos" || activity.type === type;
    return matchesSearch && matchesType;
  });
}

function renderTable() {
  const activities = getFilteredActivities();
  elements.tableBody.innerHTML = "";
  elements.emptyState.classList.toggle("hidden", activities.length > 0);

  activities.forEach((activity) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${activity.date}</td>
      <td><span class="badge">${getTypeLabel(activity.type)}</span></td>
      <td>${activity.name}</td>
      <td>${activity.quantity} ${activity.unit}</td>
      <td>${activity.responsible}</td>
      <td><button class="danger-btn" type="button" data-delete-id="${activity.id}">Eliminar</button></td>
    `;
    elements.tableBody.appendChild(row);
  });
}

function updateDashboard() {
  const activities = readActivities();
  const productionTotal = activities
    .filter((activity) => ["leche", "maiz"].includes(activity.type))
    .reduce((sum, activity) => sum + Number(activity.quantity), 0);
  const expenses = activities
    .filter((activity) => activity.type === "gasto")
    .reduce((sum, activity) => sum + Number(activity.quantity), 0);

  elements.metricTotal.textContent = activities.length;
  elements.metricProduction.textContent = productionTotal.toLocaleString("es-CO");
  elements.metricExpenses.textContent = formatCurrency(expenses);
  elements.metricLast.textContent = activities[0]?.name || "Sin datos";
}

function renderApp() {
  renderTable();
  updateDashboard();
  drawActivityChart(readActivities());
}

function setSystemStatus(type, title, text) {
  elements.statusDot.className = "status-dot";
  if (type !== "ok") elements.statusDot.classList.add(type);
  elements.statusTitle.textContent = title;
  elements.statusText.textContent = text;
}

function writeDebugOutput(message) {
  elements.debugOutput.textContent = message;
}
