import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import useFetch from '../useFetch'
import BarChart from "./BarChart";
import { useState } from "react";


Chart.register(CategoryScale);

export default function ShowBarGraph(){
    const [chartData, setChartData] = useState(null); 

    const initChartData = (data) => {
    
        const year1 = data.slice(0, 12);
 
        const monthOnly = year1.map((month) => month.currentMonth.split("-")[0]);

        const year2 = data.slice(12, 23);

        setChartData({
            labels: monthOnly,
            datasets: [{
                type: 'bar',
                label: "Year 1",
                data: year1.map((month) => month.monthlyMilage),
                backgroundColor: "#0D392E",
                order: 2,
                stack: 1
            },
            {
                type: 'bar',
                label: "Year 2",
                data: year2.map((month) => month.monthlyMilage),
                backgroundColor: "#CED7E5",
                order: 2,
                stack: 0
            },
            {
                type: "line",
                label: "Max Allowance",
                data: data.map((month) => month.maxAllowance),
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