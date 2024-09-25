import React from 'react'
import { DeleteItem, getAllMatchingItems } from '../Utilities/helper'
import { redirect } from 'react-router-dom'




export async function DeleteBudgetAction({params}){
    try{
        DeleteItem(
            {
                key: "budgets",
                id: params.id,
            }
        )
        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })
        associatedExpenses.forEach((expense)=> {
            DeleteItem(
                {
                key: "expenses",
                id: expense.id,
            }
            )
        })
    }catch(error){
        throw new Error("There was a problem deleting your budget")
    }
    return redirect("/")
}




function DeleteBudget() {
  return (
    <div>
      
    </div>
  )
}

export default DeleteBudget
