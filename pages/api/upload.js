const pinataSDK = require('@pinata/sdk')
const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
)
const collectionMetadata = require('../../collection/_metadata.json')
const hashedCollectionMetadata = []
// Revisa 1953, 1952 etc
export default async function handler (req, res) {
  try {
    await pinata.testAuthentication()
    const n = Array(10).fill(1).map((_, i) => i)
    console.log(n)
    for await (let am of n) {
      const list = await pinata.pinList({ status: 'all', pageLimit: 1000, pageOffset: am * 1000 })
      console.log('Getting page', am)
      for (let item of list.rows) {
        const nft = collectionMetadata.find(row => item.metadata.name === `${row.name}.png`)
        console.log('NFT is', nft)
        hashedCollectionMetadata.push({
          ...nft,
          image: 'https://gateway.pinata.cloud/ipfs/' + item.ipfs_pin_hash
        })
      }
      // for (let item of collectionMetadata) {
      //   const hash = list.rows.find(row => row.metadata.name === `${item.name}.png`)
      //   // if (!hash) {
      //   //   console.log(item)
      //   // }
      //   // console.log('hash is', hash)
      // }
    }
    // list.rows.forEach(row => {
    //   // ipfs_pin_hash
    //   const element = row.metadata.name
    // })
    require('fs').writeFileSync(
      'collection/_metadata.json',
      JSON.stringify(hashedCollectionMetadata)
    )
    res.send('OK')
    // console.log('[*] About to update %d files', collectionMetadata.length)
    // for await (let item of collectionMetadata.filter((_, index) => index > 9000)) {
    //   const { IpfsHash } = await pinata.pinFromFS(`collection/${item.name}.png`)
    //   hashedCollectionMetadata.push({
    //     ...item,
    //     image: 'https://gateway.pinata.cloud/ipfs/' + IpfsHash
    //   })
    //   // await require('fs').promises.writeFile('collection/_cache.json', JSON.stringify(hashedCollectionMetadata))
    //   console.log('[*] Uploaded: ', item.name, IpfsHash)
    // }

  } catch (err) {
    console.log(err)
    // res.status(503).json({ err })
  }
}
