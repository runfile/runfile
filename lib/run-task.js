"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (taskName) {

  task.start(taskName, function (err) {
    if (err && err.missingTask) {
      log(("Task '" + err.missingTask + "' not found").red);
    }
  });
};