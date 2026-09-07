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
};

const MUSCLE_ICONS = {
  biceps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="6" r="2"/><path d="M7 8v4"/><path d="M7 12c0 3 2 4 5 4"/><path d="M12 16c2.5 0 4-1.5 4-3.5 0-1.5-1-2.5-2.5-2.5-1 0-1.5.6-1.5 1.5 0 .8.6 1.3 1.3 1.3"/><path d="M15.5 17l1.5 3"/></svg>`,
  triceps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="6" r="2"/><path d="M17 8v4"/><path d="M17 12c0 3-2 4-5 4"/><path d="M12 16c-1.5 1-3 .5-3-1 0-1 .8-1.5 1.6-1.2"/><path d="M8.5 17L7 20"/></svg>`,
  chest: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M12 8c-1.5-2-6-2-7 1s1 6 7 4"/><path d="M12 8c1.5-2 6-2 7 1s-1 6-7 4"/></svg>`,
  lats: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1.8"/><path d="M12 7v10"/><path d="M12 8l-8 5"/><path d="M12 8l8 5"/><path d="M4 13l2 6"/><path d="M20 13l-2 6"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1.8"/><path d="M12 7v13"/><path d="M8 10h8"/><path d="M8.5 14h7"/><path d="M9 18h6"/></svg>`,
  legs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="1.8"/><path d="M10 8h4"/><path d="M10.5 8l-1.5 6-3 6"/><path d="M13.5 8l1.5 6-1 6"/></svg>`,
  abs: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="4" width="8" height="16" rx="3"/><path d="M8 9h8"/><path d="M8 13.5h8"/><path d="M12 4v16"/></svg>`,
  glutes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c-4 0-7 3-7 7 0 4 3 7 7 7s7-3 7-7c0-4-3-7-7-7z"/><path d="M12 5v14"/></svg>`,
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
};

