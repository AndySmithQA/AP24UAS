import { useState } from 'react'
import  useFetch  from './useFetch'

export default function Input(){
    const [calcData, setCalcData] = useState([])
    const [currentMonth, setCurrentMonth] = useState('')
    const [actual, setActual] = useState()

    const normalizeMonthLabel = (label) => {
        const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const [monthPart, yearPart] = (label || "").split("-");
        const monthValue = monthPart?.trim();
        const yearValue = yearPart?.trim();

        if (!monthValue || !yearValue) return null;

        const monthKey = monthValue.slice(0, 3);
        const month = MONTHS.find((m) => m.toLowerCase() === monthKey.toLowerCase());
        const year = Number(yearValue);

        if (!month || Number.isNaN(year)) return null;

        return `${month}-${String(year).slice(-2)}`;
    }

    useFetch("http://localhost:3001/months", setCalcData)
    
    const handleSubmit = async (event) =>{
        if (!actual || !currentMonth) {
            alert("Please Enter Data")
        } else {
        event.preventDefault()

        const formattedMonth = normalizeMonthLabel(currentMonth)
        if (!formattedMonth) {
            alert("Month label must be in format MMM-YY, for example Aug-26")
            return
        }

        const max = calcData[calcData.length - 1].max + 666
        const percentage = (actual/max *100).toFixed(2)
        const difference = (max - actual)
        const monthlyMilage = (actual - calcData[calcData.length - 1].actual);
        const maxAllowance = 666
        
        const record = {currentMonth: formattedMonth, max, actual, percentage, difference, monthlyMilage, maxAllowance}

        fetch('http://localhost:3001/months', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(record)
            })
            .then(() =>{
                window.location.reload()
            })
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="inputs-bar p-2">
                <h3>Enter Monthly Stats</h3>
                
                <label>Month Label: </label>
                <input 
                    type="text"
                    value={currentMonth} 
                    onChange={(e) => setCurrentMonth(e.target.value)}
                    placeholder='e.g. Feb-24'
                />
                <label>Total Miles: </label>
                <input 
                    type="text"
                    value={actual} 
                    onChange={(e) => setActual(e.target.value)}
                    placeholder='enter milage'
                />
                <button type='submit'>Enter Updates</button>
            </div>
        </form>
    )
}