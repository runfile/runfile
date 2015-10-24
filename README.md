# runfile

🚧 Task-driven distributing system

## Example

An example `Runfile`

```javascript
var task = module.exports = {}

task.clean = () => {
  rm('-rf', 'testFolder')
  rm('-rf', 'testSource')
}
```

then in your favorite terminal:

```bash
run clean
```

## License

MIT.