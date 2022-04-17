export default function handler (req, res) {
  return res.json({
    name: 'Berlin Yonkies',
    description: 'Berlin Yonkies is a 10,000 NFT Art Collection inspired by the Berlin Nightlife powered by the Polygon Network and listed in OpenSea.',
    image: 'https://www.berlinyonkies.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslide-3.60f6fc3a.png&w=3840&q=75',
    external_link: 'https://berlinyonkies.com',
    fee_recipient: '0xff948cBa5d0b1Ae75b5010FeCE5f283Dd85b0C83'
  })
}
