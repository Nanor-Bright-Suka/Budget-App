

import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout'
import Dashboard, { CreateAccountAction} from './Pages/Dashboard'
import {UtilityLoader } from './Pages/Dashboard'
import Logout from './Pages/Logout'
import { action as LogoutAction} from './Pages/Logout'
import { Loader as LayoutLoader } from './Pages/Layout'
import ExpensePage from './Pages/ExpensePage'
import { ExPageLoader } from './Pages/ExpensePage'
import EachBudgetPage from './Pages/EachBudgetPage'
import { EachBgPgAction } from './Pages/EachBudgetPage'
import { EachBgPgLoader } from './Pages/EachBudgetPage'
import DeleteBudget from './Pages/DeleteBudget'
import { DeleteBudgetAction } from './Pages/DeleteBudget'
import { expensePageAction } from './Pages/ExpensePage'


const router = createBrowserRouter(createRoutesFromElements(
  <Route  element={<Layout />} loader={LayoutLoader}>
    <Route path="/" element={<Dashboard />} action={CreateAccountAction} loader={UtilityLoader}/>
    <Route path="Logout" element={<Logout />} action={LogoutAction} />  
    <Route path="expenses" element={<ExpensePage />} loader={ExPageLoader} action={expensePageAction}/>
    <Route path="/budgets/:id" element={<EachBudgetPage />} loader={EachBgPgLoader} action={EachBgPgAction}> 
    <Route path="delete" element={<DeleteBudget />} action={DeleteBudgetAction}/>

    </Route>
    

  
  </Route>
))



function App() {
  return (
    <RouterProvider router={router} />
     
  )
}

export default App
