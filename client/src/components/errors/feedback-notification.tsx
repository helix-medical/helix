import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const setNotification = (fail: boolean, message: string) => {
  notifications.show({
    title: fail ? 'Error' : 'Success',
    position: 'bottom-right',
    message: message ?? 'Something went wrong',
    color: fail ? 'red' : 'green',
    icon: fail ? <IconX size="1.1rem" /> : <IconCheck size="1.1rem" />,
    autoClose: 5000,
  });
};

export default setNotification;
