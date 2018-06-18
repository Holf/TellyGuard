const schedule = require("node-schedule");

const setSchedule = setInterfaceState => {
  const tellyOffRule = new schedule.RecurrenceRule();
  tellyOffRule.hour = 5;

  const tellyOnRule = new schedule.RecurrenceRule();
  tellyOnRule.hour = 10;

  schedule.scheduleJob(tellyOnRule, () => {
    setInterfaceState("up");
  });

  schedule.scheduleJob(tellyOffRule, () => {
    setInterfaceState("down");
  });
};

module.exports = setSchedule;
