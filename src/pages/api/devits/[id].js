import { db } from '@/firebase/client'
import { getDoc, doc } from 'firebase/firestore'

export default async function (request, response) {
  const { query } = request
  const { id } = query

  const devitRef = doc(db, 'devits', id)
  getDoc(devitRef)
    .then(devit => {
      const data = devit.data()
      const id = devit.id
      const { createdAt } = data
      response.json({
        ...data,
        id,
        createdAt: +createdAt.toDate()
      })
    })
    .catch(() => {
      response.status(404).end()
    })
}
