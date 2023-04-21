import React from 'react';
import { ToolbarProps, Navigate, View } from 'react-big-calendar';
import { ActionIcon, Card, Center, Grid, Group, SegmentedControl, Text } from '@mantine/core';
import { IconCalendar, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface IEvent {
    start: Date;
    end: Date;
    title: string;
    id: string;
}

interface ISelectItems {
    label: string;
    value: View;
}

const color = 'fr-cyan';

const SelectView = ({ views: viewNames, view, onView, messages }: any) => {
    const data: ISelectItems[] = [
        { label: messages[viewNames[1]], value: viewNames[1] },
        { label: messages[viewNames[0]], value: viewNames[0] },
        { label: messages[viewNames[2]], value: viewNames[2] },
    ];
    return (
        <SegmentedControl
            data={data}
            value={view}
            onChange={(value) => onView(value)}
            color={`${color}.5`}
            radius="xl"
        />
    );
};

const Toolbar = ({ label, localizer: { messages }, onNavigate, onView, views, view }: ToolbarProps<IEvent>) => {
    return (
        <Card shadow="sm" pt="xs" radius="sm" mb="sm" withBorder>
            <Grid columns={3}>
                <Grid.Col xs={3} sm={1}>
                    <Group position="left" mt="xs">
                        <ActionIcon size="lg" onClick={() => onNavigate(Navigate.PREVIOUS)} color={color}>
                            <IconChevronLeft size="1.5rem" />
                        </ActionIcon>
                        <ActionIcon size="lg" onClick={() => onNavigate(Navigate.TODAY)} color={color}>
                            <IconCalendar size="1.5rem" />
                        </ActionIcon>
                        <ActionIcon size="lg" onClick={() => onNavigate(Navigate.NEXT)} color={color}>
                            <IconChevronRight size="1.5rem" />
                        </ActionIcon>
                    </Group>
                </Grid.Col>
                <Grid.Col xs={3} sm={1}>
                    <Center>
                        <Text fz="lg" fw={700} mt="xs">
                            {label}
                        </Text>
                    </Center>
                </Grid.Col>
                <Grid.Col xs={3} sm={1}>
                    <Group position="right" mt="xs">
                        <SelectView views={views} view={view} onView={onView} messages={messages} />
                    </Group>
                </Grid.Col>
            </Grid>
        </Card>
    );
};

export default Toolbar;
