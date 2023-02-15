import React from 'react'
import { useFormik } from 'formik'

import { ButtonToolbar, Form, InputGroup, Button } from 'react-bootstrap';

import { PlusLg } from 'react-bootstrap-icons';

import * as yup from 'yup';

import './userForm.css'
import { useGetEmployees } from '../../../hooks/useApi';

import {postUser, updateUser} from '../../../services'

const createUserSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdmin: yup.boolean().required(),
    employee: yup.string().notRequired()
});

const editUserSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().notRequired(),
    isAdmin: yup.boolean().required(),
    employee: yup.string().notRequired()
});

export default function UserForm(props){
    
    const {loading, employees} = useGetEmployees();

    const handleSubmit = (data) => {
        if(props.editMode){
            updateUser(props.user._id, data).then((user) => {
                props.onSubmit(user.data)
            }).catch((response) => {
                if(response.response.status === 400) alert('Invalid input')
                else alert('Internal error')
            })
        }
        else{
            postUser(data).then((user) => {
                props.onSubmit(user.data)
            }).catch((response) => {
                if(response.response.status === 400) alert('Invalid input')
                else alert('Internal error')
            })
        }
    }

    const formik = useFormik({

        initialValues: {
            email: props.editMode ? props.user.email : '',
            password: '',
            isAdmin: props.editMode ? props.user.isAdmin : false,
            employee: props.editMode ? (props.user.employee ? props.user.employee._id : '') : undefined
        },
        onSubmit: handleSubmit,
        validationSchema: props.editMode ? editUserSchema : createUserSchema

    });

    return (
        <tr style={{color: 'grey'}} key={111}>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Control className="input-control"
                            placeholder="Email"
                            type="text"
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
            </th>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Select className="input-control"
                            isInvalid={formik.errors.employee && formik.touched.employee}
                            name="employee"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.employee}
                        >
                            <option value={""} key={0}>None</option>
                            {employees.map((employee, i) => <option value={employee._id} key={i + 1}>{employee.name}</option>)}
                        </Form.Select>
                        {formik.errors.employee && formik.touched.employee && 
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        }
                    </InputGroup>
                </Form.Group>
            </th>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Select className="input-control"
                            isInvalid={formik.errors.isAdmin && formik.touched.isAdmin}
                            name="isAdmin"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.isAdmin}
                        >
                            <option value={false} key={1}>No</option>
                            <option value={true} key={2}>Yes</option>

                        </Form.Select>
                        {formik.errors.isAdmin && formik.touched.isAdmin && 
                            <Form.Control.Feedback type="invalid">{formik.errors.isAdmin}</Form.Control.Feedback>
                        }
                    </InputGroup>
                </Form.Group>
            </th>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Control className="input-control"
                            placeholder="password"
                            type="password"
                            isInvalid={formik.errors.password && formik.touched.password}
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password && 
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        }
                    </InputGroup>
                </Form.Group>
            </th>
            <th>
                <PlusLg onClick={formik.handleSubmit} style={{color: 'green', cursor: 'pointer'}}/>
            </th>
            <th></th>

        </tr>
    )

}