import React from 'react';
import style from '../../../styles/errors.module.css';
import { Title, Text } from '@mantine/core';

const Unauthorized = (): JSX.Element => {
    return (
        <div className={style.notFound}>
            <Title order={1} className={style.title}>
                401
            </Title>
            <Text className={style.text}>
                You are not authorized to access this page. <br />
                Please contact the administrator.
            </Text>
        </div>
    );
};

export default Unauthorized;
