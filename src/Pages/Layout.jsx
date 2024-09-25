import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { fetchData } from '../Utilities/helper'

export function Loader () {
    const username = fetchData("username")
    return {username}
}

function Layout() {
   const {username} = useLoaderData()
   
  return (
    <>  
    <Navbar username={username} />
    <main>
      <Outlet />  
    </main>
    </>
  )
}

export default Layout
