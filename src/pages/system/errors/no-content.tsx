import React from 'react';
import { Title, Text } from '@mantine/core';
import style from '../../../styles/errors.module.css';

interface IProps {
    message: string;
    title: string;
}

const NoContent = ({ message, title }: IProps): JSX.Element => {
    return (
        <div className={style.notFound}>
            <Title order={1} className={style.title}>
                404
            </Title>
            <Text className={style.text}>
                {title} <br />
                Message: `{message}`
            </Text>
        </div>
    );
};

export default NoContent;
