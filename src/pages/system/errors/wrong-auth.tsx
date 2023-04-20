import React from 'react';
import { Alert, Code } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons-react';

const WrongAuth = ({ show, message }: { show: boolean; message: string }): JSX.Element => {
    return (
        <>
            {show ? (
                <Alert title="Error in authentication" icon={<IconAlertOctagon size="1.5rem" />} color="red" my="xl">
                    Please check your account and password. <br />
                    If needed, contact the administrator. <br />
                    Message: <Code>{message}</Code>
                </Alert>
            ) : null}
        </>
    );
};

export default WrongAuth;
