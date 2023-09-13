import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { TextField } from '@mui/material';
import {Link} from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Login.css'
import { useContext } from 'react';
import bg from '../Assets/insta.png';
import img1 from '../Assets/img1.jpg';
import img2 from '../Assets/img2.jpg';
import img3 from '../Assets/img3.jpg';
import img4 from '../Assets/img4.jpg';
import img5 from '../Assets/img5.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

export default function LogIn() {
  const [email,setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [error, setError] = useState('');
  const[ loading, setLoading]= useState(false);
  const history=useNavigate();
  const {login}= useContext(AuthContext);
  const store=useContext(AuthContext);

  const handleClick=async()=>{
    try{
      setError('');
      setLoading(true)
      let res= await login(email,password);
      setLoading(false);
      history('/');
    }catch(err){
      setError(err);
      setTimeout(() => {
        setError('')
      }, 2000);
      setLoading(false);
      return;
    }
   }
  
  return (
    <>
    <div className="LoginCard">
    <div className='ImgCard' style={{backgroundImage:'url('+bg+')', backgroundsize:'cover'}}>
        <div className='Card'>
        <CarouselProvider
            visibleSlides={1}
            totalSlides={5}
            naturalSlideWidth={238}
            naturalSlideHeight={423}
            hasMasterSpinner
            isPlaying={true}
            infinite={true}
            dragEnabled={false}
            touchEnabled={false}
        >
            <Slider>
            <Slide index={0}><Image src={img1}/></Slide>
            <Slide index={1}><Image src={img2}/></Slide>
            <Slide index={2}><Image src={img3}/></Slide>
            <Slide index={3}><Image src={img4}/></Slide>
            <Slide index={4}><Image src={img5}/></Slide>
            </Slider>
        </CarouselProvider>
        </div>
    </div>
    <div className="ImgCardRight">
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <div  >
        <img className='InstaText' src="InstaReels.png"></img>
      </div>
      <CardContent className='CardContent'>
        {error!='' && <Alert severity="error">This is an error alert — check it out!</Alert>}
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <TextField id="outlined-basic" label="PassWord" variant="outlined" fullWidth={true} margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Typography className="text1" color="primary" variant="subtitle1">
          Forget Password?
        </Typography>
      </CardContent>
      <CardActions >
        <Button onClick={handleClick}size="small" color='primary' variant="contained" fullWidth={true} disabled={loading} margin="dense" >Log In</Button>
      </CardActions>
    </Card>
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent className='CardContent'>
        <Typography className="text1" variant="subtitle1" >
          Already have an account? 
          <Link to='/signup' style={{textDecoration:'none'}}>SignUp</Link>
        </Typography>
      </CardContent>
    </Card>
    </div>
    </div>
    </>
  );
}