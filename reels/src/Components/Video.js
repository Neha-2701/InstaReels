import React from 'react'
import './Video.css'
import ReactDOM from 'react-dom'

export default function Video(props) {
  
  const handleClick = (e) => {
  
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };
  const handleScroll=(e)=>{
    let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    if(next){
      next.scrollIntoView()
      e.target.muted=true
    }
  }

  return (
    <video muted="muted" src={props.src} className="video-container" onEnded={handleScroll}  onClick={handleClick} >

    </video>
  )
}
