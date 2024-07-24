import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import useFetch from '../useFetch'
import LineChart from "./LineChart";
import { useState } from "react";

Chart.register(CategoryScale);

export default function ShowGraph(){
    const [chartData, setChartData] = useState(null);

    const initChartData = (data) => {
        setChartData({
            labels: data.map((month) => month.currentMonth),
            datasets: [
                {
                    label: "Monthly Milage",
                    yAxisID: 'milage',
                    data: data.map((month) => month.max),
                    backgroundColor: [
                        "blue"
                    ],
                    borderColor: "blue",
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: "Actual Milage",
                    yAxisID: 'milage',
                    data: data.map((month) => month.actual),
                    backgroundColor: [
                        "red"
                    ],
                    borderColor: "red",
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: "Percentage",
                    yAxisID: "percentage",
                    data: data.map((month) => month.percentage),
                    borderColor: "#0D392E",
                    backgroundColor: [
                        "#0D392E"
                    ],
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        });
    };

    useFetch("http://localhost:3001/months", initChartData);

    return (
        <div className="App">
            {chartData && <LineChart chartData={chartData}/>}
        </div>
    );
}