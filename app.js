// ===== SERVER DATA (temporary hardcoded) =====
const servers = [
  {
    name: "Testing MultiBox",
    type: "Private (invite only)",
    inviteCode: "AbCdEfGh"
  },
  {
    name: "Creative World",
    type: "Public",
    inviteCode: "XyZaBcDe"
  },
  {
    name: "Survival Realm",
    type: "Survival",
    inviteCode: "MnOpQrSt"
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
const serverIcon = document.getElementById("serverIcon"); // main panel icon

const tabs = document.querySelectorAll(".tab");
const uiContainer = document.getElementById("uiContainer");

// ===== POPULATE SERVER SIDEBAR =====
function loadServers(filter = "") {
  serverList.innerHTML = "";

  // Trim and normalize input
  const input = filter.trim();

  // First, check for exact invite code match
  let filteredServers = [];
  const exactMatch = servers.find(s => s.inviteCode === input);
  if (exactMatch) {
    filteredServers.push(exactMatch);
  } else {
    // Otherwise, filter by name (partial match)
    filteredServers = servers.filter(server =>
      server.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  // Populate the sidebar
  filteredServers.forEach(server => {
    const li = document.createElement("li");
    li.textContent = server.name;

    // Add small icon for Survival or Creative servers
    if (server.type.toLowerCase().includes("survival")) {
      const icon = document.createElement("img");
      icon.src = "assets/survival.png";
      icon.alt = "Survival";
      li.appendChild(icon);
    } else if (server.type.toLowerCase().includes("creative")) {
      const icon = document.createElement("img");
      icon.src = "assets/creative.png";
      icon.alt = "Creative";
      li.appendChild(icon);
    }

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

  // Show main panel icon
  if (server.type.toLowerCase().includes("survival")) {
    serverIcon.src = "assets/survival.png";
    serverIcon.style.display = "inline";
  } else if (server.type.toLowerCase().includes("creative")) {
    serverIcon.src = "assets/creative.png";
    serverIcon.style.display = "inline";
  } else {
    serverIcon.style.display = "none";
  }
}

// ===== SEARCH FUNCTIONALITY =====
serverSearch.addEventListener("input", (e) => {
  loadServers(e.target.value);
});

// ===== PLAY BUTTON =====
playButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const code = inviteCode.textContent.replace("Invite Code: ", "");

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  if (serverName.textContent === "Select a server") {
    alert("Please select a server first.");
    return;
  }

  if (!servers.find(s => s.inviteCode === code)) {
    alert("The server does not exist!");
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
    uiContainer.style.display = selected === "multiplayer" ? "flex" : "none";
  });
});

// ===== INITIALIZE =====
loadServers();