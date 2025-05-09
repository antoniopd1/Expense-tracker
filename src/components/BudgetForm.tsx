import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"


export default function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setBudget(e.target.valueAsNumber)
    }

    const isInvalid = useMemo(()=>{
        return isNaN(budget) || budget <= 0
    },[budget])

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({type:'add-budget',payload:{newBudget:budget}})
    }
    

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-3xl text-blue-600 font-bold text-center">
                Make a Budget
            </label>
            <input 
                type="number" className="w-full border bg-white border-gray-200 p-2" 
                placeholder="Define a Budget"
                id="budget"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>
        <input type="submit" 
            value="add now"
            className="disabled:opacity-30 bg-blue-600 hover:bg-blue-700 w-full cursor-pointer p-2 text-white font-bold uppercase"
            disabled={isInvalid}
        />
    </form>
  )
}
