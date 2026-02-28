// ===== TAB SWITCHING =====
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tabPanel");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        panels.forEach(p => p.classList.remove("active"));
        document.getElementById(tab.dataset.tab + "Panel").classList.add("active");
    });
});

// ===== SINGLEPLAYER LOGIC =====
const worlds = [
    { name:"World 1", type:"Survival", status:"off" },
    { name:"World 2", type:"Survival", status:"on" },
    { name:"World 3", type:"Survival", status:"inactive" },
    { name:"World 4", type:"Survival", status:"off" },
    { name:"World 5", type:"Creative", status:"on" }
];

const worldList = document.getElementById("worldList");
const worldName = document.getElementById("worldName");
const powerButton = document.getElementById("powerButton");
const playWorldButton = document.getElementById("playWorldButton");
let selectedIndex = null;

function loadWorlds() {
    worldList.innerHTML="";
    worlds.forEach((world,i)=>{
        const li = document.createElement("li");
        li.textContent = world.name;
        const icon = document.createElement("img");
        icon.src = world.type==="Creative"?"assets/creative.png":"assets/survival.png";
        li.appendChild(icon);
        li.onclick = ()=>selectWorld(i);
        worldList.appendChild(li);
    });
}

function selectWorld(i){
    selectedIndex=i;
    const world=worlds[i];
    worldName.textContent=world.name;
    updatePower(world.status);
}

function updatePower(status){
    if(status==="off") powerButton.style.backgroundImage="url('assets/power-red.png')";
    else if(status==="on") powerButton.style.backgroundImage="url('assets/power-green.png')";
    else powerButton.style.backgroundImage="url('assets/power-yellow.png')";
}

powerButton.addEventListener("click", ()=>{
    if(selectedIndex===null) return alert("Select a world first!");
    const world=worlds[selectedIndex];
    if(world.status==="off") world.status="on";
    else if(world.status==="on") world.status="inactive";
    else world.status="off";
    updatePower(world.status);
});

playWorldButton.addEventListener("click", ()=>{
    if(selectedIndex===null) return alert("Select a world first!");
    const world=worlds[selectedIndex];
    alert(`Starting ${world.name} (${world.type})`);
});

// ===== MULTIPLAYER LOGIC =====
const servers=[
    { name:"Testing MultiBox", type:"Private (invite only)", inviteCode:"AbCdEfGh" },
    { name:"Creative World", type:"Public", inviteCode:"XyZaBcDe" },
    { name:"Survival Realm", type:"Public", inviteCode:"MnOpQrSt" }
];

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

function loadServers(filter=""){
    serverList.innerHTML="";
    const input=filter.trim().toLowerCase();
    let filtered=[];
    const exactMatch=servers.find(s=>s.inviteCode.toLowerCase()===input);
    if(exactMatch) filtered.push(exactMatch);
    else filtered=servers.filter(s=>s.name.toLowerCase().includes(input));
    filtered.forEach(s=>{
        const li=document.createElement("li");
        li.textContent=s.name;
        const icon=document.createElement("img");
        icon.src=s.name==="Creative World"?"assets/creative.png":"assets/survival.png";
        li.appendChild(icon);
        li.onclick=()=>selectServer(s,icon.src);
        serverList.appendChild(li);
    });
    if(filtered.length===0){
        const li=document.createElement("li");
        li.textContent="No servers found";
        li.style.opacity="0.6";
        serverList.appendChild(li);
    }
}

function selectServer(server,iconSrc=null){
    serverName.textContent=server.name;
    serverType.textContent="Server Type: "+server.type;
    if(iconSrc){
        serverIcon.src=iconSrc;
        serverIcon.style.display="inline";
    }else serverIcon.style.display="none";
}

serverSearch.addEventListener("input",e=>loadServers(e.target.value));

playButton.addEventListener("click",()=>{
    const username=usernameInput.value.trim();
    const password=passwordInput.value.trim();
    const code=inviteInput.value.trim();
    if(!code){inviteError.textContent="Please enter an invite code.";inviteError.style.display="block";return;}
    const matched=servers.find(s=>s.inviteCode.toLowerCase()===code.toLowerCase());
    if(!matched){inviteError.textContent="Invalid invite code!";inviteError.style.display="block";return;}
    else inviteError.style.display="none";
    if(!username||!password){alert("Please enter username and password.");return;}
    selectServer(matched);
    alert(`Logging in as ${username} to ${matched.name}`);
});

loadWorlds();
loadServers();