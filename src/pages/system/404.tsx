import style from './404.module.css';
import { Title, Text } from '@mantine/core';

const NotFound = () => {
    return (
        <div className={style.notFound}>
            <Title order={1} className={style.title}>
                404
            </Title>
            <Text className={style.text}>
                Page not found
                <br />
                Please verify the URL, or go to Home.
            </Text>
        </div>
    );
};

export default NotFound;
