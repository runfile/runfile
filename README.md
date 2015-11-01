# runfile

[![NPM version](https://img.shields.io/npm/v/runfile.svg?style=flat-square)](https://www.npmjs.com/package/runfile)
[![NPM download](https://img.shields.io/npm/dm/runfile.svg?style=flat-square)](https://www.npmjs.com/package/runfile)
[![David Status](https://img.shields.io/david/runfile/runfile.svg?style=flat-square)](https://david-dm.org/runfile/runfile)

🚧 A minimal alternative for GNU Makefile. You can use [Shell commands](https://github.com/shelljs/shelljs#command-reference), External tools in your OS directly and synchronously with Runfile.

![preview](http://ww4.sinaimg.cn/large/a15b4afegw1exec8v5mlyj20gc0a9gnt.jpg)

## Install

If you have `node >= 4.0.0` installed:

```bash
npm install -g runfile
```

## Example

An example `Runfile`

```javascript
register('clean', () => {
  rm('-rf', 'testFolder')
  rm('-rf', 'testSource')
})

// or run external tools
register('deploy', () => {
  var message = argv._[1] || 'update'
  exec('git add -A')
  exec(`git commit -m "${message}"`)
  exec('git push origin master')
})

register('default', ['clean', 'deploy'])

// alia `run path` to external command `echo $PATH`
// to print your $PATH info in console
// a short-hand for one-line task
alias('path', 'echo $PATH')
// or a sequence of commands
alias('async', [
  'echo Hi',
  'sleep 1',
  'echo After 1s'
])
```

then in your favorite terminal:

```bash
run clean
run deploy
```

**Run tasks synchronously**

```javascript
register('timeout', (callback) => {
  setTimeout(() => {
    console.log('timeout')
    callback()
  }, 3000)
})

register('log', ['timeout'], () => {
  console.log(argv)
})

register('default', ['log'])

// then `run`
```

**Trigger a task by hand**

```javascript
register('emit', () => {
  emit('deploy')
})
```

**Running Node executable inside `./node_modules/.bin`**

```javascript
register('webpack', () => {
  npm('webpack --hot --inline')
})
```

## License

MIT.
