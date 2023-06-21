import { createContext, useState } from 'react'

const UserContext = createContext(null)

export default function UserContextProvider (children) {
  const [userContext, setUserContext] = useState(null)
  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      {children}
    </UserContext.Provider>
  )
}
