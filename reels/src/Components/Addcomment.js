import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { database } from '../firebase';

export default function Addcomment({userData,postData}) {
    const [text, setText] =useState('')
    const handleClick = () => {
        let obj = {
            text:text,
            uProfileImage : userData.profileUrl,
            uName : userData.fullname
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments,doc.id]
            })
        })
        setText('')
    }
  return (
    <div style={{display:"flex", width:'100%'}}>
       <TextField style={{bottom:"15%"}}
          id="standard-basic"
          label="Comment"
          placeholder="Add Comment"
          variant="standard"
          fullWidth={true}
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
        <Button onClick={handleClick} style={{height:'80%', marginLeft:"5%", width:"11vw"}} variant="contained">Post</Button>
    </div>
  )
}
