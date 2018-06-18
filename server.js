const express = require("express");
const path = require("path");
const app = express();

const { exec } = require("child_process");

const setSchedule = require("./scheduling");

const setInterfaceState = (stateToSet, res) => {
  exec(`ifconfig eth1 ${stateToSet}`, (err, stdout, stderr) => {
    if (res) {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
    return;
  });
};

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/index.js", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.js"));
});

app.get("/telly/enable", (req, res) => {
  setInterfaceState("up", res);
});

app.get("/telly/disable", (req, res) => {
  setInterfaceState("down", res);
});

app.get("/telly/status", (req, res) => {
  exec("ifconfig eth1", (err, stdout, stderr) => {
    if (stdout.includes("UP")) {
      res.json({ status: "enabled" });
    } else {
      res.json({ status: "disabled" });
    }
  });
});

setSchedule(setInterfaceState);

app.listen(3000, () => console.log("TellySwitcher running!"));
