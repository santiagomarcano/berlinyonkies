import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

const contractAddress = '0xb20815eee0efc23b8c9fdd9ad002b2bc2f03d10a'
// // Show metamask for users to decide if they will pay or not
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

function safeWindow () {
  if (typeof window !== 'undefined') {
    return window
  }
  return {}
}

function Mint () {
  const [contract, setContract] = useState(null)
  const [signer, setSigner] = useState(null)
  const [balance, setBalance] = useState(null)
  useEffect(() => {
    ;(async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, NFT.abi, provider)
        const signerInstance = provider.getSigner()
        await requestAccount(provider)
        setSigner(signerInstance)
        setContract(contract)
        const balanceOf = await contract.balanceOf(
          await signerInstance.getAddress()
        )
        setBalance(balanceOf.toString())
      }
    })()
  }, [])

  async function handleMint () {
    const address = await signer.getAddress()
    await contract.connect(signer).mint(address)
  }

  return (
    <>
      {balance && <div>{balance}</div>}
      <button onClick={handleMint}>Mint!</button>
    </>
  )
}

export default Mint
