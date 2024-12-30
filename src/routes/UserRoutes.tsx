  import {Routes,Route} from 'react-router-dom'
  import SignupPage from '../pages/user/SignupPage'
  import Otp from "../pages/user/OtpPage"
  import Login from "../pages/user/LoginPage"
  import HomePage from '../pages/user/HomePage'
  import UserLoginProtector from './protector/UserLoginProtector'
  import ForgotPasswordPage from '../pages/user/ForgotPasswordPage'
  import ForgotPswdOtpPage from '../pages/user/ForgotPswdOtpPage'
  import ResetPasswordPage from '../pages/user/ResetPasswordPage'

  import React from 'react'

  function UserRoutes() {
    return (
      <Routes>
           <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="/forgot-passwordOtp" element={<ForgotPswdOtpPage/>}/>
          <Route path="/resetpassword" element={<ResetPasswordPage/>}/>



          

      </Routes>
      
    )
  }

  export default UserRoutes
