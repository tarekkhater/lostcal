import React, { useEffect, useRef, useState } from 'react'
import "./NewHeader.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../../redux/authSlice'

const NewHeader = ({active}) => {
    const token=useSelector((state)=>state.user.token);
    const userData=useSelector((state)=>state.user.data);
    const [activeLink,setActiveLink]=useState(active);
    const navRef=useRef();
    const showNav=()=>{
        const computedStyle = window.getComputedStyle(navRef.current);
        const currentDisplay = computedStyle.getPropertyValue('display');
        if(currentDisplay === "none"){
            navRef.current.style.display="flex";
        }else if(currentDisplay ==="flex"){
            navRef.current.style.display="none";
        }
    }
    return (
        <div className='search-header'>
            <div className='logo'>
                <img src='/src/assets/images/landing-title.png' alt='logo'/>
            </div>
            <div className='navbar'>
                <ul ref={navRef}>
                    <li className={activeLink === "home" ? "active" : ""}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={activeLink === "search" ? "active" : ""}>
                        <Link to="/search" >Search</Link>
                    </li>
                    <li className={activeLink === "find" ? "active" : ""}>
                        <Link to="/find-the-lost" >Find the lost</Link>
                    </li>
                    <li className={activeLink === "add" ? "active" : ""}>
                        <Link to="/add-the-lost" >Add the lost</Link>
                    </li>
                    <li className={activeLink === "user" ? "active" : ""}>
                        <Link to="/user">User</Link>
                    </li>
                </ul>
            </div>
            <div className='profile-info '>
                <span>{userData.username ? userData.username[0] : null}</span>
                <p>{userData.username}</p>
            </div>
            <div className='burger-icon' onClick={showNav}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default NewHeader