function readActivities() {
  const raw = localStorage.getItem(APP_CONFIG.storageKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("No fue posible leer la base local:", error);
    return [];
  }
}

function saveActivities(activities) {
  localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(activities));
}

function addActivity(activity) {
  const activities = readActivities();
  activities.unshift(activity);
  saveActivities(activities);
  return activities;
}

function deleteActivity(activityId) {
  const activities = readActivities().filter((activity) => activity.id !== activityId);
  saveActivities(activities);
  return activities;
}

function clearActivities() {
  localStorage.removeItem(APP_CONFIG.storageKey);
}

function loadSeedActivities() {
  const cloned = SEED_ACTIVITIES.map((item) => ({ ...item, id: crypto.randomUUID() }));
  saveActivities(cloned);
  return cloned;
}

function exportActivitiesAsJson() {
  const activities = readActivities();
  const blob = new Blob([JSON.stringify(activities, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "agrocontrol-actividades.json";
  link.click();
  URL.revokeObjectURL(url);
}
