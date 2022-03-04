import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { getInterfaces, store } from '../store'
import { ethers } from 'ethers'
import Image from 'next/image'
import avatar from '../assets/images/14.png'
console.log(ReactDOM)
function NavBar () {
  const [
    { contract, signer, contractBalance, provider, tokenPrice, paused, price },
    setInterfaces
  ] = useAtom(store)
  const [transaction, setTransaction] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

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
      const price = await int.contract.getPrice()
      setInterfaces({ price, ...int })
    })()
  }, [])

  async function handleFreeMint () {
    try {
      const result = await contract
        .connect(signer.instance)
        .freeMint(signer.address)
      setTransaction(result.hash)
      setIsOpen(true)
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
    <nav className='flex justify-between p-4 tracking-widest font-pixel text-primary'>
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
      <Modal
        isOpen={isOpen}
        message={'is open'}
        onClose={() => setIsOpen(false)}
      />
    </nav>
  )
}

function Button ({ label, className, ...rest }) {
  return (
    <button
      {...rest}
      className={`p-2 text-2xl text-black uppercase transition-colors rounded-md bg-primary font-pixel hover:bg-white duration-normal ${className}`}
    >
      {label}
    </button>
  )
}

const Modal = ({ message, isOpen, onClose, children }) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 flex items-center justify-center fadeIn'
      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      data-parent={true}
      onClick={e => {
        if (e.target.getAttribute('data-parent')) {
          onClose()
        }
      }}
    >
      <div className='w-1/2 p-4 rounded-md bg-bolive custom-shadow '>
        <h5 className='mb-2 font-bold tracking-widest text-white uppercase'>
          Congratulations
        </h5>
        <h4 className='mb-2 text-2xl font-pixel text-gradient'>
          YOUR NFT IS ON ITS WAY
        </h4>
        {/* {transaction && (
          <div className='tracking-widest text-white uppercase'>
            Transaction: {transaction}
          </div>
        )} */}
        <div className='mb-2 text-white'>
          Join our discord channel for updates
        </div>
        <Button
          label='DISCORD'
          className='w-full mr-2'
          onClick={() => window.open('https://discord.gg/S3vYkkr7', '_blank')}
        />
      </div>
    </div>,
    document.body
  )
}

function Main () {
  return (
    <main className='flex flex-col items-center justify-center h-full px-4'>
      <div className='w-1/4 mb-4 overflow-hidden rounded-full'>
        <Image
          src={avatar.src}
          width='100%'
          height='100%'
          layout='responsive'
        />
      </div>
      <h1 className='mb-4 text-6xl tracking-widest font-pixel text-gradient'>
        BERLIN YONKIES
      </h1>
      <h3 className='text-xl italic tracking-widest text-center text-white uppercase font-hubballi'>
        Son los mismos drogadictos de toda la vida pero..... <br />
        <span className='underline font-boldest'>los volvimos NFT</span>
      </h3>
    </main>
  )
}

function Landing () {
  return (
    <div className='min-h-screen fadeIn'>
      <NavBar />
      <Main />
    </div>
  )
}

export default Landing
