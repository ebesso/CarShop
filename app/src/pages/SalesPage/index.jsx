import React from 'react'

import TableTitle from '../../components/TableTitle/TableTitle'
import SalesTable from './SalesTable/SalesTable'

export default function SalesPage(){
    return (
        <React.Fragment>
            <TableTitle title="Sales">
                <SalesTable />
            </TableTitle>
        </React.Fragment>
    )
}