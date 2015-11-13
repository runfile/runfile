import path from 'path'
import pathExists from 'path-exists'
import prettyHrtime from 'pretty-hrtime'
import tildify from 'tildify'
import runTask from'./run-task'
import Orchestrator from 'orchestrator'
import userHome from'user-home'
import './register-global'

global.task = new Orchestrator()
task.on('task_start', e => {
  log('Starting', `'${e.task}'`.cyan, '...')
})
task.on('task_stop', e => {
  log('Finished', `'${e.task}'`.cyan, `in ${prettyHrtime(e.hrDuration)}`)
})

export function run () {
  // parsing argv and get task name and Runfilepath
  let taskName = argv._[0]

  // detect global: -g/--global/:taskname
  const aliasGlobal = taskName && (taskName.substring(0, 1) === ':')
  if (aliasGlobal) {
    taskName = taskName.substring(1)
  }
  const useGlobal = argv.g || argv.global || aliasGlobal
  const taskFile = useGlobal ? userHome + '/.runfile/Runfile' : path.join(process.cwd(), argv.runfile || 'Runfile')

  // finding and requireing Runfile
  const exist = pathExists.sync(taskFile)
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
