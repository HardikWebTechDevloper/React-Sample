/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card, CardBody, FormGroup, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import moment from 'moment';

import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postAPI, getAPI } from "../../helpers/authUtils"
import Swal from 'sweetalert2'
import { Loading } from "../../components/common";

const UsersCreate = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    //when form submit
    const handleSubmit = async (event, values) => {
        setLoading(true);
        try {
            //set action
            let action = '/user/register';
            const response = await postAPI(action, values);

            if (response.success || response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    allowOutsideClick: false,
                    timer: 2000
                }).then(function () {
                    history.push("/users");
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
        setLoading(false);
    }

    //when page load get active layout
    useEffect(() => {
        props.activateAuthLayout();
    });

    return (
        <React.Fragment>
            <Container fluid>
                <div className="page-title-box">
                    <Row className="align-items-center">
                        <Col sm="6">
                            <h4 className="page-title">New User</h4>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/users">User</Link></BreadcrumbItem>
                                <BreadcrumbItem active>New</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <AvForm className="form-horizontal m-t-0" onValidSubmit={handleSubmit}>
                                    <Row className="align-items-center">
                                        <Col sm="6">
                                            <AvField name="first_name" label="First Name"
                                                placeholder="First Name" type="text" errorMessage="First name is required"
                                                value={state?.first_name}
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <AvField name="last_name" label="Last Name"
                                                placeholder="Last Name" type="text" errorMessage="Last name is required"
                                                value={state?.last_name}
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <AvField name="email" label="Email"
                                                placeholder="Email" type="email" errorMessage="Email is required"
                                                value={state?.email}
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <AvField
                                                name="phone"
                                                label="Phone"
                                                placeholder="Phone"
                                                errorMessage="Phone is required"
                                                type="text"
                                                value={state?.phone}
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                        <Col sm="6">
                                            <AvField name="password" label="Password"
                                                placeholder="Password" type="password" errorMessage="Password is required"
                                                value={state?.password}
                                                validate={{ required: { value: true } }}
                                                onChange={handleChange}
                                            />
                                        </Col>
                                    </Row>
                                    <FormGroup className="mb-0">
                                        <Button type="submit" color="primary" className="mr-1">{loading ? <Loading type="bubbles" color="#fff" height="24" width="60" /> : ' Submit '} </Button>
                                    </FormGroup>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default withRouter(connect(null, { activateAuthLayout })(UsersCreate));