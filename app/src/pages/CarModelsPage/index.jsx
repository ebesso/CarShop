import React from 'react'

import TableTitle from '../../components/TableTitle/TableTitle'
import CarModelsTable from './components/CarModelsTable/CarModelsTable'

export default function CarModelsPage(){
    return (
        <React.Fragment>
            <TableTitle title="Car Models">
                <CarModelsTable />
            </TableTitle>
        </React.Fragment>
    )
}