const STRENGTH_DB = {
  biceps: { name: "Biceps", icon: MUSCLE_ICONS.biceps, exercises: [
    { name: "Standing Dumbbell Curl", met: 3.5, recommended: "10–15 min", equip: "dumbbell", pose: "standing", anim: "curl" },
    { name: "Barbell Curl",           met: 4.0, recommended: "10–15 min", equip: "barbell",  pose: "standing", anim: "curl" },
    { name: "Hammer Curl",            met: 3.5, recommended: "10–15 min", equip: "dumbbell", pose: "standing", anim: "curl" },
    { name: "Preacher Curl",          met: 3.5, recommended: "8–12 min",  equip: "dumbbell", pose: "standing", anim: "curl" },
    { name: "Concentration Curl",     met: 3.2, recommended: "8–12 min",  equip: "dumbbell", pose: "standing", anim: "curl" },
    { name: "Incline Dumbbell Curl",  met: 3.5, recommended: "10–15 min", equip: "dumbbell", pose: "standing", anim: "curl" },
    { name: "Chin-Up",                met: 8.0, recommended: "5–10 min",  equip: "bar",        pose: "standing", anim: "bodyup" },
  ]},
  triceps: { name: "Triceps", icon: MUSCLE_ICONS.triceps, exercises: [
    { name: "Tricep Pushdown",          met: 3.5, recommended: "10–15 min", equip: "cable",     pose: "standing", anim: "pushdown" },
    { name: "Skull Crushers",           met: 3.5, recommended: "8–12 min",  equip: "barbell",   pose: "lying",    anim: "press" },
    { name: "Overhead Tricep Extension",met: 3.5, recommended: "10–15 min", equip: "dumbbell",  pose: "standing", anim: "press" },
    { name: "Close-Grip Bench Press",   met: 5.0, recommended: "10–15 min", equip: "barbell",   pose: "lying",    anim: "press" },
    { name: "Tricep Dips",              met: 6.0, recommended: "8–12 min",  equip: "bodyweight",pose: "standing", anim: "bodyup" },
    { name: "Kickback",                 met: 3.2, recommended: "8–12 min",  equip: "dumbbell",  pose: "standing", anim: "kickarm" },
  ]},
  chest: { name: "Chest", icon: MUSCLE_ICONS.chest, exercises: [
    { name: "Bench Press",         met: 5.0, recommended: "10–15 min", equip: "barbell",    pose: "lying",    anim: "press" },
    { name: "Incline Bench Press", met: 5.0, recommended: "10–15 min", equip: "barbell",    pose: "lying",    anim: "press" },
    { name: "Dumbbell Fly",        met: 4.0, recommended: "8–12 min",  equip: "dumbbell",   pose: "lying",    anim: "fly" },
    { name: "Push-Up",             met: 8.0, recommended: "10–15 min", equip: "bodyweight", pose: "lying",    anim: "pushup" },
    { name: "Cable Crossover",     met: 4.0, recommended: "10–15 min", equip: "cable",      pose: "standing", anim: "fly" },
    { name: "Chest Dip",           met: 6.0, recommended: "8–12 min",  equip: "bodyweight", pose: "standing", anim: "bodyup" },
  ]},
  lats: { name: "Lats", icon: MUSCLE_ICONS.lats, exercises: [
    { name: "Lat Pulldown",           met: 4.0, recommended: "10–15 min", equip: "cable",    pose: "standing", anim: "pushdown" },
    { name: "Pull-Up",                met: 8.0, recommended: "5–10 min",  equip: "bar",       pose: "standing", anim: "bodyup" },
    { name: "Straight-Arm Pulldown",  met: 4.0, recommended: "8–12 min",  equip: "cable",    pose: "standing", anim: "pushdown" },
    { name: "Single-Arm Dumbbell Row",met: 4.5, recommended: "10–15 min", equip: "dumbbell", pose: "standing", anim: "pull" },
    { name: "Wide-Grip Pulldown",     met: 4.0, recommended: "10–15 min", equip: "cable",    pose: "standing", anim: "pushdown" },
  ]},
  back: { name: "Back", icon: MUSCLE_ICONS.back, exercises: [
    { name: "Barbell Row",     met: 5.0, recommended: "10–15 min", equip: "barbell",    pose: "standing", anim: "pull" },
    { name: "Seated Cable Row",met: 4.5, recommended: "10–15 min", equip: "cable",      pose: "standing", anim: "pull" },
    { name: "Deadlift",        met: 6.0, recommended: "10–15 min", equip: "barbell",    pose: "standing", anim: "hinge" },
    { name: "T-Bar Row",       met: 5.0, recommended: "10–15 min", equip: "barbell",    pose: "standing", anim: "pull" },
    { name: "Superman",        met: 3.0, recommended: "5–10 min",  equip: "bodyweight", pose: "lying",    anim: "hinge" },
  ]},
  legs: { name: "Legs", icon: MUSCLE_ICONS.legs, exercises: [
    { name: "Squat",         met: 5.0, recommended: "10–20 min", equip: "barbell",    pose: "standing", anim: "squat" },
    { name: "Leg Press",     met: 5.0, recommended: "10–15 min", equip: "bodyweight", pose: "standing", anim: "squat" },
    { name: "Lunges",        met: 4.0, recommended: "10–15 min", equip: "dumbbell",   pose: "standing", anim: "squat" },
    { name: "Leg Extension", met: 3.5, recommended: "8–12 min",  equip: "bodyweight", pose: "standing", anim: "kickleg" },
    { name: "Leg Curl",      met: 3.5, recommended: "8–12 min",  equip: "bodyweight", pose: "standing", anim: "kickleg" },
    { name: "Calf Raise",    met: 3.0, recommended: "8–12 min",  equip: "dumbbell",   pose: "standing", anim: "kickleg" },
  ]},
  abs: { name: "Abs", icon: MUSCLE_ICONS.abs, exercises: [
    { name: "Crunch",          met: 3.0, recommended: "5–10 min", equip: "bodyweight", pose: "lying", anim: "crunch" },
    { name: "Plank",           met: 4.0, recommended: "3–8 min",  equip: "bodyweight", pose: "lying", anim: "hold" },
    { name: "Sit-Up",          met: 3.5, recommended: "5–10 min", equip: "bodyweight", pose: "lying", anim: "crunch" },
    { name: "Leg Raise",       met: 3.5, recommended: "5–10 min", equip: "bodyweight", pose: "lying", anim: "legraise" },
    { name: "Russian Twist",   met: 4.0, recommended: "5–10 min", equip: "bodyweight", pose: "lying", anim: "twist" },
    { name: "Bicycle Crunch",  met: 4.5, recommended: "5–10 min", equip: "bodyweight", pose: "lying", anim: "crunch" },
  ]},
  glutes: { name: "Glutes", icon: MUSCLE_ICONS.glutes, exercises: [
    { name: "Hip Thrust",           met: 4.5, recommended: "10–15 min", equip: "barbell",    pose: "lying",    anim: "hiplift" },
    { name: "Glute Bridge",         met: 3.5, recommended: "8–12 min",  equip: "bodyweight", pose: "lying",    anim: "hiplift" },
    { name: "Bulgarian Split Squat",met: 5.0, recommended: "10–15 min", equip: "dumbbell",   pose: "standing", anim: "squat" },
    { name: "Cable Kickback",       met: 3.5, recommended: "8–12 min",  equip: "cable",      pose: "standing", anim: "kickleg" },
    { name: "Romanian Deadlift",    met: 5.5, recommended: "10–15 min", equip: "barbell",    pose: "standing", anim: "hinge" },
    { name: "Donkey Kick",          met: 3.0, recommended: "8–12 min",  equip: "bodyweight", pose: "standing", anim: "kickleg" },
  ]},
};

const ACCENT = { cardio: "#D6FF3F", strength: "#FF5A36" };

