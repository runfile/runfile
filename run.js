var path = require('path')
var pathExists = require('path-exists')
var prettyHrtime = require('pretty-hrtime')
var tildify = require('tildify')
var runTask = require('./lib/run-task')
var Orchestrator = require('orchestrator')
var userHome = require('user-home')
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
  // parsing argv and get task name and Runfilepath
  var taskName = argv._[0]
  
  // detect global: -g/--global/:taskname
  var aliasGlobal = (taskName.substring(0, 1) === ':')
  if (aliasGlobal) {
    taskName = taskName.substring(1)
  }
  var useGlobal = argv.g || argv.global || aliasGlobal
  var taskFile = useGlobal ? userHome + '/.runfile/Runfile' : path.join(process.cwd(), argv.runfile || 'Runfile')

  // finding and requireing Runfile
  var exist = pathExists.sync(taskFile)
  if (!exist) {
    if (useGlobal) {
      log('Global Runfle not found'.red, 'at', tildify(taskFile).magenta)
    } else {
      log('Runfile not found'.red, 'at', tildify(taskFile).magenta)
    }
    return
  }
  log(`Using ${useGlobal ? 'Global ' : ''}Runfile at:`, tildify(taskFile).magenta)
  require(taskFile)

  // give a default name if no task name specified
  if (!taskName) {
    taskName = 'default'
  }

  // run task by name
  runTask(taskName)
}
