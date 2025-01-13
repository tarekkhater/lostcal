import { Link, useNavigate } from "react-router-dom";
import iIcon from "../../assets/images/otpImage.png";
import lock from "../../assets/images/email 2.png";
import styles from "./ForgotPassword.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomLoader } from "../../Components/alert&loader/CustomLoader";
import { resetSecretCode, restSecretCodeSuccess } from "../../redux/forgetSlice";

const SecretCode = () => {
  const [resetCode,setResetCode]=useState("");
  const loading=useSelector((state)=>state.forget.loading);
  const success=useSelector((state)=>state.forget.secretCodeSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit=()=>{
    dispatch(resetSecretCode({resetCode}))
  }
  useEffect(()=>{
    if(loading === false && success === true){
        navigate("/reset-password");
        dispatch(restSecretCodeSuccess());
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
        <h1>Secret Code</h1>
        <p>Check your email , we send a secret code to you</p>
        <div className={styles.inputField}>
          <img src={lock} alt="lock" />
          <input type="text" placeholder="Enter Code" value={resetCode} onChange={(e)=>setResetCode(e.target.value)} />
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

export default SecretCode