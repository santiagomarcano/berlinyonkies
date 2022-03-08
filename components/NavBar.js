import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { getInterfaces, requestAccount, store } from '../store'
import Button from './Button'
import Modal from './Modal'

export default function NavBar () {
  const [
    { contract, signer, contractBalance, tokenPrice, paused, price },
    setInterfaces
  ] = useAtom(store)
  const [provider, setProvider] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const [isOpen, setIsOpen] = useState({ children: null })

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      connectWallet()
    }
  }, [])

  async function connectWallet () {
    const p = await requestAccount()
    setProvider(p)
    if (!p) {
      setIsOpen({
        children: (
          <div className='w-1/2 p-4 rounded-md bg-bolive custom-shadow '>
            <h4 className='mb-2 text-2xl text-white font-pixel'>
              INSTALL METAMASK
            </h4>
            <div className='mb-2 text-white'>
              In order to mint your tokens you need to install Metamask
            </div>
            <Button
              label='INSTALL METAMASK'
              className='w-full mr-2'
              onClick={() =>
                window.open(
                  'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
                  '_blank'
                )
              }
            />
          </div>
        )
      })
      return
    }
    initializeWeb3Stuff(p)
  }

  async function initializeWeb3Stuff (p) {
    const int = await getInterfaces(p)
    int.contract.removeAllListeners()
    int.contract.on('Minted', () => {
      setTransaction(null)
      const balances = [
        int.contract.balanceOf(int.signer.address),
        provider.getBalance(int.contract.address)
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
    const price = await int.contract.getPrice()
    // setTimeout(() => {
    setInterfaces({ price, ...int })
    // }, 1500)
  }

  async function handleFreeMint () {
    try {
      const result = await contract
        .connect(signer.instance)
        .freeMint(signer.address)
      setTransaction(result.hash)
      setIsOpen({
        children: (
          <div className='w-1/2 p-4 rounded-md bg-bolive custom-shadow '>
            <h5 className='mb-2 font-bold tracking-widest text-white uppercase'>
              Congratulations
            </h5>
            <h4 className='mb-2 text-2xl font-pixel text-gradient'>
              YOUR NFT IS ON ITS WAY
            </h4>
            <div className='mb-2 text-white'>
              Join our discord channel for updates
            </div>
            <Button
              label='DISCORD'
              className='w-full mr-2'
              onClick={() =>
                window.open('https://discord.gg/S3vYkkr7', '_blank')
              }
            />
          </div>
        )
      })
    } catch (err) {
      console.log(err)
      // if (
      //   (err.message && err.message.includes('Maxed freemint')) ||
      //   (err.data && err.data.message.includes('Maxed freemint'))
      // ) {
      //   alert('You already did that')
      // }
      // if (
      //   (err.data && err.data.message.includes('Sorry, paused minting :(')) ||
      //   (err.message && err.message.includes('Sorry, paused minting :('))
      // ) {
      //   alert('Paused minting')
      // }
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
      setIsOpen(true)
    } catch (err) {
      console.log(err)
      // if (err.data.message.includes('Sorry, paused minting :(')) {
      //   alert('Paused minting')
      // }
    }
  }

  return (
    <nav
      className={`flex p-4 tracking-widest font-pixel text-primary h-nav ${
        contract.address || !provider ? 'scaleIn' : 'opacity-0'
      } ${provider ? 'justify-between' : 'justify-end'}`}
    >
      {provider ? (
        <>
          <h2 className='text-4xl'>BYK - {signer.balance}</h2>
          <div className='flex'>
            <Button
              onClick={handleFreeMint}
              label='Free Mint'
              className='w-full mr-2'
            />
            <Button
              label={`MINT \n ${price && ethers.utils.formatEther(price)}`}
              className='w-full bg-grullo'
              onClick={handleMint}
            />
          </div>
        </>
      ) : (
        <div className='flex justify-end delayed'>
          <Button
            label='Connect Wallet'
            className='w-full bg-grullo'
            onClick={connectWallet}
          />
        </div>
      )}
      <Modal isOpen={isOpen.children} onClose={() => setIsOpen(false)}>
        {isOpen.children}
      </Modal>
    </nav>
  )
}
