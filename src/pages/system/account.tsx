import React, { useState } from 'react';
import { Button, Title } from '@mantine/core';
import ChangePassword from '../../components/changePassword';

const Account = () => {
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

    return (
        <div>
            <Title order={2}>## Account</Title>
            <div className="account">
                <p>Account Not Implemented</p>
            </div>
            <Button onClick={toggleModal}>Change Password</Button>
            <ChangePassword show={show} toggleModal={toggleModal} />
        </div>
    );
};

export default Account;
