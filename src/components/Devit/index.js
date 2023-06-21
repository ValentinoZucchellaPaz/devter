import UserAvatar from '../Avatar/Avatar'
import useTimeAgo from '@/hooks/useTimeAgo'

export default function Devit ({ avatar, username, content, imgURL, userId, createdAt }) {
  const timeago = useTimeAgo(createdAt)
  return (
    <article className="flex flex-row w-full h-auto items-start gap-2 py-3 px-4 border-b-[1px] border-gray-200">
      <UserAvatar src={avatar} alt={username}/>
      <div className='w-[95%]'>
        <div className="flex flex-row gap-1">
          <p className=" text-sm font-semibold">{username}</p>
          <p className=" ml-2 text-sm font-normal text-gray-500">{timeago}</p>
        </div>
        <p className=" text-sm font-normal">{content}</p>
        {imgURL && <img className='w-full max-h-[300px] mt-3 object-contain rounded-lg' src={imgURL} alt='uploaded-image'/>}

      </div>
    </article>
  )
}
