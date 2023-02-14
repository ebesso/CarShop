import React from "react"
import { Table } from "react-bootstrap"

import { useGetTotalSales } from "../../../hooks/useApi"

export default function SalesTable(){

    const { loading, employees } = useGetTotalSales();

    return(
        <Table hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Sales</th>
            </tr>
            </thead>
            <tbody style={{color: 'grey'}}>
                {employees.map((employee, i) => 
                    <tr key={i}>
                        <td>{employee.name}</td>
                        <td>{employee.sales}</td>
                    </tr>
                )}
            </tbody>
      </Table>
    )
}