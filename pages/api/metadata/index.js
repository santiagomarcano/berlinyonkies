export default function handler (req, res) {
  return res.json({
    name: 'The Bad Yonkies',
    description: '.....',
    image: 'https://openseacreatures.io/image.png',
    external_link: 'https://openseacreatures.io',
    seller_fee_basis_points: 100,
    fee_recipient: '0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721'
  })
}
