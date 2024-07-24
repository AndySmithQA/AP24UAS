import { useState} from 'react'
import useFetch from './useFetch'
import { Table } from 'react-bootstrap';

export default function BuildTable(){
    const [rows, setRows] = useState([])

    useFetch("http://localhost:3001/months", setRows)

    return (
       <Table striped hover>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Maximum</th>
                    <th>Actual</th>
                    <th>Percentage</th>
                    <th>Difference</th>
                    <th>Milage</th>
                </tr>
                </thead>
                <tbody>
                    {rows?.map(row =>
                        <tr key={row.id}>
                            <td>{row.currentMonth}</td>
                            <td>{row.max}</td>
                            <td>{row.actual}</td>
                            <td>{row.percentage}</td>
                            <td>{row.difference}</td>
                            <td style={{color: row.monthlyMilage > 666 ? "red" : "inherit"}}>
                                {row.monthlyMilage}
                            </td>
                        </tr>
                    )}
                </tbody>
       </Table>
        
    )
}