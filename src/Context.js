import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebaseConfig"

const Context = React.createContext()

export function useAuthenticate() {
  return useContext(Context)
}
export function AuthenticationProvider({ children }) {
  
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function logout() {
    return auth.signOut()
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  
  async function updateEmail(email) {
    if (!currentUser) {
      throw new Error("No current user");
    }
    try {
      return await currentUser.updateEmail(email);
    } catch (error) {
      console.error("Error updating email:", error);
      throw error; // rethrow or handle as needed
    }
  }
  
  async function updatePassword(password) {
    if (!currentUser) {
      throw new Error("No current user");
    }
    try {
      return await currentUser.updatePassword(password);
    } catch (error) {
      console.error("Error updating password:", error);
      throw error; // rethrow or handle as needed
    }
  }
  

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
       
      setLoading(false)
      
    })
    return unsubscribe
  }, [])

  const value = { currentUser, login, signup, logout, resetPassword, updateEmail, updatePassword
  }

  
  return (
    <Context.Provider value={value}>
      {!loading && children}
    </Context.Provider>
  )
}
