import React from "react";
import { useState, useRef } from "react";
import axios from "axios";

import {
    Button,
    Modal,
    Select,
    ActionIcon,
    NumberInput,
    Group,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

interface IProps {
    show: boolean;
    toggleModal: () => void;
}

function ModalCreateApp({ show, toggleModal }: IProps): JSX.Element {
    const handleClose = () => toggleModal();
    const ref = useRef<HTMLInputElement>();

    const [data, setData] = useState({
        patientId: 0,
        date: "",
        time: "",
        reasons: "",
        anamnesis: {
            reasons: "",
            symptoms: "",
            knownDiseases: "",
            knownMedications: "",
        },
        conclusion: {
            diagnosis: "",
            treatment: "",
            observations: "",
        },
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e: { preventDefault: () => void }) => {
        let index;
        const finalData = {
            patientId: data.patientId,
            date: data.date + " " + data.time,
            reasons: data.reasons,
            anamnesis: JSON.stringify(data.anamnesis),
            conclusion: JSON.stringify(data.conclusion),
        };
        console.log(finalData);
        e.preventDefault();
        try {
            index = await axios.post(`/api/appointments/new`, finalData);
            await axios.put(`/api/patients/${data.patientId}/add_appointment`, {
                id: index.data,
            });
        } catch (error) {
            console.log(error);
        }
        toggleModal();
        if (index) window.location.href = `/appointments/${index.data}/edit`;
    };

    return (
        <Modal opened={show} onClose={handleClose} title="Create Appointment">
            {/* <FloatingLabel className='mb-3' controlId="floatingDate" label="Date"> */}
            <DateInput
                label="Date"
                placeholder="Date"
                /*onChange={handleChange}*/ name="date"
                withAsterisk
            />
            {/* </FloatingLabel> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingTime" label="Time"> */}
            {ref && (
                <TimeInput
                    label="Time"
                    placeholder="Time"
                    onChange={handleChange}
                    name="time"
                    withAsterisk
                    ref={ref}
                    rightSection={
                        <ActionIcon onClick={() => ref.current.showPicker()}>
                            <IconClock size="1rem" stroke={1.5} />
                        </ActionIcon>
                    }
                />
            )}
            {/* </FloatingLabel> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingPatientId" label="Patient ID"> */}
            <NumberInput
                label="Patient ID"
                placeholder="Patient ID"
                /*onChange={handleChange}*/ name="patientId"
                withAsterisk
            />
            {/* </FloatingLabel> */}
            {/* <FloatingLabel className='mb-3' controlId="floatingKind" label="Kind"> */}
            {/* <Form.Select onChange={handleChange} name="reasons"> */}
            {/* <option>Choose Option</option> */}
            {/* <option value="first-visit">First Visit</option> */}
            {/* <option value="follow-up">Follow Up</option> */}
            {/* <option value="pediatrics">Pediatrics</option> */}
            {/* <option value="maternity">Maternity</option> */}
            {/* <option value="emergency">Emergency</option> */}
            {/* </Form.Select> */}
            <Select
                label="Kind"
                placeholder="Kind"
                /*onChange={handleChange}*/ name="reasons"
                withAsterisk
                data={[
                    "first-visit",
                    "follow-up",
                    "pediatrics",
                    "maternity",
                    "emergency",
                ]}
            />

            {/* <Modal.Footer> */}
            <Group position="right">
                <Button variant="light" color="red" onClick={handleClose}>
                    Cancel
                </Button>
                <Button color="green" onClick={handleClick}>
                    Submit
                </Button>
            </Group>
            {/* </Modal.Footer> */}
        </Modal>
    );
}

export default ModalCreateApp;
