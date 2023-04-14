import { ToolbarProps, Navigate, View } from 'react-big-calendar';
import { ActionIcon, Center, Grid, Group, Paper, SegmentedControl, Text } from '@mantine/core';
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

const color = 'blue';

const SelectView = ({ views: viewNames, view, onView, messages }: any) => {
    const data: ISelectItems[] = [
        { label: messages[viewNames[1]], value: viewNames[1] },
        { label: messages[viewNames[0]], value: viewNames[0] },
        { label: messages[viewNames[2]], value: viewNames[2] },
    ];
    return <SegmentedControl data={data} value={view} onChange={(value) => onView(value)} color={color} />;
};

const Toolbar = ({ label, localizer: { messages }, onNavigate, onView, views, view }: ToolbarProps<IEvent>) => {
    return (
        <Paper shadow="sm" p="xs" radius="sm" mb="sm" withBorder>
            <Grid columns={3}>
                <Grid.Col xs={3} sm={1}>
                    <Group position="center">
                        <ActionIcon onClick={() => onNavigate(Navigate.PREVIOUS)} variant="outline" color={color}>
                            <IconChevronLeft size="1.2rem" />
                        </ActionIcon>
                        <ActionIcon onClick={() => onNavigate(Navigate.TODAY)} variant="outline" color={color}>
                            <IconCalendar size="1.2rem" />
                        </ActionIcon>
                        <ActionIcon onClick={() => onNavigate(Navigate.NEXT)} variant="outline" color={color}>
                            <IconChevronRight size="1.2rem" />
                        </ActionIcon>
                    </Group>
                </Grid.Col>
                <Grid.Col xs={3} sm={1}>
                    <Center>
                        <Text fz="md" fw={700}>
                            {label}
                        </Text>
                    </Center>
                </Grid.Col>
                <Grid.Col xs={3} sm={1}>
                    <Center>
                        <SelectView views={views} view={view} onView={onView} messages={messages} />
                    </Center>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Toolbar;
