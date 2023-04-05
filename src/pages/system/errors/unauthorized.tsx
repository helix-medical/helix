import React from 'react';
import { Alert, Title } from '@mantine/core';

const Unauthorized = (): JSX.Element => {
    return (
        <>
            <Title order={1}>Unauthorized</Title>
            <Alert title="Error in authentication" color="red" my="xl">
                You are not authorized to access this page. <br />
                Please contact the administrator.
            </Alert>
        </>
    );
};

export default Unauthorized;
