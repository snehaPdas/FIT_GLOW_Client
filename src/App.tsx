import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import UserRoutes from './routes/UserRoutes'
import TrainerRoute from './routes/TrainerRoute'
import AdminRoute from './routes/AdminRoute'

import toast,{Toaster} from "react-hot-toast"

function App() {
  return (
    <Router>
      <Toaster position ="top-right" reverseOrder={false}/>
      <Routes>

        <Route path='/*' element={<UserRoutes/>}/>
         <Route path="/trainer/*" element={<TrainerRoute/>} />
         <Route path="/admin/*" element={<AdminRoute/>} />

        
      </Routes>
    </Router>
  )
}

export default App
