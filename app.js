// ===== WORLDS (Singleplayer) =====
const worlds = [
  { name: "World 1", type: "Survival", status: "off" },
  { name: "World 2", type: "Survival", status: "on" },
  { name: "World 3", type: "Survival", status: "inactive" },
  { name: "World 4", type: "Survival", status: "off" },
  { name: "World 5", type: "Creative", status: "on" }
];

// ===== DOM REFERENCES =====
// Tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tabPanel");

// Singleplayer elements
const worldList = document.getElementById("worldList");
const worldName = document.getElementById("worldName");
const powerButton = document.getElementById("powerButton");
const playWorldButton = document.getElementById("playWorldButton");

// ===== TAB SWITCHING =====
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(tab.dataset.tab + "Panel").classList.add("active");
  });
});

// ===== SINGLEPLAYER LOGIC =====
let selectedIndex = null;

// Load world list
function loadWorlds() {
  worldList.innerHTML = "";
  worlds.forEach((world, i) => {
    const li = document.createElement("li");
    li.textContent = world.name;

    // Add type icon
    const icon = document.createElement("img");
    icon.src = world.type === "Creative" ? "assets/creative.png" : "assets/survival.png";
    li.appendChild(icon);

    // Click to select
    li.onclick = () => selectWorld(i);
    worldList.appendChild(li);
  });
}

// Select a world
function selectWorld(i) {
  selectedIndex = i;
  const world = worlds[i];
  worldName.textContent = world.name;
  updatePower(world.status);
}

// Update power button color
function updatePower(status) {
  powerButton.className = "";
  if (status === "off") powerButton.classList.add("powerOff");
  else if (status === "inactive") powerButton.classList.add("powerInactive");
  else powerButton.classList.add("powerOn");
}

// Toggle power status
powerButton.addEventListener("click", () => {
  if (selectedIndex === null) return alert("Select a world first!");
  const world = worlds[selectedIndex];
  if (world.status === "off") world.status = "on";
  else if (world.status === "on") world.status = "inactive";
  else world.status = "off";
  updatePower(world.status);
});

// Play button
playWorldButton.addEventListener("click", () => {
  if (selectedIndex === null) return alert("Select a world first!");
  const world = worlds[selectedIndex];
  alert(`Starting ${world.name} (${world.type})`);
});

// ===== INITIALIZE =====
loadWorlds();