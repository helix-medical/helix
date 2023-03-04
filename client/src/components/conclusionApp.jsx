import React from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";

function ConclusionApp(props) {
    return (
        <div className="conclusionApp">
            <h2>Conclusion</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicDiagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTreatment">
                    <Form.Label>Treatment</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicObservations">
                            <Form.Label>Observations</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicNeedApp">
                            <Form.Label>Need appointment</Form.Label>
                            <Form.Check type="checkbox" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicNextApp">
                            <Form.Label>Next appointment</Form.Label>
                            <Form.Control as="textarea" rows={1} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    )

}

export default ConclusionApp;