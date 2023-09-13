import React, { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Likemodal({userData, postData}) {
    const [like,setlike]= useState(null);
    useEffect(()=>{
        let check=postData.likes.includes(userData.userId)?true:false
        setlike(check)
    },[postData])
   
    const handleLike = () => {
        if(like==true){
            let narr = postData.likes.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }else{
            let narr = [...postData.likes,userData.userId]
            database.posts.doc(postData.postId).update({
                likes:narr
            })
        }
    }
  return (
    <div>
      {
        like!=null?
        <> 
            {like==true?< FavoriteIcon style={{padding:"1rem", paddingTop:"0.5rem"}} className={'like'} onClick={handleLike}/> : <FavoriteBorderIcon style={{padding:"1rem", paddingTop:"0.5rem", color:"grey"}}  onClick={handleLike} className={'unlike'}/>}
        </>:
        <></>
      }
    </div>
  )
}
