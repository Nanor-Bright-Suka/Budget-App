

import React, { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

function ExpenseForm({budgets}) {


    //usefetcher
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"

    //UseRef
    const formRef = useRef(null)
    const inputRef = useRef(null)

    //UseEffect
    useEffect(()=> {
        if(!isSubmitting){
            formRef.current.reset()
            inputRef.current.focus()
        } 
    },[isSubmitting])
  return (
    <div className='flex items-center justify-center h-64  flex-col '>
        <h1 className='text-center text-2xl hover:underline cursor-pointer'>Add new 
          <span className='text-gray-950'>{ budgets.length === 1 && budgets.map((item)=> <span key={item} className='text-blue-400'>{" "}{item.name} Expenses</span>)} </span> </h1>
      <fetcher.Form  method="post" ref={formRef} className='mt-3 flex flex-col m-auto max-w-72 border-2 border-black rounded-md'>
        <div className='m-3'>
            <label htmlFor='expenseName' className='text-2xl'>Expense Name </label>
                <input 
                type="text" 
                id='expenseName'
                name='expenseName'
                ref={inputRef}
                required
                placeholder='e.g, Milk Cartoon'
                className='w-56 ml-1 py-1 outline-none rounded-md border-2 border-neutral-900'/>
        </div>
        <div className='m-3'> 
        <label htmlFor="expenseAmount" className='text-2xl'>Expense Amount</label>
        <input
         type="number" 
         id='expenseAmount'
         step="0.01"
         name='expenseAmount'
         required
         placeholder='e.g, $50'
         inputMode='decimal'
          className='w-56 ml-1 py-1 outline-none rounded-md border-2 border-neutral-900'
         />
        </div>
        <div hidden={budgets.length === 1} className='text-center'>
          <label htmlFor="newExpenseName">Budget Category</label>
          <select name="newExpenseName" id="newExpenseName" required className='border-2 border-neutral-800'>
            {
          budgets.sort((a,b) => a.createdAt - b.createdAt).map((budget)=> {
            return(
              <option value={budget.id} key={budget.id}>
                {budget.name}
              </option>
            )
          })

            }
          </select>
        </div>
        <input type="hidden" name='_action' value='expenseName' />
        <button disabled={isSubmitting} className='px-5 py-1 border-2 rounded-md bg-blue-700 border-none text-gray-200 text-2xl m-6'>{isSubmitting ? "Submitting..." : "Add Expense"}</button>
      </fetcher.Form>
    </div>
  )
}

export default ExpenseForm
