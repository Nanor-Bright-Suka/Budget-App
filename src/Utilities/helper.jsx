

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//Create Account 
// export const createAccount = ({name}) => {
//     const objItem = {
//         username: name
//     }
//     return  localStorage.setItem("username", JSON.stringify(objItem))
// }


//Delete User 
export const DeleteItem = ({key, id}) => {
 const existingData = fetchData(key)

 if(id){
    const newData = existingData.filter((item) => item.id !== id)
    return localStorage.setItem(key, JSON.stringify(newData))
 }localStorage.removeItem(key)
}


//Create Budget
export const createBudget = ({name, amount}) => {
    const newItems = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
    }
     const existingData = fetchData("budgets")
    return localStorage.setItem("budgets", JSON.stringify([...existingData, newItems]))
}


/// Create Expenses

export const createExpense = ({name,amount,budgetId}) => {
    const newExpense = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses,newExpense]))
}

///Calculating Spent Budget
export const calculateSpentBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? []
    const budgetSpent = expenses.reduce((acc, expense)=> {
        if(expense.budgetId !== budgetId) return acc;
        return acc += expense.amount;
    },0)
    return budgetSpent;
}

//Format Currency

export const formatCurrency = amt => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}

//Format Percentages 
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

//Format Date 
 export const formateDate = (tm)=> {
    const date = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-GH',options)
    return formattedDate;
 }

 //Get All Matching Items
 export const getAllMatchingItems = ({category, key, value}) => {
        const data = fetchData(category)
   return  data.filter((item)=> item[key] === value)
  
 } 