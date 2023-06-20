import MobileWrapper from '@/components/MobileWrapper'
import { useEffect, useState } from 'react'
import Devit from '@/components/Devit'

export default function Home () {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])
  return (
    <MobileWrapper>
      <header className="w-full flex justify-start items-center h-12 border-b-[1px] border-solid border-gray-800 sticky top-0 bg-white bg-opacity-20">
        <strong className="ml-2">Inicio</strong>
      </header>

      <section className="h-[calc(100%-3rem)] overflow-auto">
        {timeline.map((tweet) => (
          <Devit
            key={tweet.id}
            img={tweet.photoURL}
            name={tweet.name}
            username={tweet.username}
            message={tweet.message}
          />
        ))}
      </section>

      <nav className="w-full h-12 flex justify-start items-center absolute bottom-0 border-t-[1px] border-solid border-gray-800 sm:rounded-b-lg bg-white"></nav>
    </MobileWrapper>
  )
}
