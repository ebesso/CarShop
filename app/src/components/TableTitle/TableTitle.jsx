import React from "react"

import { Card } from "react-bootstrap"

import './tableTitle.css'

export default function TableTitle(props){
    return (
        <Card className="card-container">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                {props.children}
            </Card.Body>
            

        </Card>
    )
}