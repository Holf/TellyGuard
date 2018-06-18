const button = document.getElementById("tellySwitch");
let tellyState;

const updateStatus = () => {
  fetch("telly/status")
    .then(response => {
      return response.json();
    })
    .then(json => {
      if (json.status === "enabled") {
        button.innerText = "Disable Telly";
      } else {
        button.innerText = "Enable Telly";
      }
      tellyState = json.status;
    });
};

button.onclick = () => {
  if (tellyState === "enabled") {
    fetch("telly/disable").then(() => updateStatus());
  } else if (tellyState === "disabled") {
    fetch("telly/enable").then(() => updateStatus());
  }
};

updateStatus();
