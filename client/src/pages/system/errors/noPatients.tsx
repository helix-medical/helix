import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

interface IProps {
    error: {
        code: string;
        errno: number;
        sqlMessage: string;
        sqlState: string;
        index: number;
        sql: string;
    };
}

const NoPatients = ({ error }: IProps): JSX.Element => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{ error.sql}</Alert.Heading>
                <hr />
                <p>
                    <strong>{ error.sqlState }</strong> <br />
                    { error.code } ({ error.errno }) : <code>{ error.sqlMessage }</code>
                </p>
            </Alert>
        );
    }
    return <></>;
};

export default NoPatients;