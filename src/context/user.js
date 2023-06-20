import { Children, createContext, useState } from 'react'

const UserContext = createContext(null)

export default function UserContextProvider (children) {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
