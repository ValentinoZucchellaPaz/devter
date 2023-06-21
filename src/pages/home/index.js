import MobileWrapper from '@/components/MobileWrapper'
import { useEffect, useState } from 'react'
import Devit from '@/components/Devit'
import useUser from '@/hooks/useUser'
import { fetchLatestDevits } from '@/firebase/client'
import Create from '@/components/Icons/Create'
import Link from 'next/link'
import HomeSVG from '@/components/Icons/Home'
import Search from '@/components/Icons/Search'
import Head from 'next/head'

export default function Home () {
  const [timeline, setTimeline] = useState([])
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      fetchLatestDevits().then(timeline => {
        console.log(timeline)
        setTimeline(timeline)
      }).catch(e => console.error(e))
    }
  }, [user])

  return (
    <MobileWrapper headerText='Inicio'>
      <Head>
        <title>Inicio | Devter</title>
      </Head>

      <section className="h-[calc(100%-3rem)] overflow-auto">
        {
          timeline.map((devit) => {
            const { username, avatar, content, id, userId, createdAt, imgURL } = devit
            return <Devit
              key={id}
              id={id}
              avatar={avatar}
              imgURL={imgURL}
              name={username}
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
    </MobileWrapper>
  )
}
