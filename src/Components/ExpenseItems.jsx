import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formateDate, getAllMatchingItems } from "../Utilities/helper";
import { FaRegTrashCan } from "react-icons/fa6";


function ExpenseItems({ expenses,showBudget= true }) {
	const fetcher = useFetcher();
	 const budget = getAllMatchingItems({
		category: "budgets",
		key: "id",
		value: expenses.budgetId,
	 })
	 let [me] = budget.map(item => item.name)
	 let [id] = budget.map(item => item.id)
	
	
	return (
		<>
			<td className="text-center">{expenses.name}</td>
			<td className="text-center">{formatCurrency(expenses.amount)}</td>
			<td className="text-center">{formateDate(expenses.createdAt)}</td>
		
				{
					showBudget && (
						<td>
							<Link
							to={`/budgets/${id}`} className="px-3">
								{me}
							</Link>
						</td>
					)
				}
			
			<td className="text-center">
				<fetcher.Form method="post">
					<input type="hidden" name="_action" value="deleteExpense" />
					<input type="hidden" name="expenseId" value={expenses.id} />
					<button>
						<FaRegTrashCan className="text-2xl " />
					</button>
				</fetcher.Form>
			</td>
		</>
	);
}

export default ExpenseItems;
