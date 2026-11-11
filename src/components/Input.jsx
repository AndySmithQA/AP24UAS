import { useState } from 'react'
import PropTypes from 'prop-types'

export default function Input({ months, onMonthAdded }){
    const [currentMonth, setCurrentMonth] = useState('')
    const [actual, setActual] = useState('')
    const [submissionError, setSubmissionError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    const handleSubmit = async (event) =>{
        event.preventDefault()
        setSubmissionError('')

        if (!actual || !currentMonth) {
            alert("Please Enter Data")
            return
        }

        const formattedMonth = normalizeMonthLabel(currentMonth)
        if (!formattedMonth) {
            alert("Month label must be in format MMM-YY, for example Aug-26")
            return
        }

        const lastMonth = months[months.length - 1]
        if (!lastMonth) {
            setSubmissionError('Monthly data is not available yet.')
            return
        }

        const actualValue = Number(actual)
        if (!Number.isFinite(actualValue) || actualValue < 0) {
            setSubmissionError('Total miles must be a non-negative number.')
            return
        }

        const max = Number(lastMonth.max) + 666
        const percentage = (actualValue / max * 100).toFixed(2)
        const difference = max - actualValue
        const monthlyMilage = actualValue - Number(lastMonth.actual)
        const maxAllowance = 666
        
        const record = {currentMonth: formattedMonth, max, actual: actualValue, percentage, difference, monthlyMilage, maxAllowance}

        setIsSubmitting(true)
        try {
            const response = await fetch('http://localhost:3001/months', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(record)
            })

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }

            const savedMonth = await response.json()
            onMonthAdded(savedMonth)
            setCurrentMonth('')
            setActual('')
        } catch (error) {
            console.error('[ERROR] Cannot save monthly data', error)
            setSubmissionError(error instanceof Error ? error.message : 'Unable to save monthly data.')
        } finally {
            setIsSubmitting(false)
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
                    type="number"
                    min="0"
                    step="any"
                    required
                    value={actual} 
                    onChange={(e) => setActual(e.target.value)}
                    placeholder='enter milage'
                />
                <button type='submit' disabled={isSubmitting || months.length === 0}>
                    {isSubmitting ? 'Saving...' : 'Enter Updates'}
                </button>
                {submissionError && <p className="text-danger" role="alert">{submissionError}</p>}
            </div>
        </form>
    )
}

Input.propTypes = {
    months: PropTypes.arrayOf(PropTypes.shape({
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        actual: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })).isRequired,
    onMonthAdded: PropTypes.func.isRequired
}