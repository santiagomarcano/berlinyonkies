const file = JSON.parse(require('fs').readFileSync('collection/_metadata.json'))
export default async function handler (req, res) {
  // const { name } = req.query
  // const item = file.find(f => f.name === name)
  res.status(200).json({ hi: 'gola' })
}
