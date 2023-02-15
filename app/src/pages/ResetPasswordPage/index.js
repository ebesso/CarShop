import React, {useState } from 'react'

import { Form, Card, Button, InputGroup, Row, Col, Container, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import { resetPassword } from '../../services'

import * as yup from 'yup'

import './index.css'

const resetSchema = yup.object().shape({
    email: yup.string().email().required(),
});

export default function ResetPasswordPage(){

    const [error, setError] = useState(null)
    const [successfulReset, setSuccessfulReset] = useState(false);

    const handleSubmit = (data) => {
        resetPassword(data).then((response) => {
            setSuccessfulReset(true)
        }).catch((response) => {
            const status = response.response.status
            if(status === 404) setError('Could not find user')
            else setError('Internal error')
        })
    }

    const formik = useFormik({

        initialValues: {
            email: ''
        },

        onSubmit: handleSubmit,
        validationSchema: resetSchema

    });

    return (
        <Container>
            <Row className="row">
                <Col md={6}>
                    <Card className="card">
                        <Card.Body>
                            <Card.Title className="title">Reset Password</Card.Title>
                            {error &&
                                <Alert variant="danger">{error}</Alert>
                            }
                            {successfulReset &&
                                <Alert variant="success">New Password Sent</Alert>
                            }
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="form-group">
                                            <InputGroup>
                                                <Form.Control
                                                    className="form-input"
                                                    placeholder="New Password"
                                                    type="string"
                                                    isInvalid={formik.errors.email && formik.touched.email}
                                                    name="email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
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
                                        <Button variant="outline-success" className="reset-button" onClick={formik.handleSubmit}>Reset Password</Button>
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