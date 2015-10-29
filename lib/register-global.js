module.exports = () => {
  global.emit = (name) => {
    task.start(name)
  }

  global.register = (name, fn) => {
    task.add(name, fn)
  }

  global.alias = (name, aliasToCommand) => {
    task.add(name, () => {
      exec(aliasToCommand)
    })
  }
}
