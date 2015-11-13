'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.emit = function (name) {
  task.start(name);
};

global.register = function (name, tasks, fn) {
  if (Array.isArray(tasks)) {
    task.add(name, tasks, fn);
  } else if (typeof tasks === 'function') {
    task.add(name, tasks);
  }
};

global.alias = function (name, aliasToCommand) {
  task.add(name, function () {
    if (Array.isArray(aliasToCommand)) {
      for (var i = 0; i < aliasToCommand.length; i++) {
        exec(aliasToCommand[i]);
      }
    } else {
      exec(aliasToCommand);
    }
  });
};

global.npm = function (command) {
  return 'node ./node_modules/.bin/' + command.trim();
};