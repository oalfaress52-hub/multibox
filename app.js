// ===== SERVER DATA =====
const servers = [
  { name: "Testing MultiBox", type: "Private (invite only)", inviteCode: "AbCdEfGh" },
  { name: "Creative World", type: "Public", inviteCode: "XyZaBcDe" },
  { name: "Survival Realm", type: "Survival", inviteCode: "MnOpQrSt" }
];

// ===== DOM REFERENCES =====
const serverList = document.getElementById("serverList");
const serverName = document.getElementById("serverName");
const serverType = document.getElementById("serverType");
const serverIcon = document.getElementById("serverIcon");
const playButton = document.getElementById("playButton");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const inviteInput = document.getElementById("inviteInput");
const inviteError = document.getElementById("inviteError");
const serverSearch = document.getElementById("serverSearch");

const tabs = document.querySelectorAll(".tab");
const uiContainer = document.getElementById("uiContainer");

// ===== POPULATE SERVER SIDEBAR =====
function loadServers(filter = "") {
  serverList.innerHTML = "";

  const input = filter.trim();
  let filteredServers = [];
  const exactMatch = servers.find(s => s.inviteCode.toLowerCase() === input.toLowerCase());
  if (exactMatch) filteredServers.push(exactMatch);
  else filteredServers = servers.filter(s => s.name.toLowerCase().includes(input.toLowerCase()));

  filteredServers.forEach(server => {
    const li = document.createElement("li");
    li.textContent = server.name;

    // ===== ICON FOR ALL SERVER TYPES =====
    const icon = document.createElement("img");
    icon.style.width = "16px";
    icon.style.height = "16px";

    if (server.type.toLowerCase().includes("survival")) {
      icon.src = "assets/survival.png";
      icon.alt = "Survival";
    } else if (server.type.toLowerCase().includes("creative")) {
      icon.src = "assets/creative.png";
      icon.alt = "Creative";
    } else if (server.type.toLowerCase().includes("private")) {
      icon.src = "assets/private.png"; // Add private.png to assets
      icon.alt = "Private";
    } else {
      icon.src = "assets/public.png"; // Add public.png to assets
      icon.alt = "Public";
    }

    li.appendChild(icon);

    li.onclick = () => selectServer(server, icon.src);
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
function selectServer(server, iconSrc = null) {
  serverName.textContent = server.name;
  serverType.textContent = "Server Type: " + server.type;

  if (iconSrc) {
    serverIcon.src = iconSrc;
    serverIcon.style.display = "inline";
  } else {
    serverIcon.style.display = "none";
  }
}

// ===== SEARCH FUNCTIONALITY =====
serverSearch.addEventListener("input", (e) => loadServers(e.target.value));

// ===== PLAY BUTTON =====
playButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const code = inviteInput.value.trim();

  // Validate invite code
  if (!code) {
    inviteError.textContent = "Please enter an invite code.";
    inviteError.style.display = "block";
    return;
  }

  const matchedServer = servers.find(s => s.inviteCode.toLowerCase() === code.toLowerCase());
  if (!matchedServer) {
    inviteError.textContent = "Invalid invite code!";
    inviteError.style.display = "block";
    return;
  } else {
    inviteError.style.display = "none";
  }

  // Validate username/password
  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  // Auto-select server from invite code
  selectServer(matchedServer);

  alert(`Logging in as ${username} to ${matchedServer.name}`);
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