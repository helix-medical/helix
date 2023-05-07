import React from 'react';
import { Paper, Accordion, Group, Text, Title, Textarea, TextInput } from '@mantine/core';
import { IAppointment } from './types';
import getNbLines from '../../helpers/get-lines';
import KindAppointment from '../../components/customBadges/kind-appointment';
import moment from 'moment';
import StateAppointment from '../../components/customBadges/state-appointment';

const Item = ({ data }: { data: IAppointment }) => {
    const content = JSON.parse(data.content);
    return (
        <Accordion.Item value={data.appID}>
            <Accordion.Control>
                <Group position="apart">
                    <Text>{moment(data.start).format('dddd DD MMMM YYYY - HH:mm')}</Text>
                    <Group position="right">
                        <StateAppointment state={data.status} />
                        <KindAppointment kind={data.kind} />
                    </Group>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                {data.status === 'finished' ? (
                    <>
                        <Textarea
                            label="Reasons for the consultation"
                            maxRows={getNbLines(content.reasons, 1)}
                            minRows={getNbLines(content.reasons, 1)}
                            defaultValue={content.reasons}
                            readOnly
                        />
                        <Textarea
                            label="Symptoms"
                            maxRows={getNbLines(content.symptoms, 3)}
                            minRows={getNbLines(content.symptoms, 1)}
                            defaultValue={content.symptoms}
                            readOnly
                        />

                        <Textarea
                            label="Antécédents sur la zone"
                            maxRows={getNbLines(content.knownDiseases, 3)}
                            minRows={getNbLines(content.knownDiseases, 1)}
                            defaultValue={content.knownDiseases}
                            readOnly
                        />
                        <TextInput label="Diagnosis" defaultValue={content.diagnosis} readOnly />
                        <Textarea
                            label="Treatment"
                            maxRows={getNbLines(content.treatment, 3)}
                            minRows={getNbLines(content.treatment, 1)}
                            defaultValue={content.treatment}
                            readOnly
                        />
                        <Textarea
                            label="Conseils"
                            maxRows={getNbLines(content.observations, 3)}
                            minRows={getNbLines(content.observations, 1)}
                            defaultValue={content.observations}
                        />
                    </>
                ) : (
                    <Text>Appointment not finished yet</Text>
                )}
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
