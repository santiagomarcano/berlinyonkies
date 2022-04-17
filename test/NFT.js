const { expect } = require('chai')
const { ethers, waffle } = require('hardhat')
const { BigNumber } = require('ethers')

const provider = waffle.provider

describe('NFT', function () {
  const name = 'Berlin Yonkies'
  const symbol = 'BYK'
  const royaltiesAddress = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
  const beneficiaryAddress = '0x2f29d69c11061712cc8cdf9d6270186888e31f2d'
  const MAX_ELEMENTS = 10000
  const MAX_FREE_MINT_ELEMENTS = 1000
  const PRICE = BigNumber.from('2000000000000000000')
  const BASE_TOKEN_URI = 'https://berlinyonkies.com/api/metadata'
  const proxyRegistryAddress = '0x58807bad0b376efc12f5ad86aac70e78ed67deae'

  let NFT, nft
  beforeEach(async () => {
    NFT = await ethers.getContractFactory('BerlinYonkies')
    nft = await NFT.deploy(
      name,
      symbol,
      royaltiesAddress,
      beneficiaryAddress,
      BASE_TOKEN_URI,
      MAX_ELEMENTS,
      MAX_FREE_MINT_ELEMENTS,
      PRICE,
      proxyRegistryAddress
    )
    await nft.deployed()
  })

  it('Should return MAX_ELEMENTS', async function () {
    expect(await nft.getMaxElements()).to.equal(MAX_ELEMENTS)
  })

  it('Should return BASE_TOKEN_URI', async function () {
    expect(await nft.baseTokenURI()).to.equal(BASE_TOKEN_URI)
  })

  it('Should free mint', async function () {
    const accounts = await hre.ethers.getSigners()
    await nft.freeMint()
    expect(await nft.balanceOf(accounts[0].address)).to.equal(1)
  })

  it('Should prevent free mint if MAX_FREE_MINT_ELEMENTS is reached', async () => {
    const accounts = await hre.ethers.getSigners()

    try {
      await nft.connect(accounts[2]).freeMint()
      await nft.connect(accounts[3]).freeMint()
      await nft.connect(accounts[4]).freeMint()
      // console.log('TRY!!')
      console.log('Heree')
    } catch (err) {
      console.log('In error', err)
      expect(err.message).to.contain('Maxed freemint')
    }

    // expect(await nft.balanceOf(accounts[0].address)).to.equal(1)
  })

  it('Should mint', async function () {
    const accounts = await hre.ethers.getSigners()
    await nft.mint({
      value: PRICE
    })
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
      await nft.mint({
        value: PRICE
      })
    } catch (err) {
      expect(err.message).to.contain('Sorry, paused minting :(')
    }
  })

  it('Should mint and check tokenURI', async function () {
    const [owner, acc1] = await hre.ethers.getSigners()
    await nft.mint({
      value: PRICE
    })
    // static just to retreive returns value
    const tokenId = await nft.callStatic.mint({
      value: PRICE
    })
    await nft.mint({
      value: PRICE
    })

    try {
      expect(await nft.tokenURI(tokenId)).to.equals(
        BASE_TOKEN_URI + '/' + tokenId.toString()
      )
    } catch (err) {
      console.log(err)
    }
  })

  // it('Should mint MAX_ELEMENTS and error for MAX_ELEMENTS + 1', async function () {
  //   const [owner] = await hre.ethers.getSigners()
  //   const mints = Array(MAX_ELEMENTS)
  //     .fill(1)
  //     .map(async () => nft.mint(owner.address))
  //   // Not sure which one is faster
  //   await Promise.all(mints)
  //   // for await (let promise of mints) {
  //   //   await promise
  //   // }
  //   try {
  //     await nft.mint(owner.address)
  //   } catch (err) {
  //     expect(err.message).to.contain("Can't exceed MAX_ELEMENTS")
  //   }
  // })

  it('should transfer minted token', async () => {
    const [owner, acc1] = await hre.ethers.getSigners()
    // static just to retreive returns value
    const tokenId = await nft.callStatic.mint({
      value: PRICE
    })
    await nft.mint({
      value: PRICE
    })

    await nft.connect(owner).approve(nft.address, tokenId)
    await nft['safeTransferFrom(address,address,uint256)'](
      owner.address,
      acc1.address,
      tokenId
    )
    expect(await nft.balanceOf(acc1.address)).to.equal(1)
    expect(await nft.ownerOf(tokenId)).to.equal(acc1.address)
  })
})
