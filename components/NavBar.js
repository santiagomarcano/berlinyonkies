import { ethers } from 'ethers'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { getInterfaces, requestAccount, store } from '../store'
import Button from './Button'
import Modal from './Modal'
import SocialMedia from './SocialMedia'

const OPEN_SALES = !!Number(process.env.NEXT_PUBLIC_IS_OPEN)

export default function NavBar ({ countDown }) {
  const [
    { contract, signer, contractBalance, tokenPrice, paused, price },
    setInterfaces
  ] = useAtom(store)
  const [provider, setProvider] = useState(null)
  const [transaction, setTransaction] = useState(null)
  const [isOpen, setIsOpen] = useState({ children: null })

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && OPEN_SALES) {
      connectWallet()
    }
  }, [])

  
  async function connectWallet () {
    const p = await requestAccount()
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
    setProvider(p)
    setInterfaces(await getInterfaces(p))
  }

  async function handleFreeMint () {
    try {
      const result = await contract
        .connect(signer.instance)
        .freeMint()
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
      if (
        (err.message && err.message.includes('Maxed freemint')) ||
        (err.data && err.data.message.includes('Maxed freemint'))
      ) {
        alert('You already did that')
      }
      if (
        (err.data && err.data.message.includes('Sorry, paused minting :(')) ||
        (err.message && err.message.includes('Sorry, paused minting :('))
      ) {
        alert('Paused minting')
      }
    }
  }

  async function handleMint () {
    try {
      const price = await contract.getPrice()
      const result = await contract
        .connect(signer.instance)
        .mint({
          value: ethers.BigNumber.from(price.toString())
        })
      setTransaction(result.hash)
      setIsOpen(true)
    } catch (err) {
      if (err.data.message.includes('Sorry, paused minting :(')) {
        alert('Paused minting')
      }
      if (err.data.message.includes('insufficient funds')) {
        alert('Insufficient funds')
      }
      
    }
  }
  async function handlePauseMint() {
    try {
      const result = await contract.connect(signer.instance).pause(!paused)
      alert(result)
    } catch (err) {
      alert(err)
      // if (err.data.message.includes('Sorry, paused minting :(')) {
      //   alert('Paused minting')
      // }
    }
  }
  return (
    <nav
      className={`flex tracking-widest font-pixel items-center text-primary bg-black h-nav px-2 ${
        contract.address || !provider ? 'scaleIn' : 'opacity-1'
      } justify-between`}
    >
      {!OPEN_SALES ? (
        <>
          <SocialMedia />
          <div className='flex flex-col items-end'>
            <h2 className='text-sm text-right text-white md:text-2xl'>
              Mint Date: {countDown.date}
            </h2>
            <h3 className='text-sm text-right md:text-2xl text-gradient'>
              Seconds left: {countDown.seconds}
            </h3>
          </div>
        </>
      ) : (
        <>
          {provider ? (
            <>
              <h2 className='text-4xl'>BYK - {signer.balance || 0}</h2>
              <div className='flex'>
                <Button
                  onClick={handleFreeMint}
                  label='Free Mint'
                  className='w-full mr-2'
                />
                <Button
                  label={`MINT \n ${price ? price : ''}`}
                  className='w-full bg-grullo'
                  onClick={handleMint}
                />
                {
                  signer.isOwner && <Button label={paused ? 'Start' : 'Pause'} onClick={handlePauseMint} className='ml-2 w-full bg-grullo'></Button>
                }
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
        </>
      )}
      <Modal isOpen={isOpen.children} onClose={() => setIsOpen(false)}>
        {isOpen.children}
      </Modal>
    </nav>
  )
}
