import { atom } from 'jotai'
import { ethers } from 'ethers'
import BerlinYonkies from '../artifacts/contracts/NFT.sol/BerlinYonkies.json'
const contractAddress = process.env.CONTRACT_ADDRESS
const isOpen = process.env.IS_OPEN

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

const chains = {
  80001: {
    // mumbai
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x13881',
        rpcUrls: ['https://rpc-mainnet.matic.network/'],
        chainName: 'Matic Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    ]
  },
  137: {
    //polygon mainnet
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x89',
        rpcUrls: ['https://rpc-mainnet.matic.network/'],
        chainName: 'Matic Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    ]
  },
  31337: {
    //polygon mainnet
    method: 'wallet_addEthereumChain',
    params: [
      {
        // chainId: 31337,
        rpcUrls: ['http://127.0.0.1:8545/'],
        chainName: 'HARDHAT',
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18
        },
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    ]
  }
}

async function getInterfaces (provider) {
  const { chainId } = await provider.getNetwork()
  console.log(chainId)
  // Please choose correct network
  if (chainId !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
    alert('Please change your network to Polygon')
    await window.ethereum.request(chains[process.env.NEXT_PUBLIC_CHAIN_ID])
  }
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    BerlinYonkies.abi,
    provider
  )
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
    price: ethers.utils.formatEther(tokenPrice),
    paused
  }
}

const store = atom({
  signer: {},
  contract: {}
})

export { getInterfaces, store, requestAccount }
