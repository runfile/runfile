var path = require('path')
var pathExists = require('path-exists')

module.exports = () => {
  global.emit = (name) => {
    task.start(name)
  }

  global.register = (name, tasks, fn) => {
    if (Array.isArray(tasks)) {
      task.add(name, tasks, fn)
    } else if (typeof tasks === 'function') {
      task.add(name, tasks)
    }
  }

  global.alias = (name, aliasToCommand) => {
    task.add(name, () => {
      if (Array.isArray(aliasToCommand)) {
        for (var i = 0; i < aliasToCommand.length; i++) {
          exec(aliasToCommand[i])
        }
      } else {
        exec(aliasToCommand)
      }
    })
  }

  global.npm = (command) => {
    exec(`node ./node_modules/.bin/${command.trim()}`)
  }
}
