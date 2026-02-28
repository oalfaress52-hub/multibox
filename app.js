// ===== SERVER DATA (temporary hardcoded) =====
const servers = [
  {
    name: "Testing MultiBox",
    type: "Private (invite only)",
    inviteCode: "ABC123"
  },
  {
    name: "Creative World",
    type: "Public",
    inviteCode: "N/A"
  },
  {
    name: "Survival Realm",
    type: "Public",
    inviteCode: "N/A"
  }
];

// ===== DOM REFERENCES =====
const serverList = document.getElementById("serverList");
const serverName = document.getElementById("serverName");
const serverType = document.getElementById("serverType");
const inviteCode = document.getElementById("inviteCode");
const playButton = document.getElementById("playButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const serverSearch = document.getElementById("serverSearch");

const tabs = document.querySelectorAll(".tab");
const uiContainer = document.getElementById("uiContainer");

// ===== POPULATE SERVER SIDEBAR =====
function loadServers(filter = "") {
  serverList.innerHTML = "";

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(filter.toLowerCase())
  );

  filteredServers.forEach(server => {
    const li = document.createElement("li");
    li.textContent = server.name;
    li.onclick = () => selectServer(server);
    serverList.appendChild(li);
  });

  if (filteredServers.length === 0) {
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
  inviteCode.textContent = "Invite Code: " + server.inviteCode;
}

// ===== SEARCH FUNCTIONALITY =====
serverSearch.addEventListener("input", (e) => {
  loadServers(e.target.value);
});

// ===== PLAY BUTTON =====
playButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  if (serverName.textContent === "Select a server") {
    alert("Please select a server first.");
    return;
  }

  alert(`Logging in as ${username} to ${serverName.textContent}`);
});

// ===== TAB SWITCHING =====
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const selected = tab.getAttribute("data-tab");

    if (selected === "multiplayer") {
      uiContainer.style.display = "flex";
    } else {
      uiContainer.style.display = "none";
    }
  });
});

// ===== INITIALIZE =====
loadServers();