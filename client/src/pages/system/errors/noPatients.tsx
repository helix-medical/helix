import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const NoPatients = (): JSX.Element => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>No Patient Found</Alert.Heading>
                <hr />
                <p>
                    You don't have any patient yet. Please add a patient to start.
                </p>
            </Alert>
        );
    }
    return <></>;
};

export default NoPatients;