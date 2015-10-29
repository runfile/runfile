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
      exec(aliasToCommand)
    })
  }
}
