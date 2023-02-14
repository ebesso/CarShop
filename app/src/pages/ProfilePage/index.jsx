import React from 'react'

import SalesTable from './components/SalesTable'

import { useGetProfile } from '../../hooks/useApi'

import { Card, ListGroup } from 'react-bootstrap'

import { Navigate } from 'react-router-dom'

import TableTitle from '../../components/TableTitle/TableTitle'

export default function ProfilePage(){

    const {loading, profile} = useGetProfile()
    if(loading){
        return (<React.Fragment></React.Fragment>)
    }
    else if(profile){
        return (
            <React.Fragment>
                <Card>
                    <Card.Body>
                        <Card.Title>User</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Email:</strong> {profile.email}</ListGroup.Item>
                            <ListGroup.Item><strong>Name:</strong> {profile.employee.name}</ListGroup.Item>
                            <ListGroup.Item><strong>Id:</strong> {profile.employee._id}</ListGroup.Item>
                        </ListGroup>

                    </Card.Body>
                </Card>
                <TableTitle title="Sales">
                    <SalesTable sales={profile.employee.sales}/>
                </TableTitle>
            </React.Fragment>
        )
    }
    return (<Navigate to="/"/>)


}