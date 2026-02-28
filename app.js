// ===== SERVER DATA =====
const servers = [
  { name: "Testing MultiBox", type: "Private (invite only)", inviteCode: "G7kP2fX9" },
  { name: "Creative World", type: "Public", inviteCode: "Qw8Tz5Lm" },
  { name: "Survival Realm", type: "Public", inviteCode: "R2bV6nKy" }
];

// ===== DOM =====
const serverList = document.getElementById("serverList");
const serverName = document.getElementById("serverName");
const serverType = document.getElementById("serverType");
const serverIcon = document.getElementById("serverIcon");
const inviteDisplay = document.getElementById("inviteDisplay");
const playButton = document.getElementById("playButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const inviteInput = document.getElementById("inviteInput");
const inviteError = document.getElementById("inviteError");
const serverSearch = document.getElementById("serverSearch");
const tabs = document.querySelectorAll(".tab");
const tabPanels = document.querySelectorAll(".tabPanel");

// ===== TAB SWITCHING =====
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const selected = tab.dataset.tab;
    tabPanels.forEach(panel => {
      if(panel.id === selected + "Panel") {
        panel.classList.add("active");
        panel.style.display = "flex";
      } else {
        panel.classList.remove("active");
        panel.style.display = "none";
      }
    });
  });
});

// ===== POPULATE SERVERS =====
function loadServers(filter = "") {
  serverList.innerHTML = "";
  const input = filter.trim().toLowerCase();
  const exactMatch = servers.find(s => s.inviteCode.toLowerCase() === input);
  const filteredServers = exactMatch ? [exactMatch] :
    servers.filter(s => s.name.toLowerCase().includes(input));

  filteredServers.forEach(server => {
    const li = document.createElement("li");
    li.textContent = server.name;

    const icon = document.createElement("img");
    icon.src = server.name === "Creative World" ? "assets/creative.png" : "assets/survival.png";
    icon.alt = "Server Icon";

    li.appendChild(icon);
    li.onclick = () => selectServer(server);
    serverList.appendChild(li);
  });

  if(filteredServers.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No servers found";
    li.style.opacity = "0.6";
    serverList.appendChild(li);
  }
}

// ===== SELECT SERVER =====
function selectServer(server) {
  serverName.textContent = server.name;
  serverType.textContent = "Server Type: " + server.type;
  serverIcon.src = server.name === "Creative World" ? "assets/creative.png" : "assets/survival.png";
  serverIcon.style.display = "inline";
  inviteDisplay.textContent = "Invite Code: " + server.inviteCode;
  inviteInput.value = server.inviteCode;
  inviteError.style.display = "none";
}

// ===== SEARCH FUNCTION =====
serverSearch.addEventListener("input", e => loadServers(e.target.value));

// ===== PLAY BUTTON =====
playButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const code = inviteInput.value.trim();

  if(!code) {
    inviteError.textContent = "Please enter an invite code.";
    inviteError.style.display = "block";
    return;
  }

  const matchedServer = servers.find(s => s.inviteCode.toLowerCase() === code.toLowerCase());
  if(!matchedServer) {
    inviteError.textContent = "Invalid invite code!";
    inviteError.style.display = "block";
    return;
  }

  inviteError.style.display = "none";

  if(!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  selectServer(matchedServer);
  alert(`Logging in as ${username} to ${matchedServer.name}`);
});

// ===== INITIALIZE =====
loadServers();