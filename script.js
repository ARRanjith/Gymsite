/* ==========================================================
   FitForge — exercise data, timers, calorie calculation
   Calorie formula (standard MET-based estimate):
   kcal/min = (MET × 3.5 × weightKg) / 200
   ========================================================== */

const ICONS = {
  walk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="4" r="1.8"/><path d="M13 8l-3 2 1 5-3 6"/><path d="M13 8l3 1 2 4"/><path d="M11 15l4 1 2 5"/><path d="M9 21l2-4"/></svg>`,
  jog: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="4" r="1.8"/><path d="M12 8l4 1 1 4-3 3v5"/><path d="M12 8l-4 3 2 3"/><path d="M16 13l4-1"/><path d="M13 16l-4 2-2 4"/></svg>`,
  cycle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3.2"/><circle cx="18" cy="17" r="3.2"/><path d="M6 17l4-8h4l3 8"/><path d="M10 9h3"/><path d="M10 9l3 4h5"/></svg>`,
  swim: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="6" r="1.8"/><path d="M4 12l4-2 4 2 3-2"/><path d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0"/><path d="M11 10l4 2"/></svg>`,
  treadmill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="1.8"/><path d="M12 8l-2 3 2 3 3 1"/><path d="M9 11l-2 1"/><rect x="2" y="18" width="18" height="2.4" rx="1"/><path d="M4 18v-2"/></svg>`,
  skip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.8"/><path d="M9 8h6l-1 6h-4z"/><path d="M9 14l-2 6"/><path d="M15 14l2 6"/><path d="M6 9c-2 1-2 5 0 7"/><path d="M18 9c2 1 2 5 0 7"/></svg>`,
  pushup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="7" r="1.8"/><path d="M16.5 8.5L6 14"/><path d="M6 14l-2.5 1.5"/><path d="M6 14l3 4"/><path d="M9 18l4-1"/><path d="M13 17l3-3"/></svg>`,
  squat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="1.8"/><path d="M8 9h8"/><path d="M9 9l-1 6 2 6"/><path d="M15 9l1 6-2 6"/><path d="M9 15h6"/></svg>`,
  deadlift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="1.8"/><path d="M9 9l-2 5 2 3 5-1 2-3-2-5z"/><path d="M3 15h4"/><path d="M17 15h4"/><rect x="1.5" y="13.5" width="3" height="3" rx="0.5"/><rect x="19.5" y="13.5" width="3" height="3" rx="0.5"/></svg>`,
  pullup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16"/><path d="M7 4v3"/><path d="M17 4v3"/><circle cx="12" cy="10.5" r="1.8"/><path d="M7 7l5 5 5-5"/><path d="M12 12.5v6"/><path d="M9 16l3 2.5 3-2.5"/></svg>`,
  plank: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="4.5" cy="9" r="1.8"/><path d="M6 10.5l3 2h9"/><path d="M9 12.5l-2 5"/><path d="M18 12.5v5"/></svg>`,
  weights: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12h10"/><rect x="2" y="9" width="3" height="6" rx="0.8"/><rect x="19" y="9" width="3" height="6" rx="0.8"/><rect x="5.5" y="7.5" width="2" height="9" rx="0.6"/><rect x="16.5" y="7.5" width="2" height="9" rx="0.6"/></svg>`,
};

const EXERCISES = {
  cardio: [
    { id: "walk",      name: "Walking",   met: 3.8,  icon: ICONS.walk,      recommended: "30–45 min" },
    { id: "jog",       name: "Jogging",   met: 7.0,  icon: ICONS.jog,       recommended: "20–30 min" },
    { id: "cycle",     name: "Cycling",   met: 7.5,  icon: ICONS.cycle,     recommended: "30–45 min" },
    { id: "swim",      name: "Swimming",  met: 6.0,  icon: ICONS.swim,      recommended: "20–30 min" },
    { id: "treadmill", name: "Treadmill", met: 8.0,  icon: ICONS.treadmill, recommended: "20–30 min" },
    { id: "skip",      name: "Skipping",  met: 11.0, icon: ICONS.skip,      recommended: "10–15 min" },
  ],
  strength: [
    { id: "weights",  name: "Weight Lifting", met: 5.0, icon: ICONS.weights,  recommended: "30–45 min" },
    { id: "pushup",   name: "Push-ups",       met: 8.0, icon: ICONS.pushup,   recommended: "10–15 min" },
    { id: "squat",    name: "Squats",         met: 5.0, icon: ICONS.squat,    recommended: "10–15 min" },
    { id: "deadlift", name: "Deadlift",       met: 6.0, icon: ICONS.deadlift, recommended: "15–20 min" },
    { id: "pullup",   name: "Pull-ups",       met: 8.0, icon: ICONS.pullup,   recommended: "10–15 min" },
    { id: "plank",    name: "Plank",          met: 4.0, icon: ICONS.plank,    recommended: "5–10 min" },
  ],
};

