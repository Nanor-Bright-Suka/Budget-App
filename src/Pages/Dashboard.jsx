//React Dependencies
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

//Components
import CreateAccount from "../Components/CreateAccount";
import BudgetForm from "../Utilities/BudgetForm";
import ExpenseForm from "../Components/ExpenseForm";
import BudgetAnalysis from "../Components/BudgetAnalysis";
import Tables from "../Components/Tables";

//Helpers
import { createBudget, createExpense, DeleteItem } from "../Utilities/helper";
import { fetchData } from "../Utilities/helper";


//Loaders
export function UtilityLoader() {
	const username = fetchData("username");
	const budgets = fetchData("budgets");
	const expenses = fetchData("expenses");
	return { username, budgets, expenses };
}

export async function CreateAccountAction({ request }) {
	//Create Account Action
	const { _action, ...values } = Object.fromEntries(await request.formData());
	if (_action === "username") {
		try {
			localStorage.setItem("username", JSON.stringify(values.username));
			
		} catch (e) {
			throw new Error("Please there was a problem creating your account");
		}
	} 

	//budget Creation
	if (_action === "budgetName") {
		try {
			createBudget({
				name: values.budgetName,
				amount: values.budgetAmount,
			});
		} catch (e) {
			throw new Error("Please there was a problem creating your budget");
		}
	}

	// Expense Creation
	if (_action === "expenseName") {
		try {
			createExpense({
				name: values.expenseName,
				amount: values.expenseAmount,
				budgetId: values.newExpenseName,
			});
		} catch (e) {
			throw new Error("Please there was a problem creating your expense");
		}
	}

  //Deleting Expense
  if(_action === "deleteExpense"){
    try{
      DeleteItem({
        key: "expenses",
        id: values.expenseId,
      })
    }catch(e){
      throw new Error("There was a problem deleting your Expenses")
    }
  }

	return null;
}

function Dashboard() {
	const { username, budgets, expenses } = useLoaderData();

	return (
		<>
			{username ? ( 
				<>
					<h1 className="text-6xl text-center max-[600px]:text-4xl">Welcome {username}</h1>
					{
                        budgets && budgets.length > 0 ? (
						<di>
							<div className="text-center mb-8">
								<h1 className="text-xl text-black">Personal Budgeting Is The Secret To Financial Freedom</h1>
								<p className="text-xl text-black">Create A Budget to get started</p>
							</div>
							<div className="flex flex-wrap justify-center gap-10 sm:mt-16
							max-[600px]:mt-12 max-[600px]:gap-24">
							<BudgetForm />
							<ExpenseForm budgets={budgets} />
							</div>
							<div className="border-2 border-black m-10  w-[80%] max-[639px]:hidden" >
								<h2 className="text-3xl text-center hover:underline cursor-pointer mb-5">Existing Budget</h2>
								{ budgets.map((budget) => (
									<BudgetAnalysis key={budget.id} budgets={budget}/>
								
								))}
							</div>

							{expenses && expenses.length > 0 && (
								<div>
									<h2 className="text-center text-3xl hover:underline cursor-pointer mt-20">Recent Expenses</h2>
									<Tables expenses={expenses.sort((a, b) => a.createdAt - b.createdAt).slice(0, 8)} />
									<div className="flex justify-center">
										{expenses.length > 8 && (
											<Link to="expenses" className="text-3xl text-blue-950 hover:underline">
												View all{" "}
											</Link>
										)}
									</div>
								</div>
							)}
						</di>) :(
						<>
							<div className="text-center mt-4 mb-10 
							 flex flex-wrap flex-col  justify-center items-center">
								<h3 className="text-2xl text-black max-[600px]:text-xl">
									Personal Budgeting Is The Secret To <br /> Financial Freedom,
								Create A Budget to get started </h3>
							</div>
							<BudgetForm />
						</>
          )}
				</>
      ) : (
	  <CreateAccount />
	)
      }
		</>
	);
}

export default Dashboard;
