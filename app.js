// ===== SERVER DATA (temporary hardcoded) =====
const servers = [
  {
    name: "Testing MultiBox",
    type: "Private (invite only)",
    inviteCode: "ABC123"
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

const tabs = document.querySelectorAll(".tab");
const uiContainer = document.getElementById("uiContainer");

// ===== POPULATE SERVER SIDEBAR =====
function loadServers() {
  serverList.innerHTML = "";

  servers.forEach(server => {
    const li = document.createElement("li");
    li.textContent = server.name;
    li.onclick = () => selectServer(server);
    serverList.appendChild(li);
  });
}

// ===== SELECT SERVER =====
function selectServer(server) {
  serverName.textContent = server.name;
  serverType.textContent = "Server Type: " + server.type;
  inviteCode.textContent = "Invite Code: " + server.inviteCode;
}

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