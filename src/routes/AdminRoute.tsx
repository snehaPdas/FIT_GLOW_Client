import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminLayout from '../components/admin/AdminLayout';
import UserListingPage from '../pages/admin/UserListingPage';
import SpecializationPage from '../pages/admin/SpecializationPage';


function AdminRoute() {
  return (
    <Routes>
    <Route path="/login" element={<AdminLoginPage />} /> 
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} /> 
        <Route path="/user-listing" element={<UserListingPage />} />
        <Route path="/specialisations" element={<SpecializationPage />} />
      


    
      </Route>

    </Routes>
  );
}

export default AdminRoute;
