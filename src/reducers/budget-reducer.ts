import type { Category, DraftExpense, Expense } from "../types"
import {v4 as uuidv4} from 'uuid'


export type BudgetActions =
    {type:'add-budget', payload:{newBudget:number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload:{expense: DraftExpense}} |
    {type: 'remove-expense', payload:{id:Expense['id']}} |
    {type: 'get-expense-by-id', payload:{id: Expense['id']}} |
    {type: 'update-expense', payload:{expense: Expense}} |
    {type: 'restart-app'} |
    {type: 'filter-by-category', payload:{id: Category['id']}}

export type BudgetState ={
    budget : number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    category: Category['id']
    
}

const initialBudgetStorage = () : number =>{
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpensesStorage = () : Expense[] =>{
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}



export const initialState : BudgetState ={
    budget: initialBudgetStorage(),
    modal: false,
    expenses: initialExpensesStorage(),
    editingId: '',
    category: ''
    
}

export const budgetReducer = (
    state : BudgetState = initialState,
    action: BudgetActions
) =>{

    if(action.type === 'add-budget'){
        return{
            ...state,
            budget:action.payload.newBudget
        }
    }

    if(action.type === 'show-modal'){
        return{
            ...state,
            modal: true
        }
    }
    if(action.type === 'close-modal'){
        return{
            ...state,
            modal: false,
            editingId: ''
        }
    }
    if(action.type === 'add-expense'){

        const newExpense : Expense= {
            ...action.payload.expense,
            id: uuidv4()
        }

        return{
            ...state,
            expenses: [...state.expenses, newExpense],
            modal:false
        }
    }

    if(action.type === 'remove-expense'){
        return{
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }
    
    if(action.type === 'get-expense-by-id'){
        return{
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }
    if(action.type === 'update-expense'){
        return{
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id 
            ? action.payload.expense 
            : expense ),
            modal: false,
            editingId: ''
        }
    }

    if(action.type === 'restart-app'){
        return{
            ...state,
            expenses:[],
            budget: 0
        }
    }
    if(action.type === 'filter-by-category'){
        return{
            ...state,
            category: action.payload.id
        }
    }

    return state
}