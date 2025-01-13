import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import FindLost from '../pages/FindTheLost/FindLost'
import AddTheLost from '../pages/AddTheLost/AddTheLost'
import Search from '../pages/Search/Search'
import User from '../pages/User/User'
import Adds from '../pages/Adds&Losts/Adds'
import Losts from '../pages/Adds&Losts/Losts'
import ForgotPassword from "../pages/Passwords/ForgotPassword"
import ChangePassword from "../pages/Passwords/ChangePassword"
import ResetPassword from "../pages/Passwords/ResetPassword"
import SecretCode from '../pages/Passwords/SecretCode'
import Matches from '../pages/Matches/Matches'
import RequireAuth from './RequireAuth'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserInfo } from '../redux/authSlice'



const AppRouter = () => {
  const dispatch =useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(getUserInfo(token));
    }
}, [dispatch]);
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/find-the-lost' 
          element={
          <RequireAuth>
            <FindLost/>
          </RequireAuth>}/>
          <Route path='/add-the-lost' 
          element={
          <RequireAuth>
            <AddTheLost/>
          </RequireAuth>}/>
          <Route path='/search' 
          element={
          <RequireAuth>
            <Search/>
          </RequireAuth>}/>
          <Route path='/user' element={<RequireAuth><User/></RequireAuth> }/>
          <Route path='/adds' element={<RequireAuth><Adds/></RequireAuth>}/>
          <Route path='/losts' element={<RequireAuth><Losts/></RequireAuth>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/change-password' element={<RequireAuth><ChangePassword/></RequireAuth>}/>
          <Route path='/secret-code' element={<SecretCode/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/matches' element={<RequireAuth><Matches/></RequireAuth>}/>
        </Routes>
      </div>
  )
}

export default AppRouter