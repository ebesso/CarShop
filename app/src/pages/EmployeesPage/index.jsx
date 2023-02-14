import React from 'react'

import EmployeeTable from './components/EmployeeTable'
import TableTitle from '../../components/TableTitle/TableTitle'

export default function EmployeesPage(){
    return (
        <React.Fragment>
            <TableTitle title="Employees">
                <EmployeeTable />
            </TableTitle>
        </React.Fragment>
    )
}