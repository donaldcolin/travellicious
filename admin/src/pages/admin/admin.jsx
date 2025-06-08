import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import AddProduct from '../../components/addproduct/addproduct'
import ListProduct from '../../components/ListProduct/ListProduct'
import ContactList from '../../components/contactus/ContactUs'
import ListOutings from '@/components/ListOuting/listOuting'
import AddOuting from '@/components/addOuting/addOuting'
import EditProduct from '@/components/EditProduct/EditProduct'
import EditOuting from '@/components/EditOuting/EditOuting'
import Bought from '@/components/bought/bought'
import { Growth } from '@/components/growth/growth'

const Admin = ({ user, onLogout }) => {
  return (
    <div className='admin'> 
      <Sidebar onLogout={onLogout} user={user} />
      <div className='admin-content'>
        <Routes>
          <Route path="/" element={<Navigate to="/listproduct" replace />} />
          <Route path="/addproduct" element={<AddProduct/>} />
          <Route path="/listproduct" element={<ListProduct/>} />
          <Route path="/listouting" element={<ListOutings/>} />
          <Route path="/addouting" element={<AddOuting/>} />
          <Route path="/contact" element={<ContactList/>} />
          <Route path="/editproduct/:id" element={<EditProduct/>} /> 
          <Route path="/updateOuting/:id" element={<EditOuting/>} />
          <Route path="/buy" element={<Bought/>} />
          <Route path="/growth" element={<Growth/>} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin