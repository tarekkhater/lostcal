import { Link, useNavigate } from "react-router-dom";
import iIcon from "../../assets/images/iIcon.png";
import mail from "../../assets/images/email 2.png";

import styles from "./ForgotPassword.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader } from "../../Components/alert&loader/CustomLoader";
import { forgetPassword, resetForgetSuccess } from "../../redux/forgetSlice";

const ForgotPassword = () => {
  const [email,setEmail]=useState("");
  const loading=useSelector((state)=>state.forget.loading);
  const success=useSelector((state)=>state.forget.forgetPasswordSuccess);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit=()=>{
    dispatch(forgetPassword({email}))
  }
  useEffect(()=>{
    if(loading === false && success === true){
        navigate("/secret-code");
        dispatch(resetForgetSuccess());
      }
  },[loading,success,navigate])
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
          <h1>Forgot Password</h1>
          <p>Enter your email and we will send you a link to reset <br /> your password</p>
          <div className={styles.inputField}>
            <img src={mail} alt="mail" />
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
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
  );
};

export default ForgotPassword;
