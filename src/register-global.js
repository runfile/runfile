import path from 'path'

global.emit = (name) => {
  orchestrator.start(name)
}

global.task = (name, tasks, fn) => {
  if (Array.isArray(tasks)) {
    orchestrator.add(name, tasks, fn)
  } else if (typeof tasks === 'function') {
    orchestrator.add(name, tasks)
  }
}

global.alias = (name, aliasToCommand) => {
  orchestrator.add(name, () => {
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
  return `node ./node_modules/.bin/${command.trim()}`
}
