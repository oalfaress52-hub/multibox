// ===== WORLDS DATA =====
const worlds = [
  { name: "World 1", type: "Survival", status: "off" },
  { name: "World 2", type: "Survival", status: "on" },
  { name: "World 3", type: "Survival", status: "inactive" },
  { name: "World 4", type: "Survival", status: "off" },
  { name: "World 5", type: "Creative", status: "on" }
];

// ===== DOM =====
const worldList = document.getElementById("worldList");
const worldName = document.getElementById("worldName");
const powerStatus = document.getElementById("powerStatus");
const playWorldButton = document.getElementById("playWorldButton");

// ===== POPULATE WORLDS =====
function loadWorlds() {
  worldList.innerHTML = "";
  worlds.forEach((world, index) => {
    const li = document.createElement("li");
    li.textContent = world.name;

    const icon = document.createElement("img");
    icon.src = world.type === "Creative" ? "assets/creative.png" : "assets/survival.png";
    icon.alt = world.type;
    li.appendChild(icon);

    li.onclick = () => selectWorld(index);
    worldList.appendChild(li);
  });
}

// ===== SELECT WORLD =====
let selectedWorldIndex = null;
function selectWorld(index) {
  selectedWorldIndex = index;
  const world = worlds[index];
  worldName.textContent = world.name;

  powerStatus.className = "";
  if(world.status === "off") powerStatus.classList.add("powerOff");
  else if(world.status === "inactive") powerStatus.classList.add("powerInactive");
  else powerStatus.classList.add("powerOn");
}

// ===== PLAY BUTTON =====
playWorldButton.onclick = () => {
  if(selectedWorldIndex === null) return alert("Select a world first!");
  const world = worlds[selectedWorldIndex];
  alert(`Starting ${world.name} (${world.type})!`);
}

// ===== INITIALIZE =====
loadWorlds();