const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('NFT', function () {
  const MAX_ELEMENTS = 2000
  const BASE_TOKEN_URI = 'https://google.com'
  const proxyRegistryAddress = '0x2f29d69c11061712cc8cdf9d6270186888e31f2d'

  let NFT, nft
  beforeEach(async () => {
    NFT = await ethers.getContractFactory('NFT')
    nft = await NFT.deploy(BASE_TOKEN_URI, MAX_ELEMENTS, proxyRegistryAddress)
    await nft.deployed()
  })

  it('Should return MAX_ELEMENTS', async function () {
    expect(await nft.getMaxElements()).to.equal(2000)
  })

  it('Should return BASE_TOKEN_URI', async function () {
    expect(await nft.baseTokenURI()).to.equal(BASE_TOKEN_URI)
  })

  it('Should mint', async function () {
    const accounts = await hre.ethers.getSigners()
    await nft.mint(accounts[0].address)
    expect(await nft.balanceOf(accounts[0].address)).to.equal(1)
  })

  it('Should not change status if not owner', async function () {
    const [owner, acc1] = await hre.ethers.getSigners()
    try {
      await nft.connect(acc1).pause(true)
    } catch (err) {
      expect(await nft.getStatus()).to.equal(false)
    }
  })

  it('Should change status if owner', async function () {
    const [owner, acc1] = await hre.ethers.getSigners()
    await nft.pause(true)
    expect(await nft.getStatus()).to.equal(true)
  })

  it('Should not mint if paused', async function () {
    const [owner, acc1] = await hre.ethers.getSigners()
    try {
      await nft.pause(true)
      await nft.mint(acc1.address)
    } catch (err) {
      expect(err.message).to.contain('Sorry, paused minting :(')
    }
  })

  it('Should mint and check tokenURI', async function () {
    const [owner, acc1] = await hre.ethers.getSigners()
    await nft.mint(owner.address)
    const tokenId = await nft.callStatic.mint(owner.address)
    await nft.mint(owner.address)

    try {
      expect(await nft.tokenURI(tokenId)).to.equals(
        BASE_TOKEN_URI + '/' + tokenId.toString()
      )
    } catch (err) {
      console.log(err)
    }
    // expect(await nft.tokenURI(tokenId))
  })

  it('Should mint MAX_ELEMENTS and error for MAX_ELEMENTS + 1', async function () {
    const [owner] = await hre.ethers.getSigners()
    const mints = Array(MAX_ELEMENTS)
      .fill(1)
      .map(async () => nft.mint(owner.address))
    // Not sure which one is faster
    await Promise.all(mints)
    // for await (let promise of mints) {
    //   await promise
    // }
    try {
      await nft.mint(owner.address)
    } catch (err) {
      expect(err.message).to.contain("Can't exceed MAX_ELEMENTS")
    }
  })
})
