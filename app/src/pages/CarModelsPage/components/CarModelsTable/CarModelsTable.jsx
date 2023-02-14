import React, { useState } from "react"
import { Button, Table, Card } from "react-bootstrap"

import { useGetCarModels } from "../../../../hooks/useApi"

import { TrashFill, PencilFill } from 'react-bootstrap-icons'

import CarModelForm from "../CarModelForm/CarModelForm"

import './carModelsTable.css'

import { deleteCarModel } from "../../../../services"

export default function CarModelsTable(){

    const { loading, carModels, setCarModels } = useGetCarModels();
    const [showForm, setShowForm] = useState(false);

    const handleNewCarAdded = (newCar) => {
        setCarModels([...carModels, newCar.data])
        setShowForm(false)
    }   

    const handleDelete = (id) => {
        deleteCarModel(id).then(() => {
            const updated = carModels.filter((model) => model._id !== id)
            setCarModels([...updated])
        })
    } 

    return(
        <Table hover className="bg-white">
            <thead>
            <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Action</th>
                <th><Button variant="outline-success" size="sm" style={{float: 'right'}} onClick={() => setShowForm(true)}>Add</Button></th>
            </tr>
            </thead>
            <tbody>
                {carModels.map((carModel, i) => 
                    <tr style={{color: 'grey'}} key={i}>
                        <td>{carModel.brand}</td>
                        <td>{carModel.model}</td>
                        <td>{carModel.price}</td>
                        <td style={{color: 'red'}}>
                            <TrashFill className="action-icon" onClick={() => handleDelete(carModel._id)}/>
                        </td>
                        <td></td>
                    </tr>   
                )}
                {showForm && 
                    <CarModelForm onCarModelAdded={handleNewCarAdded}/>
                }
            </tbody>
        </Table>
    )
}