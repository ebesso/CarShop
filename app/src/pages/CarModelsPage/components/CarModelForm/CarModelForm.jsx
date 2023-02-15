import React from 'react'
import { useFormik } from 'formik'

import { ButtonToolbar, Form, InputGroup, Button } from 'react-bootstrap';

import { PlusLg } from 'react-bootstrap-icons';

import * as yup from 'yup';

import './carModelForm.css'

import { postCarModel } from '../../../../services';

const carModelSchema = yup.object().shape({
    brand: yup.string().required(),
    model: yup.string().required(),
    price: yup.number().required().min(0),
});

export default function CarModelForm(props){
    
    const handleSubmit = (data) => {
        postCarModel(data).then((newCar) => {
            props.onCarModelAdded(newCar)
            formik.resetForm()
        }).catch(() => alert('Internal error'))
    }

    const formik = useFormik({

        initialValues: {
            brand: '',
            model: '',
            price: ''
        },
        onSubmit: handleSubmit,
        validationSchema: carModelSchema

    });

    return (
        <tr style={{color: 'grey'}}>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Control className="input-control"
                            placeholder="Brand"
                            type="text"
                            isInvalid={formik.errors.brand && formik.touched.brand}
                            name="brand"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.brand}

                        />
                        {formik.errors.brand && formik.touched.brand && 
                            <Form.Control.Feedback type="invalid">{formik.errors.brand}</Form.Control.Feedback>
                        }
                    </InputGroup>

                </Form.Group>
            </th>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Control className="input-control"
                            placeholder="Model"
                            type="text"
                            isInvalid={formik.errors.model && formik.touched.model}
                            name="model"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.model}
                        />
                        {formik.errors.model && formik.touched.model && 
                            <Form.Control.Feedback type="invalid">{formik.errors.model}</Form.Control.Feedback>
                        }
                    </InputGroup>
                </Form.Group>
            </th>
            <th>
                <Form.Group>
                    <InputGroup>
                        <Form.Control className="input-control"
                            placeholder="Price"
                            type="number"
                            isInvalid={formik.errors.price && formik.touched.price}
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                        />
                        {formik.errors.price && formik.touched.price && 
                            <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
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