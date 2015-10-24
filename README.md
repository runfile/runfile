# runfile

🚧 A minimal alternative for GNU Makefile.

## Example

An example `Runfile`

```javascript
var task = module.exports = {}

task.clean = () => {
  rm('-rf', 'testFolder')
  rm('-rf', 'testSource')
}

// or run external tools
task.git = (argv) => {
  var message = argv.m || 'update'
  exec('git add -A')
  exec(`git commit -m ${message}`)
  exec('git push origin master')
}
```

then in your favorite terminal:

```bash
run clean
run git
```

## License

MIT.
