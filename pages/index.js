import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import NavBar from '../components/NavBar'

var RELEASE_DATE = new Date('2022-04-17 00:00')
var RELEASE_DATE_UTC = Date.UTC(
  RELEASE_DATE.getUTCFullYear(),
  RELEASE_DATE.getUTCMonth(),
  RELEASE_DATE.getUTCDate(),
  RELEASE_DATE.getUTCHours(),
  RELEASE_DATE.getUTCMinutes(),
  RELEASE_DATE.getUTCSeconds()
)

function Landing () {
  const [countDown, setCountDown] = useState({})

  useEffect(() => {
    setInterval(() => {
      const NOW = new Date()
      var NOW_UTC = Date.UTC(
        NOW.getUTCFullYear(),
        NOW.getUTCMonth(),
        NOW.getUTCDate(),
        NOW.getUTCHours(),
        NOW.getUTCMinutes(),
        NOW.getUTCSeconds()
      )
      const diffTime = Math.abs(RELEASE_DATE - NOW_UTC)
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      // const diffHours = Math.abs(
      //   Math.ceil(diffTime / (1000 * 60 * 60) - diffDays * 24)
      // )
      // const diffMinutes = Math.abs(
      //   Math.ceil(diffTime / (1000 * 60 * 60 * 60) - diffDays * 24 * 60)
      // )
      const diffSeconds = Math.ceil(diffTime / 1000)
      setCountDown({
        date: `${RELEASE_DATE.getDate()}-0${RELEASE_DATE.getMonth() +
          1}-${RELEASE_DATE.getFullYear()}`,
        seconds: diffSeconds
      })
    }, 1000)
  }, [])

  return (
    <div className='min-h-screen'>
      <div
        className='fixed top-0 left-0 right-0 bg-black delayed fadeIn z-10'
      >
        <NavBar countDown={countDown} />
      </div>
      <div className='slideIn'>
        <Main />
      </div>
    </div>
  )
}

export default Landing
