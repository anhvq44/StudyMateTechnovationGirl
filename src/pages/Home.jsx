import '../index.css'
import NavBar from '../components/NavBar'
import { useState, useEffect } from 'react'
import HeaderDashboard from '../components/HeaderDashboard'

function Dashboard() {

  return (
    <>
      <NavBar></NavBar>
      <main className="ml-20 w-[calc(100%-5rem)] min-h-screen">
        <HeaderDashboard />
      </main>
    </>
  )
}

export default Dashboard