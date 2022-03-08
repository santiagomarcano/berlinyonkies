import { atom } from 'jotai'
import { ethers } from 'ethers'
import BerlinYonkies from '../artifacts/contracts/NFT.sol/BerlinYonkies.json'
const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

async function requestAccount () {
  try {
    // Prompt user for account connections
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      await provider.send('eth_requestAccounts', [])
      return provider
    } else {
      return false
    }
  } catch (error) {
    console.log('error')
    console.error(error)
    alert('Login to Metamask first')
  }
}

async function getInterfaces (provider) {
  const contract = new ethers.Contract(
    contractAddress,
    BerlinYonkies.abi,
    provider
  )
  console.log('provider is', provider)
  const signerInstance = provider.getSigner()
  const address = await signerInstance.getAddress()
  const balance = await contract.balanceOf(address)
  const contractBalance = await provider.getBalance(contract.address)
  const tokenPrice = await contract.getPrice()
  const owner = await contract.owner()
  const paused = await contract.getStatus()
  // for await (let [name, cb] of events) {
  //   console.log(`[*] Registered ${name} event`)
  //   await contract.on(name, cb)
  // }
  return {
    signer: {
      instance: signerInstance,
      balance: balance.toString(),
      address,
      isOwner: owner === address
    },
    contract,
    contractBalance: ethers.utils.formatEther(contractBalance),
    tokenPrice: ethers.utils.formatEther(tokenPrice),
    paused
  }
}

const store = atom({
  signer: {},
  contract: {}
})

export { getInterfaces, store, requestAccount }
