var prettyHrtime = require('pretty-hrtime')

module.exports = (taskName, taskFn, argv) => {
  var start = process.hrtime()
  log('Staring', `'${taskName}'`.cyan, '...')

  if (!taskFn) {
    log('Task'.red, `'${taskName}'`.red, 'not found'.red)
  } else {
    taskFn(argv)
  }

  var end = process.hrtime(start)
  var time = prettyHrtime(end)
  log('Finished', `'${taskName}'`.cyan, `in ${time}`)
}