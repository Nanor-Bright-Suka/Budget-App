import React, { useState } from 'react'
import { Form } from 'react-router-dom'

function CreateAccount() {
  const [submitting, setSubmitting] = useState(true)
 const [onchangestate,setOnChangeState] = useState("")

 const handleOnChange = (e) => {
  const value = e.target.value
   setOnChangeState(value)
   if(!value.trim()){
    setSubmitting(true)
 
   }else{
    setSubmitting(false)
    
   }
 }

  return (
    <div>
       <div className='flex justify-center flex-col mx-auto'>
      <h1 className='text-center text-4xl mt-5'>Take Control of  Your Money</h1>
        <p className=' text-black text-xl text-center mt-2
         tracking-wider max-[600px]:my-5'>Personal budgeting is the secret to financial freedom <br /> Start your journey today</p>
        <Form method="post" 
        className='text-center flex flex-col 
        mx-auto w-80  mt-5 border-2 border-neutral-600 h-44 p-10 rounded-md'>
            <input 
            type="text"
            name='username' 
            required
            placeholder='What is your name'
            autoComplete='family-name'
            className='border-2 border-neutral-700 w-70 py-2 px-8 rounded-md mb-8 outline-none'
            onChange={handleOnChange}
            />
            <input type="hidden" name='_action' value="username" />
            <button className='px-5 py-2 text-center bg-blue-700
             text-white rounded-md' disabled={submitting}>
           {submitting ? "Create Account" :  "Submit"}
            </button>
        </Form>
      
    </div>
    </div>
  )
}

export default CreateAccount
