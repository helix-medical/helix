import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getNbLines from "../../../tools/getLines";

function Conclusion(props) {
    const conclusion = JSON.parse(props.appointment.conclusion);

    return (
        <div className="debug">
            <h2>Conclusion</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicDiagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control as="textarea" rows={getNbLines(conclusion.diagnosis)} readOnly defaultValue={conclusion.diagnosis} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTreatment">
                    <Form.Label>Treatment</Form.Label>
                    <Form.Control as="textarea" rows={getNbLines(conclusion.treatment)} readOnly defaultValue={conclusion.treatment} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicObservations">
                            <Form.Label>Observations</Form.Label>
                            <Form.Control as="textarea" rows={getNbLines(conclusion.observations)} readOnly defaultValue={conclusion.observations} />
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

export default Conclusion;