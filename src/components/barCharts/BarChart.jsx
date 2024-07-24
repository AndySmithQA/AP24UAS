import { Bar } from "react-chartjs-2";

function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Monthly Milage</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Month by Month breakdown"
            },
            legend: {
              display: true
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;