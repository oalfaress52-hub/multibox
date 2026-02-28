// ===== SERVER DATA =====
const servers = [
  {
    name: "Testing MultiBox",
    type: "Private (invite only)",
    mode: "survival",
    inviteCode: "AbXyTqLp"
  },
  {
    name: "Creative World",
    type: "Public",
    mode: "creative",
    inviteCode: "KrLmNoPq"
  },
  {
    name: "Survival Realm",
    type: "Public",
    mode: "survival",
    inviteCode: "ZaQrTyUi"
  }
];

// ===== DOM =====
const serverList = document.getElementById("serverList");
const serverName = document.getElementById("serverName");
const serverType = document.getElementById("serverType");
const serverIcon = document.getElementById("serverIcon");
const inviteInput = document.getElementById("inviteInput");
const inviteError = document.getElementById("inviteError");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const playButton = document.getElementById("playButton");
const serverSearch = document.getElementById("serverSearch");
const tabs = document.querySelectorAll(".tab");
const uiContainer = document.getElementById("uiContainer");

let selectedServer = null;

// ===== LOAD SERVERS =====
function loadServers(filter = "") {
  serverList.innerHTML = "";

  const filtered = servers.filter(server =>
    server.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No servers found";
    li.style.opacity = "0.6";
    serverList.appendChild(li);
    return;
  }

  filtered.forEach(server => {
    const li = document.createElement("li");
    li.textContent = server.name;

    const icon = document.createElement("img");
    icon.src = server.mode === "survival"
      ? "assets/survival.png"
      : "assets/creative.png";

    li.appendChild(icon);

    li.addEventListener("click", () => selectServer(server));
    serverList.appendChild(li);
  });
}

// ===== SELECT SERVER =====
function selectServer(server) {
  selectedServer = server;

  serverName.textContent = server.name;
  serverType.textContent = "Server Type: " + server.type;

  serverIcon.src = server.mode === "survival"
    ? "assets/survival.png"
    : "assets/creative.png";

  serverIcon.style.display = "inline";

  inviteInput.value = server.inviteCode;
  inviteError.style.display = "none";
}

// ===== SEARCH =====
serverSearch.addEventListener("input", (e) => {
  loadServers(e.target.value);
});

// ===== PLAY BUTTON =====
playButton.addEventListener("click", () => {

  if (!selectedServer) {
    alert("Please select a server first.");
    return;
  }

  if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
    alert("Please enter username and password.");
    return;
  }

  if (inviteInput.value.trim() !== selectedServer.inviteCode) {
    inviteError.textContent = "The server does not exist!";
    inviteError.style.display = "block";
    return;
  }

  inviteError.style.display = "none";

  alert(`Logging in as ${usernameInput.value} to ${selectedServer.name}`);
});

// ===== TABS =====
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    uiContainer.style.display =
      tab.dataset.tab === "multiplayer" ? "flex" : "none";
  });
});

// ===== INIT =====
loadServers();