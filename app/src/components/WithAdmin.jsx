import React from 'react'
import { useIsAdmin } from '../hooks/useApi'

import { Navigate } from 'react-router-dom';

import NavigationBar from './NavigationBar/NavigationBar';
import { Container } from 'react-bootstrap';


const WithAdmin = (ProtectedComponent) => (props) => {
    const {loading, isAdmin, email} = useIsAdmin();

    if(loading){
        return (
            <React.Fragment></React.Fragment>
        )
    }else if(!isAdmin){
        return (
            <Navigate to="/" />
        )
    }else{
        return (
            <React.Fragment>
                <NavigationBar />
                <Container style={{marginTop: '20px'}}>
                    <ProtectedComponent {...props}/>
                </Container>
            </React.Fragment>
        )
    }
}

export default WithAdmin