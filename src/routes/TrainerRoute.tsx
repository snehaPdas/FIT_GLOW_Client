import React from 'react'
import {Routes,Route} from 'react-router-dom'
import TrainerSignupPage from '../pages/trainer/TrainerSignupPage'
import TrainerOtpPage from '../pages/trainer/TrainerOtpPage'
import TrainerLoginPage from '../pages/trainer/TrainerLoginPage'
import TrainerLayout from '../components/trainers/TrainerLayout'
import TrainerForgotPasswordPage from '../pages/trainer/TrainerForgotPasswordPage'
import TrainerForgotPswdOtpPage from '../pages/trainer/TrainerForgotPswdOtpPage'
import TrainerResetpswdPage from '../pages/trainer/TrainerResetpswdPage'
import TrainerDashboard from '../components/trainers/TrainerDashboard'
import ScheduleSessions from '../components/trainers/ScheduleSessions'
import ProtectRoute from "../routes/protector/TrainerProtectRoute"

// import TrainerKyc from '../components/trainers/TrainerKyc'
// import KycSubmitStatus from '../components/trainers/KycSubmitStatus'

function TrainerRoute() {
  return (
    
      <Routes>
      <Route path="/otp" element={<TrainerOtpPage/>}/>
      <Route path="/signup" element={<TrainerSignupPage/>}/>
      <Route path="/login" element={<TrainerLoginPage/>}/>
      <Route path="/trainer-forgotpassword" element={<TrainerForgotPasswordPage/>}/>
      <Route path="/trainer-forgotpswdOtp" element={<TrainerForgotPswdOtpPage/>}/>
      <Route path="/trainer-resetpassword" element={<TrainerResetpswdPage/>}/>
      <Route path="/" element={<TrainerLayout/>} >
      <Route index element={<ProtectRoute><TrainerDashboard/></ProtectRoute>}/>
      <Route path="/schedulesessions" element={<ProtectRoute><ScheduleSessions /></ProtectRoute>} />
     </Route>
     
      </Routes>
    
  )
}

export default TrainerRoute
