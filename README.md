# runfile

[![NPM version](https://img.shields.io/npm/v/runfile.svg?style=flat-square)](https://www.npmjs.com/package/runfile)
[![NPM download](https://img.shields.io/npm/dm/runfile.svg?style=flat-square)](https://www.npmjs.com/package/runfile)
[![David Status](https://img.shields.io/david/runfile/runfile.svg?style=flat-square)](https://david-dm.org/runfile/runfile)

🚧 A minimal alternative for GNU Makefile. You can use [Shell commands](https://github.com/shelljs/shelljs#command-reference), External tools in your OS directly and synchronously with Runfile.

![preview](http://ww4.sinaimg.cn/large/a15b4afegw1excqco5qvhj20ht05ptan.jpg)

## Install

If you have `node >= 4.0.0` installed: 

```bash
npm install -g runfile
```

## Example

An example `Runfile`

```javascript
task.add('clean', () => {
  rm('-rf', 'testFolder')
  rm('-rf', 'testSource')
})

// or run external tools
task.add('deploy', () => {
  var message = argv._[1] || 'update'
  exec('git add -A')
  exec(`git commit -m "${message}"`)
  exec('git push origin master')
})

task.add('default', ['clean', 'deploy'])
```

then in your favorite terminal:

```bash
run clean
run deploy
```

**Run tasks synchronously**

```javascript
task.add('timeout', (callback) => {
  setTimeout(() => {
    console.log('timeout')
    callback()
  }, 3000)
})

task.add('log', ['timeout'], () => {
  console.log(argv)
})

task.add('default', ['log'])

// then `run`
```

**Trigger a task by hand**

```javascript
task.add('emit', () => {
  emit('deploy')
})
```

## License

MIT.
