import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { db, auth, google } from '../firebase'
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { signInWithPopup, signOut } from 'firebase/auth'

function App() {
  const [count, setCount] = useState(0)
  const [doc, setDoc] = useState(null)
  const [user, setUser] = useState(null)

  const handleAuthClick = () => {
    if (user) {
      signOut(auth).then(setUser(null)).catch(console.error)
    } else {
      signInWithPopup(auth, google).then((result) => setUser(result.user)).catch(console.error)
    }
  }

  useEffect(() => {
    if (!user) {
      setDoc(null)
      return
    }

    const loadCollection = async () => {
      const q = query(collection(db, 'test'), where("uid", "==", user.uid))
      const snap = await getDocs(q);

      if (snap.empty) {
        console.log("No documents found")
      } else {
        const firstDoc = snap.docs[0]
        // console.log(firstDoc)
        setDoc(firstDoc.ref)
        setCount(firstDoc.data().count)
      }
    }

    loadCollection()
  }, [user])

  useEffect(() => {
    if (count == 0 || !user) {
      return
    }

    console.log("count changed to " + count)
    if (!doc) {
      const newDoc = addDoc(collection(db, "test"), {
        uid: user.uid,
        count
      }).then(newDoc => setDoc(newDoc))
      // console.log(newDoc)
      // setDoc(newDoc)
    } else {
      const result = updateDoc(doc, {count})
    }
  }, [count])

  return (
    <>
      <h1>Counter App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Click on the button to increment count
        </p>
        <button onClick={handleAuthClick}>
          {user ? "Sign out" : "Sign in"}
        </button>
      </div>
    </>
  )
}

export default App
