import { useEffect, useState } from 'react'
import Devit from '@/components/Devit'
import useUser from '@/hooks/useUser'
import { listenLatestDevits } from '@/firebase/client'
import Create from '@/components/Icons/Create'
import Link from 'next/link'
import HomeSVG from '@/components/Icons/Home'
import Search from '@/components/Icons/Search'
import Head from 'next/head'

export default function Home () {
  const [timeline, setTimeline] = useState([])
  const { user } = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }

    // se limpia la subscripcion (listen) cuando se desmonta componente
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio | Devter</title>
      </Head>
      <header className="w-full flex flex-row justify-start items-center h-14 border-b-[1px] border-solid border-gray-300 sticky top-0 bg-white bg-opacity-20">
          <strong className="ml-2">Inicio</strong>
      </header>

      <section className="h-[calc(100%-3rem)] overflow-auto">
        {
          timeline && timeline.map((devit) => {
            const { username, avatar, content, id, userId, createdAt, imgURL } = devit
            return <Devit
              key={id}
              id={id}
              avatar={avatar}
              imgURL={imgURL}
              username={username}
              content={content}
              userId={userId}
              createdAt={createdAt}
            />
          })
        }
      </section>

      <nav className="w-full h-12 flex flex-row justify-evenly items-center border-t-[1px] border-solid border-gray-300 sm:rounded-b-lg bg-white">
        <Link href='/compose/tweet'>
          <p>
            <HomeSVG width={32} height={32} stroke='#09f'/>
          </p>
        </Link>
        <Link href='/compose/tweet'>
          <p>
            <Search width={32} height={32} stroke='#09f'/>
          </p>
        </Link>
        <Link href='/compose/tweet'>
          <p>
            <Create width={32} height={32} stroke='#09f'/>
          </p>
        </Link>
      </nav>

      {/* <Button handleClick={() => router.replace('/compose/tweet')} classes='bg-sky-600 text-white absolute bottom-16 right-7 px-3 py-3' title='Devitear'>
        <Create width={32} height={32} stroke='#fff'/>
      </Button> */}
      <style jsx>{`
      nav p:hover {
        background: radial-gradient(#0099ff22 15%, transparent 16%);
        background-size: 180px 180px;
        background-position: center;
      }

      nav p:hover > :global(svg) {
        stroke: #0049ff;
      }
      `}</style>
    </>
  )
}
