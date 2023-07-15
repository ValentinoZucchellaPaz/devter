// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { Timestamp, addDoc, collection, getFirestore, query, orderBy, onSnapshot, limit } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBw_UqAq06KWsFL6xAAxp3BGohPe-GySMc',
  authDomain: 'devter-f5d39.firebaseapp.com',
  projectId: 'devter-f5d39',
  storageBucket: 'devter-f5d39.appspot.com',
  messagingSenderId: '1024714331854',
  appId: '1:1024714331854:web:2a4726cbd294fdd41b629f'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = getFirestore(app)
const storage = getStorage(app)

function mapUserFromFireBaseAuth (user) {
  const { displayName, photoURL, email, uid } = user
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export function onAuthStateChangeOfUser (onChange) {
  onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFireBaseAuth(user) : null
    onChange(normalizedUser)
  })
}

export function loginWithGithub () {
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
    .then((result) => mapUserFromFireBaseAuth(result.user))
    .catch((err) => {
      const errorCode = err.errorCode
      const errorMessage = err.message
      const email = err.customData.email
      const credential = GithubAuthProvider.credentialFromError(err)
      return { errorCode, errorMessage, email, credential }
    })
}

export function LoginWithEmail ({ email, password }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return user
    })
    .catch((err) => {
      const errorCode = err.errorCode
      const errorMessage = err.message
      return { errorCode, errorMessage }
    })
}

export function addDevit ({ avatar, content, imgURL, userId, username }) {
  const docRef = addDoc(collection(db, 'devits'),
    {
      avatar,
      content,
      userId,
      imgURL,
      username,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0
    })
  return docRef
}

function mapDevitFromFirebase (devit) {
  const data = devit.data()
  const id = devit.id
  const { createdAt } = data
  return {
    ...data,
    id,
    createdAt: +createdAt.toDate()
  }
}

export function listenLatestDevits (callback) {
  const collectionRef = collection(db, 'devits')
  const orderedByDate = query(collectionRef, orderBy('createdAt', 'desc'), limit(20))
  // onSnapshot devuelve un metodo para cancelar la 'subscripcion'
  return onSnapshot(orderedByDate, ({ docs }) => {
    const newDevits = docs.map(mapDevitFromFirebase)
    callback(newDevits)
  })
}

// export function fetchLatestDevits () {
//   const collectionRef = collection(db, 'devits')
//   const orderedByDate = query(collectionRef, orderBy('createdAt', 'desc'))
//   const docsRef = getDocs(orderedByDate)
//     .then(snapshot => {
//       return snapshot.docs.map(mapDevitFromFirebase)
//     })
//     .catch(err => { throw new Error(err) })

//   return docsRef
// }

export function uploadImage (file) {
  const imagesRef = ref(storage, `images/${file.name}`)
  console.log(imagesRef)
  return uploadBytesResumable(imagesRef, file)
}
