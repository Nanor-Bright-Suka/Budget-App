import React from 'react'
import { createExpense, DeleteItem, getAllMatchingItems } from '../Utilities/helper'
import { useLoaderData } from 'react-router-dom';
import BudgetAnalysis from '../Components/BudgetAnalysis';
import ExpenseForm from '../Components/ExpenseForm';
import Tables from '../Components/Tables';
import ExpenseItems from '../Components/ExpenseItems';

//Loader 
export async function EachBgPgLoader({params}){
    const budget = await getAllMatchingItems({category: "budgets", 
        key: "id", 
        value: params.id})[0];
    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    })
  
    if(!budget){ 
        throw new Error("The Budget you are trying to find doesn't exist")
    } 
    return { budget, expenses }
};


    export async function EachBgPgAction({request}){
        const {_action, ...values} = Object.fromEntries(await request.formData())
       
        if(_action === "deleteExpense"){
          try { 
        DeleteItem({
              key: "expenses",
              id: values.expenseId
          })  
       } catch(error){
        throw new Error("There was a problem deleting your Expenses")
       }  
        }

        //Creating Expenses 
        if (_action === "expenseName") {
            try {
                createExpense({
                    name: values.expenseName,
                    amount: values.expenseAmount,
                    budgetId: values.newExpenseName,
                });
            } catch (error) {
                throw new Error("Please There was a problem creating your expense");
            }
           
        }
        return null
    }

       function EachBudgetPage() {
        const {budget , expenses} = useLoaderData()
        
        
  return (
    <div>
    <h1 className='text-3xl text-center'>{budget.name}  {" "} Overview</h1>
        <BudgetAnalysis budgets={budget} showDelete={true}/>
        <div className='max-[600px]:mt-20'> 
       <ExpenseForm budgets={[budget]}/>
       </div>
    
       {
        expenses && expenses.length > 0 && (
            <div className='mt-24'>
            <h2 className='text-center text-3xl underline mb-3'>{budget.name} {" "} Expenses</h2>  
            <Tables expenses={expenses} showBudget={false}/>
            </div>
        )
       }
        
    </div>
  )
}export default EachBudgetPage;