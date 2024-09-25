import React from 'react'
import { Form, NavLink } from 'react-router-dom'


function Navbar({username}) {
    const handleSubmit = (e) => {
        if(!confirm("Please do you want to delete user")){
            e.preventDefault()
        }
    }
  return (
    <div className='flex justify-between max-[600px]:mb-8'>
       { username && 
       <>
      <NavLink to="/" className='text-2xl ml-3 hover:underline mt-2'>
        Home
      </NavLink>
      <Form method="post" action='/Logout' onSubmit={handleSubmit}>
            <button className='px-2 py-2 bg-slate-300 text-red-600 
            text-2xl mr-2 rounded-md mt-2 custom-button'>Delete User</button>
        </Form>
        </>
   }
    </div>
  )
}

export default Navbar
