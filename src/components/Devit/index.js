import UserAvatar from '../Avatar/Avatar'
import useTimeAgo from '@/hooks/useTimeAgo'
import useDateTimeFormat from '@/hooks/useDateTimeFormat'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit ({ avatar, username, content, imgURL, userId, createdAt, id }) {
  const router = useRouter()
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  function handleArticleClick (e) {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  return (
    <article onClick={handleArticleClick} className="flex flex-row w-full h-auto items-start gap-2 py-3 px-4 border-b-[1px] border-gray-200 hover:bg-slate-100 cursor-pointer">
      <UserAvatar src={avatar} alt={username}/>
      <div className='w-[95%]'>
        <div className="flex flex-row items-center gap-1">
          <p className=" text-sm font-semibold">{username}</p>
          <span className='mx-1'>·</span>
          <Link href={`/status/${id}`}>
            <time title={createdAtFormated} className="text-sm text-gray-500 hover:underline">
              {timeago}
            </time>
          </Link>
        </div>
        <p className=" text-sm">{content}</p>
        {imgURL && <img className='w-full max-h-[300px] mt-3 object-contain rounded-lg' src={imgURL} alt='uploaded-image'/>}

      </div>
    </article>
  )
}
