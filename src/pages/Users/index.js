/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Container, Row, Col, Card, CardHeader, CardBody, Breadcrumb, Button, BreadcrumbItem,
} from 'reactstrap';
import { activateAuthLayout } from '../../store/actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import Swal from 'sweetalert2'
import { postAPI } from "../../helpers/authUtils";

const UsersList = (props) => {
    const [dataState, setDataState] = useState();

    const fetchData = async () => {
        try {
            let response = await postAPI('user/get/all');
            let resp = dataFilter(response.data);
            if (resp) setDataState(resp);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err,
            })
        }
    };

    const dataFilter = data => {
        if (!data) return;
        let rows = [];
        for (const [i, item] of data.entries()) {
            let celItem = {
                serial_no: i + 1,
                userName: <>
                    {item.first_name + ' ' + item.last_name}
                </>,
                email: item.email,
                status: (item.is_active) ? 'Active' : 'In-Active',
            }
            rows.push(celItem);
        }
        return rows;
    }

    useEffect(() => {
        props.activateAuthLayout();
        fetchData();
    }, [])

    const data = {
        columns: [
            {
                label: 'Sno.',
                field: 'serial_no',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Name',
                field: 'userName',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Email',
                field: 'email',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 150
            }
        ],
        rows: dataState
    };

    return (
        <React.Fragment>
            <Container fluid>
                <div className="page-title-box">
                    <Row className="align-items-center">
                        <Col sm="6">
                            <h4 className="page-title">Users</h4>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="#">Users</Link></BreadcrumbItem>
                                <BreadcrumbItem active>All Users</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                        <Col sm="6" style={{ textAlign: 'right' }}>
                            <Link to="/users/new">
                                <Button color="primary">Add User</Button>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <h4 className="mt-0 mb-0 header-title">Users List</h4>
                            </CardHeader>
                            <CardBody>
                                <MDBDataTable
                                    responsive
                                    striped
                                    bordered
                                    fixed={false}
                                    exportToCSV={true}
                                    // scrollY
                                    entriesOptions={[10, 20, 30]}
                                    searching={true}
                                    entries={10}
                                    data={data}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default withRouter(connect(null, { activateAuthLayout })(UsersList)); 