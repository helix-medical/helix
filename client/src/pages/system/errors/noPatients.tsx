import React, { useState } from "react";
import { Alert, Code } from "@mantine/core";

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
            <Alert color="red" onClose={() => setShow(false)} title={error.sql} withCloseButton>
                <p>
                    <strong>{error.sqlState}</strong> <br />
                    {error.code} ({error.errno}) : <Code>{error.sqlMessage}</Code>
                </p>
            </Alert>
        );
    }
    return <></>;
};

export default NoPatients;