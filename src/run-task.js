export default (taskName) => {
  orchestrator.start(taskName, err => {
    if (err && err.missingTask) {
      log(`Task '${err.missingTask}' not found`.red)
    }
  })
}
