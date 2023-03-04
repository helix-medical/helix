import React from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";

function Anamnesis(props) {
    return (
        <div className="anamnesis">
            <h2>Anamnesis</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicReasons">
                    <Form.Label>Reasons for the consultation</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSymptoms">
                    <Form.Label>Symptoms</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDiseases">
                            <Form.Label>Known diseases</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicMedications">
                            <Form.Label>Medications</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Anamnesis;