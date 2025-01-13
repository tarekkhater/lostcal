import React from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { logoutUser } from '../../redux/authSlice'
import { CustomLoader } from '../alert&loader/CustomLoader'
const Header = () => {
  const token=useSelector((state)=>state.user.token);
  const loading=useSelector((state)=>state.user.loading);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=()=>{
    dispatch(logoutUser(token));
  }
  return (
    <div className='header'>
      {
        loading ? <div className="loader-overlay">
                      <CustomLoader/>
                  </div>:(
          <div className='container'>
            <ul>
                <li className='active'><Link to="/">Home</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/find-the-lost">Find the lost</Link></li>
                <li><Link to="/add-the-lost">Add the lost</Link></li>
                {
                  token ?
                    <>
                      <li><Link to="/user">User</Link></li>
                      <li><button onClick={handleLogout}>Logout</button></li>
                    </>: 
                      <li><Link to="/signup">Sign up</Link></li>
                }
                
            </ul>
          </div>
        
        ) 
      }
    </div>
  )
}

export default Header