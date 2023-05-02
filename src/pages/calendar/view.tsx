import React from 'react';
import { Drawer, useMantineTheme, Text } from '@mantine/core';
import { IEvent } from '../../types/interfaces';
import moment from 'moment';
import cnf from '../../config/config';

const ViewEvent = ({ event, opened, handleClose }: { event: IEvent; opened: boolean; handleClose: () => void }) => {
    const theme = useMantineTheme();
    return (
        <Drawer.Root opened={opened} onClose={handleClose} position="right">
            <Drawer.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>
                        <Text fz="xl" fw={700}>
                            {event.title}
                        </Text>
                    </Drawer.Title>
                    <Drawer.CloseButton />
                </Drawer.Header>
                <Drawer.Body>
                    <Text>{moment(event.start).format(cnf.formatDateTimePretty)}</Text>
                    <Text>{moment(event.end).format(cnf.formatDateTimePretty)}</Text>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    );
};

export default ViewEvent;
