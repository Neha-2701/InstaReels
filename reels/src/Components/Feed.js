import React,{useContext,useEffect, useState} from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFile from './UploadFile'
import './Feed.css'
import { database } from '../firebase'
import Posts from './Posts'
import Navbar from './Navbar'

export default function Feed() {
  const {user, logout}=useContext(AuthContext)
  const [ userData, setUserData]=useState('')

  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
        setUserData(snapshot.data())
    })
    return ()=> {unsub()}
  },[user])

  return (
    <>
    <Navbar userData={userData}/>
    <div className="FeedPage">
      
      <UploadFile user={userData}/>
      <Posts userData={userData}/>
    </div>
    </>
  )
}
