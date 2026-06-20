function createActivityFromForm(validatedValue) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...validatedValue
  };
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = getFormData();
  const result = validateActivity(formData);

  if (APP_CONFIG.debugMode) {
    console.group("Envío de formulario");
    console.log("Datos capturados:", formData);
    console.log("Resultado de validación:", result);
    console.groupEnd();
  }

  if (!result.isValid) {
    showErrors(result.errors);
    setSystemStatus("warning", "Validación pendiente", "Corrige los campos marcados en el formulario.");
    return;
  }

  const activity = createActivityFromForm(result.value);
  addActivity(activity);
  resetForm();
  renderApp();
  setSystemStatus("ok", "Actividad guardada", "El registro se guardó y el dashboard fue actualizado.");
}

function handleTableClick(event) {
  const deleteButton = event.target.closest("[data-delete-id]");
  if (!deleteButton) return;

  const id = deleteButton.dataset.deleteId;
  deleteActivity(id);
  renderApp();
  console.info("Registro eliminado:", id);
}

function bindEvents() {
  elements.form.addEventListener("submit", handleSubmit);
  document.querySelector("#btnResetForm").addEventListener("click", resetForm);
  elements.tableBody.addEventListener("click", handleTableClick);
  elements.searchInput.addEventListener("input", renderTable);
  elements.filterType.addEventListener("change", renderTable);

  document.querySelector("#btnLoadSeed").addEventListener("click", () => {
    loadSeedActivities();
    renderApp();
    console.info("Datos de prueba cargados correctamente.");
    setSystemStatus("ok", "Datos cargados", "Se cargaron registros de ejemplo para probar filtros y gráficos.");
  });

  document.querySelector("#btnExport").addEventListener("click", exportActivitiesAsJson);

  document.querySelector("#btnClearAll").addEventListener("click", () => {
    const confirmed = confirm("¿Deseas borrar todos los registros locales?");
    if (!confirmed) return;
    clearActivities();
    renderApp();
    setSystemStatus("warning", "Datos eliminados", "La base local quedó vacía.");
  });

  document.querySelector("#btnSystemCheck").addEventListener("click", systemCheck);
  document.querySelector("#btnConsoleTable").addEventListener("click", showConsoleTable);
  document.querySelector("#btnValidationTest").addEventListener("click", validationTest);
  document.querySelector("#btnLocalStorage").addEventListener("click", inspectLocalStorage);
  document.querySelector("#btnControlledError").addEventListener("click", simulateControlledError);

  document.querySelector("#btnToggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    drawActivityChart(readActivities());
  });
}

function init() {
  bindEvents();
  renderApp();
  document.body.classList.add("app-loaded");
  console.info(`${APP_CONFIG.appName} v${APP_CONFIG.version} iniciado correctamente.`);
  console.info("Abre DevTools con F12 y explora Console, Elements, Sources y Application.");
}

document.addEventListener("DOMContentLoaded", init);
