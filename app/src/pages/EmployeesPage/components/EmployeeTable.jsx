import React from "react"
import { Table } from "react-bootstrap"

import { useGetEmployees } from "../../../hooks/useApi"

export default function EmployeeTable(){

    const { loading, employees } = useGetEmployees();

    return(
        <Table hover>
            <thead>
            <tr>
                <th>Name</th>
            </tr>
            </thead>
            <tbody style={{color: 'grey'}}>
                {employees.map((employee, i) => 
                    <tr key={i}>
                        <td>{employee.name}</td>
                    </tr>
                )}
            </tbody>
      </Table>
    )
}