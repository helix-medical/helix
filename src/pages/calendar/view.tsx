import { Modal, useMantineTheme, Text } from '@mantine/core';
import { IEvent } from '../../interfaces';
import moment from 'moment';
import cnf from '../../config/config';

const ViewEvent = ({ event, opened, handleClose }: { event: IEvent; opened: boolean; handleClose: () => void }) => {
    const theme = useMantineTheme();
    return (
        <Modal.Root opened={opened} onClose={handleClose}>
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fz="xl" fw={700}>
                            {event.title}
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Text>{moment(event.start).format(cnf.formatDateTimePretty)}</Text>
                    <Text>{moment(event.end).format(cnf.formatDateTimePretty)}</Text>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ViewEvent;
