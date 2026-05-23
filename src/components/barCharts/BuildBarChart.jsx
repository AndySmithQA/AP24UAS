import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import useFetch from '../useFetch'
import BarChart from "./BarChart";
import { useState } from "react";


Chart.register(CategoryScale);

export default function ShowBarGraph(){
    const [chartData, setChartData] = useState(null); 

    const initChartData = (data) => {
        if (!data?.length) {
            setChartData(null);
            return;
        }

        const MONTHS_IN_YEAR = 12;
        const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const parseMonthLabel = (label) => {
            if (!label || typeof label !== "string") return null;

            const [rawMonth, rawYear] = label.split("-");
            const monthKey = rawMonth?.trim().slice(0, 3);
            const yearValue = Number(rawYear);
            let monthIndex = MONTH_NAMES.indexOf(monthKey);

            // Gracefully handle small typos such as "Auh" by matching first two letters.
            if (monthIndex === -1 && rawMonth?.trim().length >= 2) {
                const twoLetterPrefix = rawMonth.trim().slice(0, 2).toLowerCase();
                const candidates = MONTH_NAMES
                    .map((monthName, idx) => ({ monthName, idx }))
                    .filter(({ monthName }) => monthName.toLowerCase().startsWith(twoLetterPrefix));

                if (candidates.length === 1) {
                    monthIndex = candidates[0].idx;
                }
            }

            if (monthIndex === -1 || Number.isNaN(yearValue)) return null;

            return {
                monthIndex,
                year: yearValue < 100 ? 2000 + yearValue : yearValue
            };
        };

        const start = parseMonthLabel(data[0].currentMonth);
        if (!start) {
            setChartData(null);
            return;
        }

        const labels = Array.from({ length: MONTHS_IN_YEAR }, (_, index) =>
            MONTH_NAMES[(start.monthIndex + index) % MONTHS_IN_YEAR]
        );

        const year1Data = Array(MONTHS_IN_YEAR).fill(null);
        const year2Data = Array(MONTHS_IN_YEAR).fill(null);
        const year3Data = Array(MONTHS_IN_YEAR).fill(null);
        const maxAllowanceByMonth = Array(MONTHS_IN_YEAR).fill(null);

        data.forEach((entry) => {
            const parsed = parseMonthLabel(entry.currentMonth);
            if (!parsed) return;

            const monthOffset = (parsed.year - start.year) * MONTHS_IN_YEAR + (parsed.monthIndex - start.monthIndex);
            if (monthOffset < 0) return;

            const yearBucket = Math.floor(monthOffset / MONTHS_IN_YEAR);
            const monthSlot = monthOffset % MONTHS_IN_YEAR;
            const mileageValue = Number(entry.monthlyMilage);

            if (Number.isNaN(mileageValue)) return;

            if (yearBucket === 0) year1Data[monthSlot] = mileageValue;
            if (yearBucket === 1) year2Data[monthSlot] = mileageValue;
            if (yearBucket === 2) year3Data[monthSlot] = mileageValue;

            if (maxAllowanceByMonth[monthSlot] === null && entry.maxAllowance !== undefined) {
                maxAllowanceByMonth[monthSlot] = Number(entry.maxAllowance);
            }
        });

        setChartData({
            labels,
            datasets: [{
                type: 'bar',
                label: "Year 1",
                data: year1Data,
                backgroundColor: "#0D392E",
                order: 2,
                stack: 1
            },
            {
                type: 'bar',
                label: "Year 2",
                data: year2Data,
                backgroundColor: "#CED7E5",
                order: 2,
                stack: 0
            },
            {
                type: 'bar',
                label: "Year 3",
                data: year3Data,
                backgroundColor: "#5B7A95",
                order: 2,
                stack: 2
            },
            {
                type: "line",
                label: "Max Allowance",
                data: maxAllowanceByMonth,
                order: 1,
                backgroundColor: "red",
                borderColor: "red",
                pointRadius: 0
            }
        ]
        });
        
    };
    
    useFetch("http://localhost:3001/months", initChartData);
    
    return (
        <div className="App">
            {chartData && <BarChart chartData={chartData}/>}
        </div>
    );
}