import React, { Component } from 'react';
import { Row,Col } from 'reactstrap';

class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                <footer className="footer">
                    <div className="container-fluid">
                        <Row>
                            <Col>
                                {new Date().getFullYear()} © LoveLLO <span className="d-none"><a href="https://omelab.github.io/" target="_blank" className="d-none" rel="noopener noreferrer" >omelab</a></span>
                            </Col>
                        </Row>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default Footer;






