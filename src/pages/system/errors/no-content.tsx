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
            <Title order={1} className={style.title} color="dimmed">
                404
            </Title>
            <Text className={style.text} color="dimmed">
                {title} <br />
                Message: `{message}`<br />
                Please create one or refresh the page if you have just created one.
            </Text>
        </div>
    );
};

export default NoContent;
