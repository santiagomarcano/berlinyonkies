const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
)
const collectionMetadata = require('../../collection/_metadata.json')
const hashedCollectionMetadata = []

export default async function handler (req, res) {
  try {
    await pinata.testAuthentication()
    console.log('[*] About to update %d files', collectionMetadata.length)
    for await (let item of collectionMetadata) {
      const { IpfsHash } = await pinata.pinFromFS(`collection/${item.name}.png`)
      hashedCollectionMetadata.push({
        ...item,
        image: 'https://gateway.pinata.cloud/ipfs/' + IpfsHash
      })
      console.log('[*] Uploaded: ', item.name, IpfsHash)
    }
    require('fs').writeFileSync(
      'collection/_metadata.json',
      JSON.stringify(hashedCollectionMetadata)
    )
    res.json({ message: 'Done' })
  } catch (err) {
    res.status(503).json({ err })
  }
}
