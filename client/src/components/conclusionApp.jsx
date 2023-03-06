import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ConclusionApp(props) {
    const handleChange = (e) => {
        props.handler(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="debug">
            <h2>Conclusion</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicDiagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control as="textarea" rows={1} name='diagnosis' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTreatment">
                    <Form.Label>Treatment</Form.Label>
                    <Form.Control as="textarea" rows={3} name='treatment' onChange={handleChange} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicObservations">
                            <Form.Label>Observations</Form.Label>
                            <Form.Control as="textarea" rows={3} name='observations' onChange={handleChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNeedApp">
                            <Form.Label>Need appointment</Form.Label>
                            <Form.Check type="checkbox" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNextApp">
                            <Form.Label>Next appointment</Form.Label>
                            <Form.Control as="textarea" rows={1} placeholder='NOT WORKING' />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ConclusionApp;