import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import PropTypes from "prop-types";
import LineChart from "./LineChart";
import { useMemo } from "react";

Chart.register(CategoryScale);

export default function ShowGraph({ months }){
    const chartData = useMemo(() => ({
            labels: months.map((month) => month.currentMonth),
            datasets: [
                {
                    label: "Monthly Milage",
                    yAxisID: 'milage',
                    data: months.map((month) => month.max),
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
                    data: months.map((month) => month.actual),
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
                    data: months.map((month) => month.percentage),
                    borderColor: "#0D392E",
                    backgroundColor: [
                        "#0D392E"
                    ],
                    borderWidth: 2,
                    pointRadius: 0
                }
            ]
        }), [months]);

    return (
        <div className="App">
            {chartData && <LineChart chartData={chartData}/>}
        </div>
    );
}

ShowGraph.propTypes = {
    months: PropTypes.arrayOf(PropTypes.shape({
        currentMonth: PropTypes.string.isRequired,
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        actual: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })).isRequired
}