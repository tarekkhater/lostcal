import React, { useState } from 'react'
import "./UpdateUserData.css"
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../../redux/patchSlice';
import { showErrorAlert } from '../alert&loader/alerts';
import { getUserInfo } from '../../redux/authSlice';
const UpdateUserData = ({type,name,email,id}) => {
  const token=useSelector((state)=>state.user.token);
  const [username,setUsername]=useState(name);
  const dispatch=useDispatch()
  const handleInputChange=(e)=>{
      setUsername(e.target.value)
  }
  const handleUpdateUsername=async()=>{
    if( ! username ){
      showErrorAlert("Please write a username");
      return
    }
    try{
      await dispatch(updateUsername({username,token})).unwrap()
      dispatch(getUserInfo(token));
    }catch(error){
      console.error('Error updating lost person:', error);
    }
  }
  return (
    <div className='update-user-data'>
        <label>{type}</label><br/>
        <div className='label-container'>
            <input 
              type='text'
              value={ username} 
              placeholder={`Update Your username`} 
              onChange={(e)=>handleInputChange(e)} />
        </div>
        <button className='update' onClick={handleUpdateUsername}>Update</button>
    </div>
  )
}

export default UpdateUserData