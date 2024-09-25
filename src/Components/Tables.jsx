import React from 'react'
import ExpenseItems from './ExpenseItems'

function Tables({expenses,showBudget = true}) {
  return (
    <div>
      <table className='w-1/2 m-auto'>
        <thead>
            <tr>
                {
                    ["Name","Amount","Date",  showBudget ? "Budgets" : ""].map((o,index)=>{
                       return <th key={index} className="tracking-widest px-4">{o}</th>
                    })
                }
            </tr>
        </thead>
        <tbody>
           
            {
               
                expenses.map((expense,index) => {
                    return <tr key={index}>
                        <ExpenseItems expenses={expense} showBudget={showBudget}/>
                         </tr>
                    
                })
              
            }
           
        </tbody>
      </table>
    </div>
  )
}

export default Tables
