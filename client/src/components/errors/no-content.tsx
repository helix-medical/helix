import { Text, Title } from '@mantine/core';
import style from '../../styles/errors.module.css';

interface IProps {
  message: string;
  title: string;
}

const NoContent = ({ message, title }: IProps): JSX.Element => {
  return (
    <div className={style.notFound}>
      <Title order={1} className={style.title} c="dimmed">
        404
      </Title>
      <Text className={style.text} c="dimmed">
        {title} <br />
        Message: `{message}`<br />
        Please create one or refresh the page if you have just created one.
      </Text>
    </div>
  );
};

export default NoContent;
