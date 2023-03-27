import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import getNbLines from "../../tools/getLines";
import { IPassif, IAppointmentData } from "../../interfaces";

interface IProps {
    patient: IAppointmentData,
    handler?: (arg0: any) => void,
    view?: boolean,
    passif?: IPassif
}

const Biodatas = ({ patient, handler, view, passif }: IProps): JSX.Element => {
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        if (handler)
            handler((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Form className="step">
            <Form.Group as={Row} className="mb-1" controlId="formBasicName">
                <Col sm="4">
                    <FloatingLabel className="mb-3" label="Name">
                        <Form.Control defaultValue={patient.name} name="name" onChange={handleChange} readOnly={view} />
                    </FloatingLabel>
                </Col>
                <Col sm="4">
                    <FloatingLabel className="mb-3" label="Last Name">
                        <Form.Control defaultValue={patient.lastName} name="lastName" onChange={handleChange} readOnly={view} />
                    </FloatingLabel>
                </Col>
                <Col sm="4">
                    <FloatingLabel className="mb-3" label='Sex'>
                        {
                            view
                                ? <Form.Control readOnly defaultValue={patient.sex} />
                                : <Form.Select name="sex" onChange={handleChange}>
                                    <option>{patient.sex}</option>
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                </Form.Select>
                        }
                    </FloatingLabel>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1" controlId="formBasicBirthDate">
                <Col sm="4">
                    <FloatingLabel className="mb-3" label="Birth Date">
                        <Form.Control defaultValue={patient.birthDate} name="birthDate" onChange={handleChange} readOnly={view} />
                    </FloatingLabel>
                </Col>
                <Col sm="4">
                    <FloatingLabel className="mb-3" label="Email">
                        <Form.Control defaultValue={patient.email} name="email" onChange={handleChange} readOnly={view} />
                    </FloatingLabel>
                </Col>
                <Col sm="4">
                    <FloatingLabel className="mb-3" label="City">
                        <Form.Control defaultValue={patient.city} name="city" onChange={handleChange} readOnly={view} />
                    </FloatingLabel>
                </Col>
            </Form.Group>
            {
                view && passif &&
                <Form.Group as={Row} className="mb-3" controlId="formBasicMedicalIssues">
                    <Col sm="12">
                        <Form.Label>Previous Medical Issues</Form.Label>
                        <Form.Control readOnly as="textarea" rows={getNbLines(passif.medicalIssues)} defaultValue={passif.medicalIssues} />
                    </Col>
                </Form.Group>
            }
        </Form>
    );
};

export default Biodatas;