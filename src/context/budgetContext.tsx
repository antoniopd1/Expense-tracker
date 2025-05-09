import { createContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer"


type BudgetContextProps ={
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    totalBudget: number
    remainingBudget: number
}

type BudgetProviderProps ={
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}:BudgetProviderProps) =>{


    const [state,dispatch] = useReducer(budgetReducer,initialState)

    const totalBudget = useMemo(()=> state.expenses.reduce((total, expense)=> total + expense.amount, 0),[state.expenses])
    const remainingBudget = state.budget - totalBudget

    return(
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalBudget,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )

}