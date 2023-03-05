import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function ModalCreateApp(props) {
    const handleClose = () => props.toggleModal();

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FloatingLabel className='mb-3' controlId="floatingDate" label="Date">
                        <Form.Control type="date" placeholder="Date" />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingTime" label="Time">
                        <Form.Control type="time" placeholder="Time" />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingReasons" label="Reasons">
                        <Form.Control type="text" placeholder="Reasons" />
                    </FloatingLabel>
                    <FloatingLabel className='mb-3' controlId="floatingPatientId" label="Patient ID">
                        <Form.Control type="number" placeholder="Patient ID" />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant='primary'>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCreateApp;