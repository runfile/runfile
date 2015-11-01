var path = require('path')
var pathExists = require('path-exists')
var prettyHrtime = require('pretty-hrtime')
var tildify = require('tildify')
var runTask = require('./lib/run-task')
var Orchestrator = require('orchestrator')
global.task = new Orchestrator()
var registerGlobal = require('./lib/register-global')
task.on('task_start', e => {
  log('Starting', `'${e.task}'`.cyan, '...')
})
task.on('task_stop', e => {
  log('Finished', `'${e.task}'`.cyan, `in ${prettyHrtime(e.hrDuration)}`)
})
registerGlobal()

module.exports = () => {
  var taskName = argv._[0]
  var taskFile = path.join(process.cwd(), argv.runfile || 'Runfile')

  var exist = pathExists.sync(taskFile)
  if (!exist) {
    log('Runfile not found'.red, 'at', tildify(taskFile).magenta)
    return
  }

  log('Using Runfile at:', tildify(taskFile).magenta)
  require(taskFile)

  if (!taskName) {
    taskName = 'default'
  }

  runTask(taskName)
}
