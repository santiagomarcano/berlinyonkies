import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import slide1 from '../assets/images/slide-1.png'
import slide2 from '../assets/images/slide-2.png'
import slide3 from '../assets/images/slide-3.png'
import slide4 from '../assets/images/slide-4.png'
import slide5 from '../assets/images/slide-5.png'
import slide6 from '../assets/images/slide-6.png'
import slide7 from '../assets/images/slide-7.png'
import slide8 from '../assets/images/slide-8.png'
import banner from '../assets/images/banner.png'
import SocialMedia from './SocialMedia'
import nftCalendarLogo from '../assets/images/nft-calendar.svg'

const slideImages = [
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8
]

export default function Main () {
  const imageRef = useRef()
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (current) {
      imageRef.current.style.transform = 'scale(1)'
      imageRef.current.querySelector('img').style.opacity = '1'
    }
  }, [current])
  useEffect(() => {
    const int = setInterval(() => {
      imageRef.current.style.transform = 'scale(0.5)'
      imageRef.current.querySelector('img').style.opacity = '0'
      setTimeout(() => {
        setCurrent(prev => {
          if (prev === slideImages.length - 1) {
            return 1
          }
          return prev + 1
        })
      }, 1000)
    }, 5000)
    return () => {
      clearInterval(int)
    }
  }, [])
  return (
    <>
      {/* <div
        className='absolute top-0 w-full h-full banner'
        style={{ backgroundImage: `url(${banner.src})` }}
      ></div> */}
      <main
        className='flex flex-col items-center justify-center h-full px-4 min-h-main'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-1/2 mb-4 overflow-hidden rounded-full md:w-1/4'>
          {slideImages.map((slide, index) => {
            if (current === index) {
              return (
                <div
                  className='transition-all duration-1000 rounded-full'
                  ref={imageRef}
                  key={slide}
                >
                  <Image
                    src={slide.src}
                    width='100%'
                    height='100%'
                    layout='responsive'
                    className='transition-opacity duration-1000 rounded-full delaye4'
                  />
                </div>
              )
            }
          })}
        </div>
        <div className='text-base'>
          <h1 className='mb-4 text-3xl tracking-widest text-center md:text-6xl font-pixel text-gradient'>
            BERLIN YONKIES
          </h1>
          <h3 className='max-w-4xl font-sans text-base text-xl font-bold tracking-widest text-center text-white uppercase'>
            <span className='text-base font-bold font-sansbold text-gradient'>
              Berlin Yonkies
            </span>{' '}
            <span className='text-base'>
              is a 10,000 NFT Art Collection inspired by the Berlin Nightlife
              powered by the
            </span>{' '}
            <span
              className='text-base font-bold font-sansbold'
              style={{ color: '#8347E5' }}
            >
              Polygon
            </span>{' '}
            <span className='text-base'>
              Network and listed <br /> in <span>OpenSea</span> and{' '}
              <span>Rariable</span>
            </span>
          </h3>
        </div>
      </main>
      {/* <div className='absolute relative left-0 right-0 flex justify-center w-full h-24 h-full cursor-pointer bounce text-gradient'>
        <div className='relative'>
          <div
            className='absolute inset-0 w-full rounded-full bg-grullo'
            style={{
              width: 24,
              height: 3,
              transform: ' translateX(8px) rotate(-45deg)'
            }}
          ></div>
          <div
            className='absolute inset-0 w-full rounded-full bg-grullo'
            style={{
              width: 24,
              height: 3,
              transform: 'translateX(-8px) rotate(45deg)'
            }}
          ></div>
        </div>
      </div> */}
      <section className='flex flex-col items-center'>
        <div className='flex mx-8 mb-24'>
          {slideImages
            .filter((i, index) => index < 3)
            .map(image => (
              <div className='w-full mr-4' key={image.src}>
                <img src={image.src} />
              </div>
            ))}
        </div>
        <span className='mb-8 text-2xl tracking-widest text-center text-white uppercase md:text-4xl font-pixel text-gradient'>
          Designer’s words
        </span>
        <p className='max-w-4xl px-4 leading-loose text-center text-white md:text-lg md:px-0'>
          “During my trip in Berlin I was fascinated by its Nightlife, wild and
          respectful at the same time, rebellious but also educated. I’m not
          just talking about the parties and the bars, even the squares,
          streets, and parks were wandered by the locals, with their interesting
          looks and a great variety of styles, but all with the same Berlin
          essence. The images of the people in the Berlin Nightlife kept stored
          in my mind, and that’s what I try to transmit with this NFT Art
          Collection”
        </p>
      </section>
      <section className='flex flex-col justify-center'>
        <h3 className='my-12 text-2xl text-center uppercase md:text-3xl font-pixel text-screamingreen'>
          Powered by
        </h3>
        <div className='flex justify-center'>
          <div className='mx-2 w-50 md:w-100'>
            <img
              style={{ width: '100%' }}
              src='https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg'
            />
          </div>
          <div className='mx-2 w-50 md:w-100'>
            <img
              style={{ width: '100%' }}
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png?20201112074605'
            />
          </div>
          <div className='mx-2 w-50 md:w-100'>
            <svg
              style={{ width: '100%', fill: '#8247e5' }}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 38.4 33.5'
              // style='enable-background:new 0 0 38.4 33.5'
              // xml:space='preserve'
            >
              <path
                d='M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0L5 16.3c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0L16 7.2c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V7c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5C.4 5.4 0 6.2 0 7v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1L29 28.8c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1V21l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z'
                // style='fill:#8247e5'
              />
            </svg>
          </div>
        </div>
        <a href='https://nftcalendar.io/event/berlin-yonkies-nft-art-collection-free-mint-first-1000-collectibles-support-art-support-the-future-1/' target="_blank">
          <div className='flex flex-col items-center justify-center my-4 text-xl'>
            <h3 className='text-center uppercase text-screamingreen font-pixel'>
              As seen on
            </h3>
            <img className='w-1/4' src={nftCalendarLogo.src} />
          </div>
        </a>
      </section>
      <footer className='flex flex-col items-center justify-center w-full mb-24 mt-18'>
        <h3 className='px-2 mb-12 text-2xl text-center md:text-3xl font-pixel text-screamingreen md:px-0'>
          Join our community
        </h3>
        <SocialMedia />
      </footer>
    </>
  )
}
