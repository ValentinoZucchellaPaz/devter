// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

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

function mapUserFromFireBaseAuth (result) {
  const { displayName, photoURL, email } = result.user
  return {
    photoURL,
    displayName,
    email
  }
}

export function onAuthStateChangeOfUser (onChange) {
  onAuthStateChanged(auth, onChange)
}

export function loginWithGithub () {
  const provider = new GithubAuthProvider()

  return signInWithPopup(auth, provider)
    .then((result) => mapUserFromFireBaseAuth(result))
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
