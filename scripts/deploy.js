// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require('ethers')
const { ethers } = require('hardhat')
const hre = require('hardhat')

async function main () {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const name = 'Berlin Yonkies'
  const symbol = 'BYK'
  const royaltiesAddress = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
  const beneficiaryAddress = '0x2f29d69c11061712cc8cdf9d6270186888e31f2d'
  const MAX_ELEMENTS = 2000
  const PRICE = BigNumber.from('25000000000000000')
  const BASE_TOKEN_URI = 'https://the-bad-yonkies.vercel.app/api/metadata'
  const proxyRegistryAddress = '0x58807bad0b376efc12f5ad86aac70e78ed67deae'

  // We get the contract to deploy
  const NFT = await hre.ethers.getContractFactory('BerlinYonkies')
  const nft = await NFT.deploy(
    name,
    symbol,
    royaltiesAddress,
    beneficiaryAddress,
    BASE_TOKEN_URI,
    MAX_ELEMENTS,
    PRICE, // 0.025 Ether
    proxyRegistryAddress
  )

  await nft.deployed()

  console.log('NFT deployed to:', nft.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
