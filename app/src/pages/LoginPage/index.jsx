import React, {useState } from 'react'

import { Form, Card, Button, InputGroup, Row, Col, Container, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'

import {Navigate} from 'react-router-dom'

import { login } from '../../services'

import * as yup from 'yup'

import './index.css'

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export default function LoginPage(){

    const [successfulLogin, setSuccessfulLogin] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false)

    const handleSubmit = (data) => {
        const {email, password} = data
        login(email, password).then((response) => {
            if(response.status === 200){
                setSuccessfulLogin(true)
            }else{
                setInvalidLogin(true)
            }
        }).catch(() => {
            setInvalidLogin(true)
        })
    }

    const handleForgotPassword = () => {

    }

    const formik = useFormik({

        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: handleSubmit,
        validationSchema: loginSchema

    });
    if(successfulLogin){
        return (<Navigate to="/" />)
    }
    return (
        <Container>
            <Row className="row">
                <Col md={6}>
                    <Card className="card">
                        <Card.Body>
                            <Card.Title className="title">Login</Card.Title>
                            {invalidLogin &&
                                <Alert variant="danger">Invalid Email or Password</Alert>
                            }
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="form-group">
                                            <InputGroup>
                                                <Form.Control
                                                    className="form-input"
                                                    placeholder="Email"
                                                    type="string"
                                                    isInvalid={formik.errors.email && formik.touched.email}
                                                    name="email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.price}
                                                />
                                                {formik.errors.email && formik.touched.email && 
                                                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                                                }
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <InputGroup>
                                                <Form.Control
                                                    className="form-input"
                                                    placeholder="Password"
                                                    type="password"
                                                    isInvalid={formik.errors.password && formik.touched.password}
                                                    name="password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.price}
                                                />
                                                {formik.errors.password && formik.touched.password && 
                                                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                                }
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
    
                                <Row>
                                    <Col>
                                        <Button variant="outline-success" className="login-button" onClick={formik.handleSubmit}>Login</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="forgot-password" onClick={handleForgotPassword}>Forgot Password</p>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}