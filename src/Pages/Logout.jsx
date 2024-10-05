import React from 'react'
import { DeleteItem } from '../Utilities/helper'
import { redirect } from 'react-router-dom';


export async function action (){
 DeleteItem({
  key: "username"
 })
 DeleteItem({
  key: "budgets"
 })
 DeleteItem({
  key: "expenses"
 })
        return redirect("/")
}

function Logout() {
  return (
    <div>
  
    </div>
  )
}

export default Logout
