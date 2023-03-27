import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import getNbLines from "../../tools/getLines";
import { IAppointmentData } from "../../interfaces";

interface IProps {
    appointment: IAppointmentData,
    handler?: (arg0: any) => void,
    view?: boolean
}

function Conclusion({ appointment, handler, view }: IProps): JSX.Element {
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        if (handler)
            handler((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const conclusion = JSON.parse(appointment.conclusion);

    const nbLines = (text: string, base: number) => {
        return view ? getNbLines(text) : base;
    };

    return (
        <div className="debug">
            <h2>Conclusion</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicDiagnosis">
                    <Form.Label>Diagnosis</Form.Label>
                    <Form.Control as="textarea" rows={nbLines(conclusion.diagnosis, 1)} name='diagnosis' onChange={handleChange} defaultValue={conclusion.diagnosis} readOnly={view} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTreatment">
                    <Form.Label>Treatment</Form.Label>
                    <Form.Control as="textarea" rows={nbLines(conclusion.treatment, 3)} name='treatment' onChange={handleChange} defaultValue={conclusion.treatment} readOnly={view} />
                </Form.Group>
                <Row>
                    <Col sm="6">
                        <Form.Group className="mb-3" controlId="formBasicObservations">
                            <Form.Label>Observations</Form.Label>
                            <Form.Control as="textarea" rows={nbLines(conclusion.observations, 3)} name='observations' onChange={handleChange} defaultValue={conclusion.observations} readOnly={view} />
                        </Form.Group>
                    </Col>
                    <Col sm="2">
                        <Form.Group className="mb-3" controlId="formBasicNeedApp">
                            <Form.Label>Need appointment</Form.Label>
                            <Form.Check type="checkbox" readOnly={view} disabled />
                        </Form.Group>
                    </Col>
                    <Col sm="3">
                        <Form.Group className="mb-3" controlId="formBasicNextApp">
                            <Form.Label>Next appointment</Form.Label>
                            <Form.Control as="textarea" rows={1} placeholder='NOT WORKING' readOnly={view} disabled />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Conclusion;