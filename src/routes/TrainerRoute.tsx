import React from 'react'
import {Routes,Route} from 'react-router-dom'
import TrainerSignupPage from '../pages/trainer/TrainerSignupPage'
import TrainerOtpPage from '../pages/trainer/TrainerOtpPage'
import TrainerLoginPage from '../pages/trainer/TrainerLoginPage'
import TrainerLayout from '../components/trainers/TrainerLayout'
import TrainerForgotPasswordPage from '../pages/trainer/TrainerForgotPasswordPage'
import TrainerForgotPswdOtpPage from '../pages/trainer/TrainerForgotPswdOtpPage'
import TrainerResetpswdPage from '../pages/trainer/TrainerResetpswdPage'
import TrainerKyc from '../components/trainers/TrainerKyc'


function TrainerRoute() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<TrainerLayout/>}/>

      <Route path="/signup" element={<TrainerSignupPage/>}/>
      <Route path="/otp" element={<TrainerOtpPage/>}/>
      <Route path="/login" element={<TrainerLoginPage/>}/>
      <Route path="/trainer-forgotpassword" element={<TrainerForgotPasswordPage/>}/>
      <Route path="/trainer-forgotpswdOtp" element={<TrainerForgotPswdOtpPage/>}/>
      <Route path="/trainer-resetpassword" element={<TrainerResetpswdPage/>}/>
      <Route path="/trainerkyc" element={<TrainerKyc/>}/>








      </Routes>
    </div>
  )
}

export default TrainerRoute