let state = {
  mode: "cardio",
  unit: "kg",
  heightUnit: "cm",
  selectedMuscle: null,
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
const animStage = document.getElementById("animStage");
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

  if (state.mode === "cardio") {
    EXERCISES.cardio.forEach((ex) => {
      const card = document.createElement("button");
      card.className = "exercise-card";
      card.style.setProperty("--accent-color", ACCENT.cardio);
      card.innerHTML = `
        <span class="exercise-card__icon">${ex.icon}</span>
        <span class="exercise-card__name">${ex.name}</span>
        <span class="exercise-card__met">MET ${ex.met}</span>
      `;
      card.addEventListener("click", () => openPanel(ex));
      grid.appendChild(card);
    });
    return;
  }

  // Strength mode
  if (!state.selectedMuscle) {
    Object.entries(STRENGTH_DB).forEach(([key, muscle]) => {
      const card = document.createElement("button");
      card.className = "exercise-card";
      card.style.setProperty("--accent-color", ACCENT.strength);
      card.innerHTML = `
        <span class="exercise-card__icon">${muscle.icon}</span>
        <span class="exercise-card__name">${muscle.name}</span>
        <span class="exercise-card__met">${muscle.exercises.length} exercises</span>
      `;
      card.addEventListener("click", () => {
        state.selectedMuscle = key;
        renderGrid();
      });
      grid.appendChild(card);
    });
    return;
  }

  const muscle = STRENGTH_DB[state.selectedMuscle];

  const header = document.createElement("div");
  header.className = "grid-header";
  header.innerHTML = `
    <button class="grid-back" id="backToMuscles">&larr; Muscles</button>
    <span class="grid-header__title" style="--accent-color:${ACCENT.strength}">${muscle.name}</span>
  `;
  grid.appendChild(header);
  header.querySelector("#backToMuscles").addEventListener("click", () => {
    state.selectedMuscle = null;
    renderGrid();
  });

  muscle.exercises.forEach((ex) => {
    const card = document.createElement("button");
    card.className = "exercise-card exercise-name-card";
    card.style.setProperty("--accent-color", ACCENT.strength);
    card.innerHTML = `
      <span class="exercise-card__name">${ex.name}</span>
      <span class="exercise-name-card__met">MET ${ex.met}</span>
    `;
    card.addEventListener("click", () => openPanel(ex));
    grid.appendChild(card);
  });
}

modeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    state.selectedMuscle = null;
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

function buildRigSVG(exercise) {
  const isArmLimb = exercise.anim === "kickarm";
  const worklimbOrigin = isArmLimb ? "60px 48px" : "60px 88px";
  const worklimbPath = isArmLimb
    ? `<line x1="60" y1="48" x2="80" y2="72"/>`
    : `<line x1="60" y1="88" x2="80" y2="130"/>`;

  return `
    <svg class="rig anim-${exercise.anim} pose-${exercise.pose} equip-is-${exercise.equip}" viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
      <g class="rig-figure-wrap">
        <g class="rig-figure">
          <circle class="rig-head" cx="60" cy="28" r="10"/>
          <line class="rig-torso" x1="60" y1="38" x2="60" y2="88"/>
          <line class="rig-armL" x1="60" y1="48" x2="42" y2="72"/>
          <line class="rig-armR" x1="60" y1="48" x2="78" y2="72"/>
          <line class="rig-legL" x1="60" y1="88" x2="46" y2="138"/>
          <line class="rig-legR" x1="60" y1="88" x2="74" y2="138"/>
        </g>
      </g>
      <g class="rig-worklimb" style="transform-origin:${worklimbOrigin}">
        ${worklimbPath}
      </g>
      <g class="rig-equip">
        <g class="equip-dumbbell">
          <line x1="45" y1="80" x2="65" y2="80"/>
          <circle cx="42" cy="80" r="5"/>
          <circle cx="68" cy="80" r="5"/>
        </g>
        <g class="equip-barbell">
          <line x1="18" y1="76" x2="102" y2="76"/>
          <rect x="12" y="70" width="8" height="12"/>
          <rect x="100" y="70" width="8" height="12"/>
        </g>
        <g class="equip-cable">
          <line x1="60" y1="0" x2="60" y2="76"/>
          <rect x="52" y="76" width="16" height="10"/>
        </g>
        <g class="equip-bar">
          <line x1="20" y1="8" x2="100" y2="8"/>
        </g>
      </g>
    </svg>
  `;
}

function openPanel(exercise) {
  stopTimer();
  state.activeExercise = exercise;
  state.seconds = 0;
  state.log = [];
  panel.style.setProperty("--accent-color", ACCENT[state.mode]);
  panelName.textContent = exercise.name;
  panelMet.textContent = `MET ${exercise.met}`;
  if (exercise.icon) {
    panelIcon.innerHTML = exercise.icon;
    panelIcon.style.display = "";
  } else {
    panelIcon.style.display = "none";
  }
  panelIcon.style.setProperty("--accent-color", ACCENT[state.mode]);

  if (exercise.anim) {
    animStage.innerHTML = buildRigSVG(exercise);
    animStage.classList.remove("is-hidden");
  } else {
    animStage.innerHTML = "";
    animStage.classList.add("is-hidden");
  }
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
