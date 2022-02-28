import { atom } from 'jotai'
import { ethers } from 'ethers'
import TheBadYonkies from '../artifacts/contracts/NFT.sol/TheBadYonkies.json'
const contractAddress = '0x0b7089dd3a6ce4c8bd8f62b70cafe215fbbebd32'

async function requestAccount (provider) {
  try {
    // Prompt user for account connections
    await provider.send('eth_requestAccounts', [])
  } catch (error) {
    console.log('error')
    console.error(error)
    alert('Login to Metamask first')
  }
}

async function getInterfaces () {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const contract = new ethers.Contract(
      contractAddress,
      TheBadYonkies.abi,
      provider
    )
    const signerInstance = provider.getSigner()
    await requestAccount(provider)
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
      paused,
      provider
    }
  } else {
    alert('Please install Metamask before')
  }
}

const store = atom({
  signer: {},
  contract: {}
})

export { getInterfaces, store }
