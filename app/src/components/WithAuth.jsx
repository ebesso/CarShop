import React from 'react'
import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '../hooks/useApi'

import NavigationBar from './NavigationBar/NavigationBar';
import { Container } from 'react-bootstrap';


const WithAuth = (ProtectedComponent) => (props) => {
    const {loading, isAuthenticated, email} = useIsAuthenticated();

    if(loading){
        return (
            <React.Fragment></React.Fragment>
        )
    }else if(!isAuthenticated){
        return (
            <Navigate to="/login" />
        )
    }else{
        return (
            <React.Fragment>
                <NavigationBar/>
                <Container style={{marginTop: '20px'}}>
                    <ProtectedComponent {...props}/>
                </Container>
            </React.Fragment>
        )
    }
}

export default WithAuth