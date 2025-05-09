import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const {state} = useBudget()

    const filteredExpenses = state.category 
    ? state.expenses.filter(expense => expense.category === state.category)
    : state.expenses

    const isEmpty = useMemo(()=> filteredExpenses.length === 0 ,[filteredExpenses])

  return (
    <div className="mt-5 bg-white shadow-lg rounded-lg p-5">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">Still no expenses</p> :(
            <>
                <p className="text-gray-600 text-2xl font-black">Expenses List</p>
                {filteredExpenses.map(expense => (
                    <ExpenseDetail
                        expense={expense}
                        key={expense.id}
                    />
                ))}
            </>
            
        )}
    </div>
  )
}