const ACCENT = { cardio: "#D6FF3F", strength: "#FF5A36" };

let state = {
  mode: "cardio",
  unit: "kg",
  heightUnit: "cm",
  activeExercise: null,
  seconds: 0,
  running: false,
  intervalId: null,
  log: [],
};

const grid = document.getElementById("exerciseGrid");
const weightInput = document.getElementById("bodyWeight");
const heightInput = document.getElementById("bodyHeight");
const weightUnitBtns = document.querySelectorAll('.hero__weight .unit-btn');
const heightUnitBtns = document.querySelectorAll('.hero__height .unit-btn');
const bmiValueEl = document.getElementById("bmiValue");
const bmiCategoryEl = document.getElementById("bmiCategory");
const bmiMarker = document.getElementById("bmiMarker");
const bmiNote = document.getElementById("bmiNote");
const modeBtns = document.querySelectorAll(".mode-btn");
const panel = document.getElementById("timerPanel");
const backdrop = document.getElementById("panelBackdrop");
const closePanelBtn = document.getElementById("closePanel");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timerDisplay");
const calorieCount = document.getElementById("calorieCount");
const panelName = document.getElementById("panelName");
const panelMet = document.getElementById("panelMet");
const panelIcon = document.getElementById("panelIcon");
const panelFormula = document.getElementById("panelFormula");
const logList = document.getElementById("logList");
const bestTimeValue = document.getElementById("bestTimeValue");
const timerTabs = document.querySelectorAll(".timer-tab");
const liveTabPanel = document.getElementById("liveTabPanel");
const manualTabPanel = document.getElementById("manualTabPanel");
const manualMinutesInput = document.getElementById("manualMinutes");
const manualCalcBtn = document.getElementById("manualCalcBtn");
const manualCalorieCount = document.getElementById("manualCalorieCount");
const manualFormula = document.getElementById("manualFormula");

function weightInKg() {
  const raw = parseFloat(weightInput.value) || 0;
  return state.unit === "kg" ? raw : raw * 0.453592;
}

function calcCalories(met, seconds, weightKg) {
  const minutes = seconds / 60;
  return (met * 3.5 * weightKg / 200) * minutes;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function renderGrid() {
  grid.innerHTML = "";
  grid.style.setProperty("--accent-color", ACCENT[state.mode]);
  EXERCISES[state.mode].forEach((ex) => {
    const card = document.createElement("button");
    card.className = "exercise-card";
    card.style.setProperty("--accent-color", ACCENT[state.mode]);
    card.innerHTML = `
      <span class="exercise-card__icon">${ex.icon}</span>
      <span class="exercise-card__name">${ex.name}</span>
      <span class="exercise-card__met">MET ${ex.met}</span>
    `;
    card.addEventListener("click", () => openPanel(ex));
    grid.appendChild(card);
  });
}

modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    modeBtns.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    renderGrid();
  });
});

weightUnitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const newUnit = btn.dataset.unit;
    if (newUnit === state.unit) return;
    const current = parseFloat(weightInput.value) || 0;
    weightInput.value = newUnit === "lb"
      ? Math.round(current * 2.20462)
      : Math.round(current / 2.20462);
    state.unit = newUnit;
    weightUnitBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    updateLiveCalories();
    updateBMI();
  });
});

heightUnitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const newUnit = btn.dataset.unit;
    if (newUnit === state.heightUnit) return;
    const current = parseFloat(heightInput.value) || 0;
    heightInput.value = newUnit === "in"
      ? Math.round((current / 2.54) * 10) / 10
      : Math.round(current * 2.54);
    state.heightUnit = newUnit;
    heightUnitBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
    updateBMI();
  });
});

/* ---------- BMI ---------- */
function heightInMeters() {
  const raw = parseFloat(heightInput.value) || 0;
  const cm = state.heightUnit === "cm" ? raw : raw * 2.54;
  return cm / 100;
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", tone: "alert" };
  if (bmi < 25)   return { label: "Healthy range", tone: "good" };
  if (bmi < 30)   return { label: "Overweight", tone: "alert" };
  return { label: "Obese", tone: "alert" };
}

