import React from 'react'
import './admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../components/addproduct/addproduct'
import ListProduct from '../../components/ListProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'> 
<Sidebar/>
<Routes>
    <Route path ='/addproduct' element={<AddProduct/>}></Route>
    <Route path ='/listproduct' element={<ListProduct/>}></Route>
</Routes>
    </div>
  )
}

export default Admin