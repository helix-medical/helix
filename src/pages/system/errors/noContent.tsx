import { Title, Text } from '@mantine/core';
import style from '../../../styles/404.module.css';

interface IProps {
    message: string;
    title: string;
}

const NoContent = ({ message, title }: IProps): JSX.Element => {
    return (
        <div className={style.notFound}>
            <Title order={1} className={style.title}>
                400
            </Title>
            <Text className={style.text}>
                {title} <br />
                Message: `{message}`
            </Text>
        </div>
    );

    // if (show) {
    //     return (
    //         <Alert color="red" onClose={() => setShow(false)} title={title} withCloseButton>
    //             <Code>{message}</Code> <br />
    //             Please contact your administrator.
    //         </Alert>
    //     );
    // }
    // return <></>;
};

export default NoContent;
