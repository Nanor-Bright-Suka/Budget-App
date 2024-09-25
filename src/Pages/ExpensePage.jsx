import React from 'react'
import { DeleteItem, fetchData } from '../Utilities/helper'
import { useLoaderData } from 'react-router-dom'
import Tables from '../Components/Tables'


export async function ExPageLoader(){
    const expenses = await fetchData("expenses")
    return {expenses}
}

export async function expensePageAction({request}){
const data = await request.formData()
const {_action,...values} = Object.fromEntries(data)

if(_action === "deleteExpense"){
  try{
    DeleteItem({
      key: "expenses",
      id: values.expenseId,
    })
  }catch(e){
    throw new Error("There was a problem deleting your expense")
  }
}
return null
}

 
function ExpensePage() {
    const {expenses} = useLoaderData()
  return (
    <div>
      <>
        
      <h1 className='text-center text-4xl '>All Expenses</h1>
      {
        expenses && expenses.length > 0 ? (
            <>
            <h2 className='text-center text-xl m-5'> Recent Expenses <small>({expenses.length} total)</small></h2>
            
            <Tables expenses={expenses} />
            </>
        ):(
            <p className='text-4xl text-red-600'>No Expenses To Show</p>
        )
      }
      </>
    </div>
  )
}

export default ExpensePage
