import React from "react";
import { calculateSpentBudget, formatCurrency, formatPercentage } from "../Utilities/helper";
import { Form, Link } from "react-router-dom";

function BudgetAnalysis({ budgets, showDelete = false }) {
	const { name, id, amount } = budgets;
	const spentAmount = calculateSpentBudget(id);
	return (
		<div className="flex align-middle justify-evenly mt-6">
			<h2 className="text-xl text-blue-500 mb-10 pr-2">{name}</h2>
			<p>{formatCurrency(amount)} Budgeted Amount</p>
		<progress max={amount} value={spentAmount} className="progress-bar w-[35%] h-4 max-[640px]:hidden">
     
				{/* {formatPercentage(spentAmount / amount)} */}
			</progress>
    
			<small className="pl-2">{formatCurrency(spentAmount)} spent</small>
			<small  className="px-3">{formatCurrency(amount - spentAmount)} remaining</small>
      
			 { showDelete ? (

      <Form method="post" action="delete" onSubmit={(event)=> {
        if(!confirm("Are you sure you want to delete budget")){
          return event.preventDefault()
        } 
      }}>
          <button>
            Delete
          </button>
      </Form>
   ) : (
    <Link
    to={`/budgets/${id}`}>
   <p className="underline px-3">View Details</p> 
    </Link>
   )
       } 
		</div>
    
	);
}

export default BudgetAnalysis;
