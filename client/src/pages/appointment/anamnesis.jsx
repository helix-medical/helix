import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getNbLines from "../../tools/getLines";

function Anamnesis({ appointment, handler, view }) {
    const handleChange = (e) => {
        handler(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const anamnesis = JSON.parse(appointment.anamnesis);

    const nbLines = (text, base) => {
        return view ? getNbLines(text) : base;
    };

    return (
        <div className="debug">
            <h2>Anamnesis</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicReasons">
                    <Form.Label>Reasons for the consultation</Form.Label>
                    <Form.Control as="textarea" rows={nbLines(anamnesis.reasons, 1)} name='reasons' onChange={handleChange} defaultValue={anamnesis.reasons} readOnly={view} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSymptoms">
                    <Form.Label>Symptoms</Form.Label>
                    <Form.Control as="textarea" rows={nbLines(anamnesis.symptoms, 3)} name='symptoms' onChange={handleChange} defaultValue={anamnesis.symptoms} readOnly={view} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDiseases">
                            <Form.Label>Known diseases</Form.Label>
                            <Form.Control as="textarea" rows={nbLines(anamnesis.knownDiseases, 3)} name='knownDiseases' onChange={handleChange} defaultValue={anamnesis.knownDiseases} readOnly={view} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicMedications">
                            <Form.Label>Medications</Form.Label>
                            <Form.Control as="textarea" rows={nbLines(anamnesis.knownMedications, 3)} name='knownMedications' onChange={handleChange} defaultValue={anamnesis.knownMedications} readOnly={view} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Anamnesis;