import React from 'react'

import UsersTable from './components/UsersTable'

import TableTitle from '../../components/TableTitle/TableTitle'

export default function UsersPage(){
    return (
        <React.Fragment>
            <TableTitle title="Users">
                <UsersTable />
            </TableTitle>
        </React.Fragment>
    )
}