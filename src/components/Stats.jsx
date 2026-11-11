import PropTypes from "prop-types";

export default function Stats({ months }){
    const monthlyMileage = months
        .map((month) => Number(month.monthlyMilage))
        .filter(Number.isFinite)
    const maximum = monthlyMileage.length ? Math.max(...monthlyMileage) : '--'
    const minimum = monthlyMileage.length ? Math.min(...monthlyMileage) : '--'
    const average = monthlyMileage.length
        ? (monthlyMileage.reduce((total, mileage) => total + mileage, 0) / monthlyMileage.length).toFixed()
        : '--'
   
   
    return (
        <div className="stats-bar ">
            <div className="container">
                <div className="row align-items-centre">
                    <div className="col-md-12">
                        <ul>
                            <li>Highest Monthly Mileage - {maximum}</li>
                            <li>Lowest Monthly Mileage - {minimum}</li>
                            <li>Average Monthly Mileage - {average}</li>
                        </ul>
                </div>
                </div>
            </div>
      </div>  
    )
}

Stats.propTypes = {
    months: PropTypes.arrayOf(PropTypes.shape({
        monthlyMilage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })).isRequired
}
