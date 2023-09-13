import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import {Link, useNavigate } from 'react-router-dom';
import { useState , useContext } from 'react';
import './SignUp.css';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../firebase';
export default function SignUp() {
  
  const [email,setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [name, setName]= useState('');
  const [file,setFile] = useState(null);
  const [error, setError] = useState('');
  const[ loading, setLoading]= useState(false);
  const history=useNavigate();
  const {signup}= useContext(AuthContext);

   const handleClick=async()=>{
    if(file==null){
      setError("Please upload profile picture");
      setTimeout(() => {
        setError('')
      }, 2000);
      return;
    }
    try{
      setError('')
      setLoading(true)
      let userObj=await signup(email,password)
      let uid=userObj.user.uid;
      const uploadTask=storage.ref(`users/${uid}/ProfileImage`).put(file);
      uploadTask.on('state_changed',f1,f2,f3);
      function f1(snapshot){
        let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;

      }
      function f2(err){
        setError(err);
        setTimeout(() => {
          setError('')
        }, 2000);
        setLoading(false);
        return;
      }
      function f3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
      
          database.users.doc(uid).set({
            email:email,
            userId:uid,
            fullname:name,
            profileUrl : url,
            createdAt: database.getTimeStamp()
          })
        })
        setLoading(false);
        history('/');
      }
    }catch(err){
      setError(err)
      setTimeout(() => {
        setError('')
      }, 2000);
    }
   }

  return ( 
    <div className="SignUpCard">
    <div className="InCard">
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <div  >
        <img className='InstaText' src="InstaReels.png"></img>
      </div>
      <CardContent className='CardContent'>
        <Typography className="text1" variant="subtitle1" >
          Sign up to see photos and videos.
        </Typography>
        {error!='' && <Alert severity="error">{error}</Alert>}
        
        <TextField value={name} onChange={(e)=>setName(e.target.value)} id="outlined-basic" label="UserName" variant="outlined" fullWidth={true} margin="dense"/>
        <TextField value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="PassWord" variant="outlined" fullWidth={true} margin="dense"/>
        <TextField value={email} onChange={(e)=>setEmail(e.target.value)}  id="outlined-basic" label="Gmail" variant="outlined" fullWidth={true} margin="dense"/>
        <Button size="small" color="primary" variant="outlined" fullWidth={true} margin="dense" startIcon={<UploadIcon/>} component="label">Upload Profile Image
        <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
        </Button>
      </CardContent>
      <CardActions >
        <Button size="small" color='primary' variant="contained" fullWidth={true} margin="dense" disabled={loading} onClick={handleClick}>Sign Up</Button>
      </CardActions>
      <CardContent>
        <Typography className="text1" >
          By signing up, you agree to our terms, conditions and cookies policy.
        </Typography>
      </CardContent>
    </Card>
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <CardContent className='CardContent'>
        <Typography className="text1" variant="subtitle1" >
          Having an account?  
          <Link to='/login' style={{textDecoration:'none'}}> Login</Link>
        </Typography>
      </CardContent>
    </Card>
    </div>
    </div>
  );
}