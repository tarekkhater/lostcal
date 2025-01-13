import "./Login.css"
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetSuccess } from '../../redux/authSlice'
import {CustomLoader} from '../../Components/alert&loader/CustomLoader'
const Login = () => {
    const token=useSelector((state)=>state.user.token);
    const loading=useSelector((state)=>state.user.loading);
    const dispatch=useDispatch();
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const location=useLocation();
    const redirectPath=location.state?.path || "/";
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(loginUser({email,password}));
        setEmail("");
        setPassword("");
        dispatch(resetSuccess());
    }
    useEffect(() => {
        if (token) {
            navigate(redirectPath,{replace:true});
        }
    }, [token, navigate]);

  return (
    <div className='login'>
        {
            loading ? <CustomLoader/> :(
                
            <div className='login-container'>
                <div className='images'>
                    <img className='ellipse' src='/src/assets/images/Ellipse 3.png' alt='ellipse' />
                    <img className='curve' src='/src/assets/images/Rectangle 23.png' alt='curve' />
                    <img className='title' src='/src/assets/images/landing-title.png' alt='title' />
                    <img className='dots' src='/src/assets/images/lovepik-splash-material-png-image(r).png' alt='dots' />
                    <img className='phone' src='/src/assets/images/phone.png' alt='phone' />
                </div>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='man-img'>
                        <img src='/src/assets/images/man 1.png' alt='man'/>
                    </div>
                    <h1>Welcome !</h1>
                    <div className='input-container'>
                        <img src='/src/assets/images/email.png'/>
                        <input type='email' required placeholder='Enter your email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='input-container' style={{marginBottom:"1rem"}}>
                        <img src='/src/assets/images/password.png'/>
                        <input type='password' placeholder='Enter your password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}   />
                    </div>
                    <Link to="/forgot-password" className='forget' style={{marginBottom:"1rem"}}>forgot password ?</Link>
                    <button type='submit' style={{marginBottom:"1rem"}} disabled={loading === true}>Login</button>
                    <Link to="/signup" className='forget'>Not registered ? Create Account</Link>
                </form>
            </div>
            )
        }
    </div>
  )
}

export default Login