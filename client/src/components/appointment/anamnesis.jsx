import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Anamnesis(props) {
    const handleChange = (e) => {
        props.handler(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const anamnesis = JSON.parse(props.appointment.anamnesis);

    return (
        <div className="debug">
            <h2>Anamnesis</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicReasons">
                    <Form.Label>Reasons for the consultation</Form.Label>
                    <Form.Control as="textarea" rows={1} name='reasons' onChange={handleChange} defaultValue={anamnesis.reasons} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSymptoms">
                    <Form.Label>Symptoms</Form.Label>
                    <Form.Control as="textarea" rows={3} name='symptoms' onChange={handleChange} defaultValue={anamnesis.symptoms} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDiseases">
                            <Form.Label>Known diseases</Form.Label>
                            <Form.Control as="textarea" rows={3} name='knownDiseases' onChange={handleChange} defaultValue={anamnesis.knownDiseases} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicMedications">
                            <Form.Label>Medications</Form.Label>
                            <Form.Control as="textarea" rows={3} name='knownMedications' onChange={handleChange} defaultValue={anamnesis.knownMedications} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Anamnesis;