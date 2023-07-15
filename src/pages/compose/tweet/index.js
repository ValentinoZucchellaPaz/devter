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
import { Spinner } from '@chakra-ui/react'

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
  const textareaRef = useRef()
  // const filesRef = useRef()

  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATUS.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (task) {
      const onProgress = () => {
        console.log('ONCOMPLETE')
        setLoading(true)
      }
      const onError = () => {
        console.log('ONERROR')
        router.push('/home')
      }
      const onComplete = () => {
        console.log('ONCOMPLETE')
        setLoading(false)
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
  // const handleUploadImages = (e) => {
  //   e.preventDefault()
  //   const files = e.target.files
  //   console.log(e.target.files)
  //   if (files.length > 4) {
  //     alert('you can only upload 4 images')
  //   } else {
  //     const imagesArray = [...files]
  //     console.log(URL.createObjectURL(imagesArray[0]))
  //     setImgURL(imagesArray)
  //   }
  // }

  const isButtonDisabled = !message.length || status === COMPOSE_STATUS.LOADING

  return (
    <>

      <Head>
        <title>Crear un Devit</title>
      </Head>
      <header className="w-full flex flex-row justify-start items-center h-14 border-b-[1px] border-solid border-gray-300 relative bg-white bg-opacity-20"></header>
      <form onSubmit={handleSubmit} className='w-full h-full p-2 flex flex-col items-center overflow-auto'>
        <div className='flex flex-row items-start my-2 w-full gap-2'>
          <UserAvatar src={user?.avatar} alt={user?.username} />
          <textarea
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onChange={handleChange}
          value={message}
          ref={textareaRef}
          className={`p-2 outline-0 outline-gray-300 resize-none w-[90%] min-h-[200px] ${drag === DRAG_IMAGE_STATES.DRAG_OVER && 'outline-[3px] outline-dashed outline-primary'} rounded-lg`}
          placeholder="¿Qué está pasando?">
        </textarea>
        </div>
        {/* <div>
          <input onChange={handleUploadImages} ref={filesRef} type='file' name='files' id='files' multiple accept='.png, .jpg, .jpeg'></input>
        </div> */}
          {
            loading && <Spinner color='#1DA1F2' w={20} h={20} />
          }
        <div className='flex flex-col gap-3 py-3 w-[calc(90%-.5rem)] max-h-[40%] h-auto overflow-auto ml-auto'>
            {
              imgURL && (
                <div className='relative'>
                   <Cross onClick={() => setImgURL(null)} className='absolute top-2 left-2 cursor-pointer hover:scale-105' stroke='#fff' fill='#00000050'/>
                   <img className='max-w-[300px] max-h-[300px] object-contain rounded-lg' src={imgURL} alt='uploaded-image'/>
                 </div>
              )
            }
            {
              // imgURL &&
              //   (
              //     Array.isArray(imgURL)
              //       ? (
              //           imgURL.map((img, index) => <div key={index} className='relative'>
              //         <Cross onClick={() => setImgURL(null)} className='absolute top-2 left-2 cursor-pointer hover:scale-105' stroke='#fff' fill='#00000050'/>
              //         <img className='max-w-[300px] max-h-[300px] object-contain rounded-lg' src={URL.createObjectURL(img)} alt='uploaded-image'/>
              //         </div>)
              //         )
              //       : (
              //         <div className='relative'>
              //      <Cross onClick={() => setImgURL(null)} className='absolute top-2 left-2 cursor-pointer hover:scale-105' stroke='#fff' fill='#00000050'/>
              //      <img className='max-w-[300px] max-h-[300px] object-contain rounded-lg' src={imgURL} alt='uploaded-image'/>
              //    </div>
              //         )
              //   )
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
