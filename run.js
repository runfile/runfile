var path = require('path')
var pathExists = require('path-exists')
var runTask = require('./lib/run-task')

module.exports = (argv) => {
  var taskName = argv._[0]
  var taskFile = path.join(process.cwd(), argv.runfile || 'Runfile')

  var exist = pathExists.sync(taskFile)
  if (!exist) {
    log('Runfile not found'.red, 'in', taskFile.magenta)
    return
  }

  log('Using Runfile in:', taskFile.magenta)
  var tasks = require(taskFile)

  if (!taskName) {
    // run default task
    taskName = 'default'
  }

  var task = tasks[taskName]
  if (Array.isArray(task)) {
    for (var i = 0; i < task.length; i++) {
      var subTask = tasks[task[i]]
      runTask(task[i], subTask, argv)
    }
    return
  }
  
  runTask(taskName, task, argv)
}