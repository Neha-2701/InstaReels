import React,{useState, useEffect} from 'react'
import {database} from '../firebase'
import Video from './Video';
import CircularProgress from '@mui/material/CircularProgress'
import './Posts.css'
import { Avatar } from '@mui/material';
import Like from './Like'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Likemodal from './Likemodal';
import Addcomment from './Addcomment';
import Comments from './Comments';
export default function Posts({userData}) {
  const [posts,setPosts]=useState(null);
  const [open, setOpen] = React.useState(null);

  const handleClickOpen = (pId) => {
    setOpen(pId);
  };
  const handleClose = () => {
    setOpen(null);
  };
  useEffect(()=>{
    let parr=[]

    const unsub=database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
        parr=[]
        querySnapshot.forEach((doc)=>{
            let data={...doc.data(),postId:doc.id}
            parr.push(data)
        })
        setPosts(parr)
    }) 
    return unsub
  },[])
  const callback = (entries) => {
    entries.forEach((entry)=>{
        let ele = entry.target.childNodes[0]
        console.log(ele)
        ele.play().then(()=>{
            if(!ele.paused && !entry.isIntersecting){
                ele.pause()
            }
        })
      })
  }
  let observer = new IntersectionObserver(callback, {threshold:0.6});
  useEffect(()=>{
      const elements = document.querySelectorAll(".videos")
      elements.forEach((element)=>{
          observer.observe(element)
      })
      return ()=>{
          observer.disconnect();
      }
  },[posts])
  
  return(  
    <div>
      {
      posts==null || userData ==null ? 
      <CircularProgress/> :
      <div className="video-container">     
      {
        
        posts.map((post, index) => (
          <React.Fragment key={index}>
            <div className='videos'>
              <Video src={post.pUrl}/>
              <div className='fa' style={{display:'flex'}}>
                <Avatar src={userData.profileUrl}/>
                <h4>{userData.fullname}</h4>
              </div>
             
              <Like userData={userData} postData={post}/>
              <ChatBubbleIcon onClick={()=>handleClickOpen(post.pId)} className="chat-styling"/>
              <Dialog
                open={open==post.pId}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth='md'
              >
              <div className='modal-container'>
                <div className='modal-left'>
                  <Video controls src={post.pUrl} autoplay={true} muted="muted" >
                    <source src={post.pUrl}/>
                   </Video>
                </div>
                <div className='modal-right'>
                <Card style={{height:'70vh',maxWidth:'100%'}} sx={{ maxWidth: 345 }}>
                  <Comments postData={post}/>
                </Card>
                <Card sx={{ maxWidth: '100%' }}>
                  <Typography style={{display:"flex", justifyContent: "center"}}>{post.likes.length==0?"Liked by 0 users":`liked by ${post.likes.length} users`}</Typography>
                  <div style={{display:"flex"}}>
                  <Likemodal style={{display:"flex",alignItems:"center", justifyContent:'center'}} userData={userData} postData={post}/>
                  <Addcomment userData={userData} postData={post}/>
                  
                  </div>
                </Card>
                </div>
              </div>
              </Dialog>
            </div>
          </React.Fragment>
        ))
      }
    </div> 
      }
    </div>
  )
}
