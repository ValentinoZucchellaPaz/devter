import { useState, useEffect } from 'react'
import { onAuthStateChangeOfUser, loginWithGithub } from '@/firebase/client'
import { useRouter } from 'next/router'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

function useUser () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  const handleSingIn = () => {
    loginWithGithub()
      .then(res => {
        console.log(res)
        setUser(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    onAuthStateChangeOfUser(setUser)
  }, [])

  useEffect(() => {
    console.log(user)
    user === USER_STATES.NOT_LOGGED && router.push('/')
  }, [user])
  return { user, handleSingIn }
}

export default useUser