function updateBMI() {
  const kg = weightInKg();
  const m = heightInMeters();
  if (!kg || !m) {
    bmiValueEl.textContent = "—";
    bmiCategoryEl.textContent = "Enter weight & height";
    bmiNote.textContent = "";
    bmiMarker.style.left = "0%";
    return;
  }

  const bmi = kg / (m * m);
  const cat = bmiCategory(bmi);
  bmiValueEl.textContent = bmi.toFixed(1);
  bmiCategoryEl.textContent = cat.label;

  const clampedPct = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
  bmiMarker.style.left = `${clampedPct}%`;

  bmiNote.classList.remove("is-alert", "is-good");
  if (bmi >= 25) {
    const healthyMaxKg = 24.9 * m * m;
    const toLose = (kg - healthyMaxKg);
    const toLoseDisplay = state.unit === "kg" ? toLose : toLose * 2.20462;
    bmiNote.textContent = `To reach a healthy BMI, losing roughly ${toLoseDisplay.toFixed(1)} ${state.unit} would bring you into range — the cardio and strength timers above can help track that.`;
    bmiNote.classList.add("is-alert");
  } else if (bmi < 18.5) {
    const healthyMinKg = 18.5 * m * m;
    const toGain = (healthyMinKg - kg);
    const toGainDisplay = state.unit === "kg" ? toGain : toGain * 2.20462;
    bmiNote.textContent = `You're below the typical healthy range — gaining roughly ${toGainDisplay.toFixed(1)} ${state.unit} of healthy weight would bring you into range.`;
    bmiNote.classList.add("is-alert");
  } else {
    bmiNote.textContent = "You're within the typical healthy BMI range — nice work staying consistent.";
    bmiNote.classList.add("is-good");
  }
}

heightInput.addEventListener("input", updateBMI);

function openPanel(exercise) {
  stopTimer();
  state.activeExercise = exercise;
  state.seconds = 0;
  state.log = [];
  panel.style.setProperty("--accent-color", ACCENT[state.mode]);
  panelName.textContent = exercise.name;
  panelMet.textContent = `MET ${exercise.met}`;
  panelIcon.innerHTML = exercise.icon;
  panelIcon.style.setProperty("--accent-color", ACCENT[state.mode]);
  bestTimeValue.textContent = exercise.recommended;
  timerDisplay.textContent = "00:00";
  calorieCount.textContent = "0";
  panelFormula.textContent = `MET ${exercise.met} × 3.5 × body weight ÷ 200, per minute`;
  manualMinutesInput.value = "";
  manualCalorieCount.textContent = "0";
  manualFormula.textContent = `MET ${exercise.met} × 3.5 × body weight ÷ 200, per minute`;
  logList.innerHTML = `<li class="log-empty">No sets logged yet.</li>`;
  startPauseBtn.textContent = "Start";
  startPauseBtn.classList.remove("is-running");
  switchTab("live");

  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  backdrop.classList.add("is-open");
}

function switchTab(tabName) {
  timerTabs.forEach((btn) => {
    const active = btn.dataset.tab === tabName;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });
  liveTabPanel.classList.toggle("is-hidden", tabName !== "live");
  manualTabPanel.classList.toggle("is-hidden", tabName !== "manual");
  if (tabName === "manual") stopTimer();
}

timerTabs.forEach((btn) => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

manualCalcBtn.addEventListener("click", () => {
  const minutes = parseFloat(manualMinutesInput.value);
  if (!minutes || minutes <= 0 || !state.activeExercise) return;
  const kcal = calcCalories(state.activeExercise.met, minutes * 60, weightInKg());
  manualCalorieCount.textContent = kcal.toFixed(1);
  logSet(Math.round(minutes * 60), kcal);
});

function closePanel() {
  stopTimer();
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  backdrop.classList.remove("is-open");
}

closePanelBtn.addEventListener("click", closePanel);
backdrop.addEventListener("click", closePanel);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
});

function updateLiveCalories() {
  if (!state.activeExercise) return;
  const kcal = calcCalories(state.activeExercise.met, state.seconds, weightInKg());
  calorieCount.textContent = kcal.toFixed(1);
}

function tick() {
  state.seconds += 1;
  timerDisplay.textContent = formatTime(state.seconds);
  updateLiveCalories();
}

function startTimer() {
  if (state.running) return;
  state.running = true;
  state.intervalId = setInterval(tick, 1000);
  startPauseBtn.textContent = "Pause";
  startPauseBtn.classList.add("is-running");
}

function pauseTimer() {
  state.running = false;
  clearInterval(state.intervalId);
  startPauseBtn.textContent = "Resume";
  startPauseBtn.classList.remove("is-running");

  if (state.seconds > 0) {
    const kcal = calcCalories(state.activeExercise.met, state.seconds, weightInKg());
    logSet(state.seconds, kcal);
  }
}

function stopTimer() {
  state.running = false;
  clearInterval(state.intervalId);
}

function logSet(seconds, kcal) {
  state.log.push({ seconds, kcal });
  if (logList.querySelector(".log-empty")) logList.innerHTML = "";
  const li = document.createElement("li");
  li.innerHTML = `<span>${formatTime(seconds)}</span><span>${kcal.toFixed(1)} kcal</span>`;
  logList.prepend(li);
}

startPauseBtn.addEventListener("click", () => {
  if (state.running) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", () => {
  stopTimer();
  state.seconds = 0;
  timerDisplay.textContent = "00:00";
  calorieCount.textContent = "0";
  startPauseBtn.textContent = "Start";
  startPauseBtn.classList.remove("is-running");
});

weightInput.addEventListener("input", () => {
  updateLiveCalories();
  updateBMI();
});

renderGrid();
updateBMI();
