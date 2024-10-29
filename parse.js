const readline = require('readline')
const fs = require('fs')

const find = ['ле', 'le', 'лел', 'lel', 'лол', 'lol', 'кек', 'kek', 'лек', 'lek', 'kjk']

const ids = []
let lastid = null

const lineReader = readline.createInterface({
  input: fs.createReadStream('result.json')
})

lineReader.on('line', async function (rawLine) {
  const line = rawLine.trim().toLocaleLowerCase()

  if (line.indexOf('"id"') === 0) {
    const id = line.replace(/[^\d]+/g, '')

    if (id) {
      lastid = parseInt(id)
    }
  } else if (lastid && line.indexOf('"text"') === 0) {
    const text = line.replace(/^"text": "/, '').replace(/",$/, '')

    if (find.indexOf(text) > -1) {
      ids.push(lastid)
      lastid = null
    }
  }
});

lineReader.on('close', async function () {
  console.log('Found:', ids.length)
  fs.writeFileSync('ids.json', JSON.stringify(ids), { encoding: 'UTF8' })
  console.log('End.')
})
