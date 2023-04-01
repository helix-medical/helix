import React from 'react';
import { Alert } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons-react';

const WrongAuth = () => {
    return (
        <Alert title="Error in authentication" icon={<IconAlertOctagon size="1.5rem" />} color="red" my="xl">
            Please check your account and password. <br />
            If needed, contact the administrator.
        </Alert>
    );
};

export default WrongAuth;
