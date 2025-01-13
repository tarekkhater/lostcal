import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import iIcon from "../../assets/images/otpImage.png";
import lock from "../../assets/images/email 2.png";
import styles from "./ForgotPassword.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/authSlice';
import { CustomLoader } from '../../Components/alert&loader/CustomLoader';

const ResetPassword = () => {
    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [passwordConfirm , setPasswordConfirm]=useState("");
    const token=useSelector((state)=>state.user.token);
    const loading=useSelector((state)=>state.user.loading);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    useEffect(()=>{
        if(token){
            navigate("/");
        }
    },[navigate,token]);
    const handleSubmit=()=>{
        dispatch(resetPassword({email,newPassword,passwordConfirm}));
    }
  return (
    <div>
    {
        loading ? 
        <div className={styles.loaderOverlay}>
            <CustomLoader/>
        </div>:
        <div className={styles.main}>
            <div className={styles.leftSide}>
                <img src={iIcon} alt="icon" />
                <h1>Reset Password</h1>
                <div className={styles.inputField}>
                    <img src={lock} alt="lock" />
                    <input type="email" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className={styles.inputField}>
                    <img src={lock} alt="lock" />
                    <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>
                <div className={styles.inputField}>
                    <img src={lock} alt="lock" />
                    <input type="password" placeholder="Confirm Your New Password" value={passwordConfirm} onChange={(e)=>setPasswordConfirm(e.target.value)} />
                </div>
                <button onClick={handleSubmit}>Submit</button>
                <div className={styles.linkSection}>
                    <Link to="/login">
                        <i className="fa-solid fa-angle-left"></i>
                        <span>Back To Login</span>
                    </Link>
                </div>
            </div>
        </div>
    }
    </div>
  )
}

export default ResetPassword