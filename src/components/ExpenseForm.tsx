import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState, type ChangeEvent } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export default function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName:'',
    category: '',
    date: new Date()
  })

  const {dispatch,state, remainingBudget} = useBudget()
  const [preAmount, setPreAmount] = useState(0)

  const [error, setError] = useState('')

  useEffect(()=>{
    if(state.editingId){
      const bringExpense = state.expenses.filter(curExpense => curExpense.id === state.editingId)[0]
      setExpense(bringExpense)
      setPreAmount(bringExpense.amount)
    }

  },[state.editingId])

  const handleChangeDate = (value: Value) =>{
    setExpense({
      ...expense,
      date: value
    })

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
    setExpense({
      ...expense,
      [e.target.name]: e.target.name==='amount' ? +e.target.value : e.target.value
    })

  }

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(Object.values(expense).includes('')){
      setError('Empty field is not aceptable')
      return
    }

    if((expense.amount - preAmount) > remainingBudget){
      setError('not enough available budget')
      return
    }

    if(state.editingId){
      dispatch({type:'update-expense',payload:{expense: {...expense, id: state.editingId}}})
    }
    else{
      dispatch({type:'add-expense',payload:{expense}})
    } 


    setExpense({
      amount: 0,
      expenseName:'',
      category: '',
      date: new Date()
    })
    setPreAmount(0)

  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-xl font-black text-center border-b-3 border-blue-500">
        {state.editingId ? 'Update Fields' : 'New Bill'}
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-5">
        <label htmlFor="expenseName"
          className="text-xl"
          >
          Bill Name:
        </label>
        <input type="text" 
          id="expenseName"
          name="expenseName"
          placeholder="Add a bill"
          className="bg-slate-100 p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label htmlFor="amount"
          className="text-xl"
          >
          Amount:
        </label>
        <input type="number" 
          id="amount"
          name="amount"
          placeholder="Add new amount"
          className="bg-slate-100 p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-5">
        <label htmlFor="amount"
          className="text-xl"
          >
          Category:
        </label>
        <select 
          id="category"
          name="category"
          className="bg-slate-100 p-2"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Choose an option --</option>
          {categories.map(category => (
            <option id={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-5">
        <label htmlFor="amount"
          className="text-xl"
          >
          Date Expense:
        </label>
        
        <DatePicker
          className="bg-slate-100 border-0 p-2"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input type="submit" 
        className="w-full bg-blue-600 rounded-lg text-white uppercase font-bold cursor-pointer p-2"
        value={state.editingId ? 'Save Changes' : 'Log Expense'}
      />
    </form>
  )
}
