// Hardcoded server list
const serverData = [
  { name: "Testing MultiBox", type: "Private (invite only)", inviteCode: "ABC123" }
];

// Populate sidebar
const serverList = document.getElementById("serverList");
serverData.forEach(server => {
  const li = document.createElement("li");
  li.className = "p-2 rounded hover:bg-blue-100 cursor-pointer";
  li.innerText = server.name;
  li.onclick = () => selectServer(server.name);
  serverList.appendChild(li);
});

// Display selected server
function selectServer(serverName) {
  const server = serverData.find(s => s.name === serverName);
  if (!server) return;
  document.getElementById('serverName').innerText = server.name;
  document.getElementById('serverType').innerText = "Server Type: " + server.type;
  document.getElementById('inviteCode').innerText = "Invite Code: " + server.inviteCode;
}

// Play button
function playServer() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const serverName = document.getElementById('serverName').innerText;

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  if (serverName === "Select a server") {
    alert("Please select a server first.");
    return;
  }

  alert(`Logging in as ${username} to ${serverName}`);
}