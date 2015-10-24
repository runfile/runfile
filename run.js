require('shelljs/global')

module.exports = (argv) => {
  var taskName = argv._[0]
  var taskFile = process.cwd() + '/Runfile'
  var tasks = require(taskFile)

  if (!taskName) {
    // run default task
    taskName = 'default'
  }

  var task = tasks[taskName]
  if (Array.isArray(task)) {
    for (var i = 0; i < task.length; i++) {
      tasks[task[i]](argv)
    }
    return
  }
  
  task(argv)
}