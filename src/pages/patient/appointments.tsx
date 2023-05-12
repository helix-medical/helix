import React from 'react';
import { IAppointment, IContent } from './types';
import { Paper, Accordion, Group, Text, Title, Textarea, ThemeIcon, Tooltip } from '@mantine/core';
import moment from 'moment';
import nbLines from '../../helpers/get-lines';
import { IconBabyCarriage, IconClipboardHeart, IconHexagonNumber1, IconMoodKid, IconSos } from '@tabler/icons-react';

const params = (content: string) => ({
    readOnly: true,
    minRows: nbLines(content),
    defaultValue: content,
});

const KindIcon = ({ kind }: { kind: string }) => {
    let Icon = IconClipboardHeart;
    let color = 'indigo';
    switch (kind) {
        case 'first-visit':
            Icon = IconHexagonNumber1;
            color = 'green';
            break;
        case 'emergency':
            Icon = IconSos;
            color = 'red';
            break;
        case 'maternity':
            Icon = IconBabyCarriage;
            color = 'cyan';
            break;
        case 'pediatrics':
            Icon = IconMoodKid;
            color = 'yellow';
            break;
    }
    return (
        <Tooltip label={kind} position="left" withArrow color={color}>
            <ThemeIcon color={color} variant="light" size="lg" radius="md">
                <Icon size="1.5rem" />
            </ThemeIcon>
        </Tooltip>
    );
};

const Item = ({ data }: { data: IAppointment }) => {
    const content: IContent = JSON.parse(data.content);
    return (
        <Accordion.Item value={data.appID}>
            <Accordion.Control disabled={data.status !== 'finished'} icon={<KindIcon kind={data.kind} />}>
                <Group position="apart">
                    <Text>{moment(data.start).format('dddd DD MMMM YYYY - HH:mm')}</Text>
                    <Group position="right">
                        {data.practitionerName} {data.practitionerLastName}
                    </Group>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <Textarea label="Reasons for the consultation" {...params(content.reasons)} />
                <Textarea label="Symptoms" {...params(content.symptoms)} />
                <Textarea label="Antécédents sur la zone" {...params(content.knownDiseases)} />
                <Textarea label="Diagnosis" {...params(content.diagnosis)} />
                <Textarea label="Treatment" {...params(content.treatment)} />
                <Textarea label="Conseils" {...params(content.observations)} />
            </Accordion.Panel>
        </Accordion.Item>
    );
};

const PatientAppointments = ({ data }: { data: IAppointment[] }) => (
    <Paper shadow="md" p="md" radius="md" withBorder>
        <Title order={3} mb="md">
            Appointments
        </Title>
        <Accordion variant="separated">
            {data.map((appointment) => (
                <Item key={appointment.appID} data={appointment} />
            ))}
        </Accordion>
    </Paper>
);

export { PatientAppointments };
