import { useState } from "react";
import useFetch from "./useFetch";

export default function Stats(){
    const [data, setData] = useState([])

    useFetch('http://localhost:3001/months', setData)

  

    const statMaxMilage = data.map(ent =>
        ent.monthlyMilage
        )
    const statTotalMilage = data.map(ent =>
        ent.actual
        )
    const maximum = Math.max(...statMaxMilage)
    const minimum = Math.min(...statMaxMilage)
    const total = Math.max(...statTotalMilage)
    const average = (total / statTotalMilage.length)
   
   
    return (
        <div className="stats-bar ">
            <div className="container">
                <div className="row align-items-centre">
                    <div className="col-md-12">
                        <ul>
                            <li>Highest Monthly Mileage - {maximum}</li>
                            <li>Lowest Monthly Mileage - {minimum}</li>
                            <li>Average Monthly Mileage - {average.toFixed()}</li>
                        </ul>
                </div>
                </div>
            </div>
      </div>  
    )
}
