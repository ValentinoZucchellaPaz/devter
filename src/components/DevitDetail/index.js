import UserAvatar from '../Avatar/Avatar'
import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'
import { useRouter } from 'next/router'
import Button from '../Button/Button'
import ArrowLeft from '../Icons/ArrowLeft'

export default function DevitDetail ({ avatar, username, content, imgURL, userId, createdAt, id }) {
  const router = useRouter()
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  function handleArticleClick (e) {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  function handleCancel (e) {
    e.preventDefault()
    router.push('/home')
  }
  return (
    <>
    <header className="w-full flex flex-row justify-start items-center h-14 border-b-[1px] border-solid border-gray-300 sticky top-0 bg-white bg-opacity-20">
            <Button classes='mx-4 bg-transparent px-1 hover:bg-gray-200' handleClick={handleCancel}>
                <ArrowLeft width={32} height={32} stroke='#1DA1F2'/>
            </Button>
    </header>
    <article onClick={handleArticleClick} className="flex flex-row w-full h-full items-start gap-2 py-3 px-4 border-b-[1px] overflow-auto">
      <div className='w-[95%]'>
        <div className="flex flex-row items-start gap-2 mb-3">
            <UserAvatar src={avatar} alt={username}/>
            <div>
                <p className=" text-sm font-semibold">{username}</p>
                <time title={createdAtFormated} className="text-sm text-gray-500 hover:underline cursor-default">
                  {timeago}
                </time>
            </div>
        </div>
        <p>{content}</p>
        {imgURL && <img className='w-full h-auto mt-3 object-cover rounded-lg' src={imgURL} alt='uploaded-image'/>}
      </div>
    </article>
    </>
  )
}
