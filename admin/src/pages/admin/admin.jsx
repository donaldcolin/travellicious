import React from 'react'
import './admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../components/addproduct/addproduct'
import ListProduct from '../../components/ListProduct/ListProduct'
import ContactList from '../../components/contactus/ContactUs'
import ListOutings from '@/components/ListOuting/listOuting'
import AddOuting from '@/components/addOuting/addOuting'

const Admin = () => {
  return (
    <div className='admin'> 
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path="/addproduct" element={<AddProduct/>} />
          <Route path="/listproduct" element={<ListProduct/>} />
          <Route path="/listouting" element={<ListOutings/>} />
          <Route path="/addouting" element={<AddOuting/>} />
          <Route path="/contact" element={<ContactList/>} />

          <Route path="/buy" element={<div>Buy Page</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin