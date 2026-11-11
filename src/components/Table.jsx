import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

export default function BuildTable({ months }){
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
                    {months.map(row =>
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

BuildTable.propTypes = {
    months: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        currentMonth: PropTypes.string.isRequired,
        max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        actual: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        difference: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        monthlyMilage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })).isRequired
}