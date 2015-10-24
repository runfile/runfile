require('shelljs/global')

module.exports = (argv) => {
  var taskName = argv._[0]
  var taskFile = process.cwd() + '/Runfile'
  var tasks = require(taskFile)

  tasks[taskName](argv)
}