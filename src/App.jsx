import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { db } from '../firebase'
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore'

function App() {
  const [count, setCount] = useState(0)
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    const loadCollection = async () => {
      const q = query(collection(db, 'test'), where("uid", "==", "1234"))
      const snap = await getDocs(q);

      if (snap.empty) {
        console.log("No documents found")
      } else {
        const firstDoc = snap.docs[0]
        // console.log(firstDoc)
        setDoc(firstDoc)
        setCount(firstDoc.data().count)
      }
    }

    loadCollection()
  }, [])

  useEffect(() => {
    if (count == 0) {
      return
    }

    console.log("count changed to " + count)
    if (!doc) {
      const newDoc = addDoc(collection(db, "test"), {
        uid: "1234",
        count
      })
      setDoc(newDoc)
    } else {
      const result = updateDoc(doc.ref, {count})
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
      </div>
    </>
  )
}

export default App
