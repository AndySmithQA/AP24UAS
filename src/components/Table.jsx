import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

export default function BuildTable({ months }){
    const contractEndDate = new Date(2027, 6, 27); // July 27, 2027

    const parseMonthString = (monthStr) => {
        const [month, year] = monthStr.split('-');
        const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
        return new Date(2000 + parseInt(year), monthMap[month], 15);
    };

    const calculateRemainingMonths = (monthStr) => {
        const monthDate = parseMonthString(monthStr);
        let count = 0;
        let currentDate = new Date(monthDate);
        
        while (currentDate <= contractEndDate) {
            count++;
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        
        return count;
    };

    const calculateRemainingMonthsOverageCost = (monthlyMilage, maxAllowance, monthStr) => {
        const overage = monthlyMilage - maxAllowance;
        if (overage <= 0) return 0;
        
        const remainingMonths = calculateRemainingMonths(monthStr);
        const totalOverage = overage * remainingMonths;
        const cost = totalOverage * 0.08;
        return cost.toFixed(2);
    };

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
                    <th>Remaining Months Overage Cost</th>
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
                            <td style={{color: row.monthlyMilage > row.maxAllowance ? "red" : "inherit"}}>
                                £{calculateRemainingMonthsOverageCost(row.monthlyMilage, row.maxAllowance, row.currentMonth)}
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
        monthlyMilage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        maxAllowance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })).isRequired
}