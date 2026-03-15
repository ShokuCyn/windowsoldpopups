const POPUP_TITLES = [
  "Critical Error",
  "System Warning",
  "Unknown Program",
  "Kernel Alert",
  "Fatal Exception",
  "Display Driver Fault",
  "Memory Access Violation",
  "User32.dll Failure",
  "Stack Overflow",
  "System Integrity Alert"
];

const CREEPY_MESSAGES = [
  "I can see you through the screen.",
  "Your cursor moved while you were asleep.",
  "Do not look behind you.",
  "Memory leak detected in your thoughts.",
  "A process is running inside your room.",
  "The system cannot find your reflection.",
  "You closed this window 14 times already.",
  "Unrecognized heartbeat on COM1.",
  "Something is using your microphone.",
  "You are not the active user.",
  "The shadows were indexed successfully.",
  "This warning was generated from tomorrow.",
  "Input device: human_presence.exe missing.",
  "Your webcam blinked first.",
  "Do not answer the next phone call.",
  "Desktop wallpaper changed itself at 03:13.",
  "An unknown face was cached in memory.",
  "Sleep mode refused your request.",
  "The fan noise is not from your computer.",
  "Root directory contains breathing.wav.",
  "System sounds disabled screaming channel.",
  "Unauthorized movement detected in hallway.",
  "Window focus stolen by entity_07.",
  "Task manager cannot end this presence.",
  "The room temperature dropped by 9°C.",
  "Connection established with nowhere.",
  "BIOS reports one extra heartbeat.",
  "A hidden user signed in: 'watcher'.",
  "CRT burn-in pattern resembles your face.",
  "You accepted terms you never read."
];

const BUTTON_LABELS = ["OK", "Ignore", "Retry", "Cancel", "Abort"];

const MIN_INTERVAL_MS = 12000;
const MAX_INTERVAL_MS = 55000;
const POPUP_VISIBLE_MS = 500;
const GLITCH_POPUP_CHANCE = 0.7;
const FRENZY_MODE_CHANCE = 0.01;
const FRENZY_DURATION_MS = 1000;
const FRENZY_MIN_POPUPS = 160;
const FRENZY_MAX_POPUPS = 280;

const overlay = document.getElementById("overlay");
let frenzyActive = false;

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createActions() {
  const actions = document.createElement("div");
  actions.className = "popup-actions";

  const primary = document.createElement("button");
  primary.type = "button";
  primary.className = "popup-button";
  primary.textContent = chooseRandom(BUTTON_LABELS);

  const secondary = document.createElement("button");
  secondary.type = "button";
  secondary.className = "popup-button";
  secondary.textContent = chooseRandom(BUTTON_LABELS);

  actions.appendChild(primary);
  actions.appendChild(secondary);

  return actions;
}

function createStandardContent(content) {
  const row = document.createElement("div");
  row.className = "popup-message-row";

  const icon = document.createElement("div");
  icon.className = "popup-icon";
  icon.textContent = "!";

  const message = document.createElement("p");
  message.className = "popup-message";
  message.textContent = chooseRandom(CREEPY_MESSAGES);

  row.appendChild(icon);
  row.appendChild(message);

  content.appendChild(row);
  content.appendChild(createActions());
}

function createGlitchArtifacts(content) {
  const artifacts = document.createElement("div");
  artifacts.className = "popup-artifacts";

  for (let i = 0; i < randomBetween(4, 8); i += 1) {
    const bar = document.createElement("span");
    bar.className = "popup-artifact-bar";
    bar.style.width = `${randomBetween(20, 100)}%`;
    bar.style.left = `${randomBetween(0, 10)}%`;
    bar.style.top = `${randomBetween(2, 88)}%`;
    artifacts.appendChild(bar);
  }

  content.appendChild(artifacts);
}

function createGlitchContent(content, popup) {
  popup.classList.add("popup-glitch");

  const row = document.createElement("div");
  row.className = "popup-message-row";

  const icon = document.createElement("div");
  icon.className = "popup-icon popup-icon-glitch";
  icon.textContent = "!";

  const message = document.createElement("p");
  message.className = "popup-message popup-message-glitch";
  message.textContent = chooseRandom(CREEPY_MESSAGES);

  row.appendChild(icon);
  row.appendChild(message);

  content.appendChild(row);
  createGlitchArtifacts(content);
  content.appendChild(createActions());
}

function createPopup() {
  const popup = document.createElement("section");
  popup.className = "popup";

  const titlebar = document.createElement("header");
  titlebar.className = "popup-titlebar";
  titlebar.innerHTML = `<span>${chooseRandom(POPUP_TITLES)}</span><span class="popup-close">×</span>`;

  const content = document.createElement("div");
  content.className = "popup-content";

  if (Math.random() < GLITCH_POPUP_CHANCE) {
    createGlitchContent(content, popup);
  } else {
    createStandardContent(content);
  }

  popup.appendChild(titlebar);
  popup.appendChild(content);
  overlay.appendChild(popup);

  requestAnimationFrame(() => {
    const rect = popup.getBoundingClientRect();
    const maxX = Math.max(0, window.innerWidth - rect.width);
    const maxY = Math.max(0, window.innerHeight - rect.height);
    popup.style.left = `${randomBetween(0, maxX)}px`;
    popup.style.top = `${randomBetween(0, maxY)}px`;
  });

  setTimeout(() => popup.remove(), POPUP_VISIBLE_MS);
}

function triggerFrenzyMode() {
  if (frenzyActive) {
    return;
  }

  frenzyActive = true;
  const totalPopups = randomBetween(FRENZY_MIN_POPUPS, FRENZY_MAX_POPUPS);
  const intervalMs = Math.max(5, Math.floor(FRENZY_DURATION_MS / totalPopups));
  let spawned = 0;

  const frenzyTimer = setInterval(() => {
    createPopup();
    spawned += 1;

    if (spawned >= totalPopups) {
      clearInterval(frenzyTimer);
      frenzyActive = false;
    }
  }, intervalMs);

  setTimeout(() => {
    clearInterval(frenzyTimer);
    frenzyActive = false;
  }, FRENZY_DURATION_MS + 100);
}

function scheduleNextPopup() {
  const delay = randomBetween(MIN_INTERVAL_MS, MAX_INTERVAL_MS);
  setTimeout(() => {
    if (Math.random() < FRENZY_MODE_CHANCE) {
      triggerFrenzyMode();
    } else {
      createPopup();
    }

    scheduleNextPopup();
  }, delay);
}

window.overlayDebug = {
  triggerFrenzyMode
};

scheduleNextPopup();
