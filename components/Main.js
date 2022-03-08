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
    <main className='flex flex-col items-center justify-center h-full px-4 min-h-main'>
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
                  className='transition-opacity duration-1000 rounded-full'
                />
              </div>
            )
          }
        })}
      </div>
      <h1 className='mb-4 text-6xl tracking-widest text-center font-pixel text-gradient'>
        BERLIN YONKIES
      </h1>
      <h3 className='text-xl font-bold tracking-widest text-center text-white uppercase font-hubballi'>
        Son los mismos drogadictos de toda la vida pero..... <br />
        <span className='underline font-boldest'>los volvimos NFT</span>
      </h3>
    </main>
  )
}
