import Button from '@/components/Button/Button'
import useUser from '@/hooks/useUser'
import { useState, useEffect, useRef } from 'react'
import { addDevit, uploadImage } from '@/firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ArrowLeft from '@/components/Icons/ArrowLeft'
import UserAvatar from '@/components/Avatar/Avatar'
import { getDownloadURL } from 'firebase/storage'
import Cross from '@/components/Icons/Cross'

const COMPOSE_STATUS = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

const DRAG_IMAGE_STATES = {
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
  ERROR: -1
}

function ComposeTweet () {
  const router = useRouter()
  const { user } = useUser()
  const textareaRef = useRef(null)

  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATUS.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log('ONCOMPLETE')
        getDownloadURL(task.snapshot.ref).then((imgURL) => {
          setImgURL(imgURL)
        })
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setMessage(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATUS.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      imgURL,
      userId: user.uid,
      username: user.username
    }).then(() => router.push('/home'))
      .catch(e => {
        console.error(e)
        setStatus(COMPOSE_STATUS.ERROR)
      })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    router.replace('/home')
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATUS.LOADING

  return (
    <>

      <Head>
        <title>Crear un Devit</title>
      </Head>
      <header className="w-full flex flex-row justify-start items-center h-14 border-b-[1px] border-solid border-gray-300 sticky top-0 bg-white bg-opacity-20"></header>
      <form onSubmit={handleSubmit} className='w-full h-full p-2 flex flex-col items-center'>
        <div className='flex flex-row items-start my-2 w-full gap-2'>
          <UserAvatar src={user?.avatar} alt={user?.username} />
          <textarea
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onChange={handleChange}
          value={message}
          ref={textareaRef}
          className={`p-2 outline-0 outline-gray-300 resize-none w-[90%] min-h-[200px] focus:outline-1 ${drag === DRAG_IMAGE_STATES.DRAG_OVER && 'outline-[3px] outline-dashed outline-primary'} rounded-lg`}
          placeholder="¿Qué está pasando?">
        </textarea>
        </div>
        <div className='grid place-content-start col-auto row-auto w-[calc(90%-.5rem)] ml-auto'>
            {
              imgURL &&
                <div className='relative'>
                  <Cross onClick={() => setImgURL(null)} className='absolute top-2 left-2 cursor-pointer hover:scale-105' stroke='#fff' fill='#00000050'/>
                  <img className='max-w-[300px] max-h-[300px] object-contain rounded-lg' src={imgURL} alt='uploaded-image'/>
                </div>
            }
        </div>
        <div className='w-full h-12 flex flex-row justify-between items-center px-4 mt-[2px] absolute top-0'>
          <Button classes='bg-transparent px-1 hover:bg-gray-200' handleClick={handleCancel} disabled={message.length && isButtonDisabled}>
            <ArrowLeft width={32} height={32} stroke='#1DA1F2'/>
          </Button>
          <Button classes='bg-primary text-white' disabled={isButtonDisabled}>
            Devitear
          </Button>
      </div>
      </form>
    </>
  )
}

export default ComposeTweet
