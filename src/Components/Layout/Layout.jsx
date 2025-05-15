import React from 'react'
import SideBar from '../Sidebar/SideBar'
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
export default function Layout() {
  return <>
  <div className="layout-container">
  <div className="sidebar">
    <SideBar />
  </div>
      <div className="main-content">
        <NavBar />
      </div>
    </div>
  <Outlet>
  <div className="container">
    
    </div>
    </Outlet>
  
  </>
}
