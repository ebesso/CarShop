import React from "react"
import { Table } from "react-bootstrap"

export default function UserSalesTable(props){


    return(
        <Table hover>
            <thead>
                <tr>
                    <th>Car Model</th>
                    <th>Car Brand</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody style={{color: 'grey'}}>
                {props.sales.map((sale, i) => 
                    <tr key={i}>
                        <td>{sale.car.model}</td>
                        <td>{sale.car.brand}</td>
                        <td>{sale.car.price}</td>
                    </tr>
                )}
            </tbody>
      </Table>
    )
}