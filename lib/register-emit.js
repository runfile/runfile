module.exports = () => {
  global.emit = (name) => {
    task.start(name)
  }
}