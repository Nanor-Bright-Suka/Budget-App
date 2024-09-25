import React, { useEffect, useRef } from 'react'
import {  useFetcher} from 'react-router-dom'

function BudgetForm() {
  const fetcher = useFetcher()
  const InputRef = useRef()
   const formRef = useRef()
  const isSubmitting = fetcher.state === "submitting"

  //UseEffect for Ref
  useEffect(()=> {
    if(!isSubmitting){ 
      InputRef.current.focus()
      formRef.current.reset()
    }
  },[isSubmitting])
  return (
     <div className='flex'>
      <fetcher.Form method="post"  ref={formRef}
       className='flex flex-col mx-auto rounded-md border-2 border-neutral-800 gap-4 p-6 ' >
        <label htmlFor="budgetName" className='text-3xl'>Budget Name</label>
        <input 
        type="text"
        id='budgetName' 
        name="budgetName"
        required
        placeholder='e.g Groceries'
        className='px-2 py-1 border-2 border-black rounded-md outline-none  '
        ref={InputRef}
        />
        <label htmlFor="budgetAmount" className='text-3xl'>Amount</label>
        <input 
        type="number"
        id='budgetAmount' 
        step="0.01"
        name='budgetAmount'
        placeholder='e.g $350'
        inputMode='decimal'
        required
       className='px-2 py-1 border-2 border-black rounded-md outline-none'
        />
        <input type="hidden" name='_action' value="budgetName" />
        <button 
        className='px-3 py-1 border-2 rounded-md
         bg-blue-700 border-none text-gray-200 text-2xl '
        > 
      {  isSubmitting ? "Submitting..." : "Create Budget" } 
        </button>
      </fetcher.Form>
     </div>
  )
}

export default BudgetForm
