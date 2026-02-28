// ===== WORLDS =====
const worlds = [
    { name: "World 1", type: "Survival", status: "off" },
    { name: "World 2", type: "Survival", status: "on" },
    { name: "World 3", type: "Survival", status: "inactive" },
    { name: "World 4", type: "Survival", status: "off" },
    { name: "World 5", type: "Creative", status: "on" }
];

// ===== DOM =====
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tabPanel");

const worldList = document.getElementById("worldList");
const worldName = document.getElementById("worldName");
const powerButton = document.getElementById("powerButton");
const playWorldButton = document.getElementById("playWorldButton");

let selectedIndex = null;

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
function loadWorlds() {
    worldList.innerHTML = "";
    worlds.forEach((world, i) => {
        const li = document.createElement("li");
        li.textContent = world.name;

        const icon = document.createElement("img");
        icon.src = world.type === "Creative" ? "assets/creative.png" : "assets/survival.png";
        li.appendChild(icon);

        li.onclick = () => selectWorld(i);
        worldList.appendChild(li);
    });
}

function selectWorld(i) {
    selectedIndex = i;
    const world = worlds[i];
    worldName.textContent = world.name;
    updatePower(world.status);
}

function updatePower(status) {
    if (status === "off") powerButton.style.backgroundImage = "url('assets/power-red.png')";
    else if (status === "on") powerButton.style.backgroundImage = "url('assets/power-green.png')";
    else powerButton.style.backgroundImage = "url('assets/power-yellow.png')";
}

// Toggle power button
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

// ===== INIT =====
loadWorlds();