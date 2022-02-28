import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { getInterfaces, store } from '../store'
import { ethers } from 'ethers'

function Mint () {
  // const search = new URLSearchParams(window.location.search)
  const [
    { contract, signer, contractBalance, provider, tokenPrice, paused },
    setInterfaces
  ] = useAtom(store)
  const [transaction, setTransaction] = useState(null)

  useEffect(() => {
    ;(async () => {
      const int = await getInterfaces()
      int.contract.removeAllListeners()
      int.contract.on('Minted', () => {
        console.log('Minted event')
        setTransaction(null)
        const balances = [
          int.contract.balanceOf(int.signer.address),
          int.provider.getBalance(int.contract.address)
        ]
        Promise.all(balances).then(([signerBalance, contractBalance]) => {
          setInterfaces(prev => {
            const next = {
              ...prev,
              signer: {
                ...prev.signer,
                balance: signerBalance.toString()
              },
              contractBalance: ethers.utils.formatEther(contractBalance)
            }
            return next
          })
        })
      })
      setInterfaces(int)
    })()
  }, [])

  async function handleFreeMint () {
    try {
      const result = await contract
        .connect(signer.instance)
        .freeMint(signer.address)
      setTransaction(result.hash)
    } catch (err) {
      if (
        (err.message && err.message.includes('Maxed freemint')) ||
        (err.data && err.data.message.includes('Maxed freemint'))
      ) {
        alert('You already did that')
      }
      if (err.data.message.includes('Sorry, paused minting :(')) {
        alert('Paused minting')
      }
    }
  }

  async function handleMint () {
    try {
      const price = await contract.getPrice()
      const result = await contract
        .connect(signer.instance)
        .mint(signer.address, {
          value: ethers.BigNumber.from(price.toString())
        })
      setTransaction(result.hash)
    } catch (err) {
      if (err.data.message.includes('Sorry, paused minting :(')) {
        alert('Paused minting')
      }
    }
  }

  async function handlePause () {
    try {
      await contract.connect(signer.instance).pause(!paused)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <div>Paused {paused ? 'YES' : 'NO'}</div>
      <div>Owner {signer.isOwner ? 'YES' : 'NO'}</div>
      <div>Your NFT Balance: {signer.balance}</div>
      <div>Your address: {signer.address}</div>
      <div>Contract Balance: {contractBalance}</div>
      <div>Token price: {tokenPrice}</div>
      <div>Contract address: {contract.address}</div>
      {transaction && <div>Current transaction: {transaction}</div>}
      {signer.isOwner && <button onClick={handlePause}>Pause</button>}

      <button onClick={handleFreeMint}>Free Mint!</button>
      <button onClick={handleMint}>Paid mint</button>
    </>
  )
}

export default Mint
