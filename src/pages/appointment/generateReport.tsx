import React from 'react';
import { IAppointmentDataView } from '../../interfaces';
import { Button, Group, LoadingOverlay, Modal, Title, useMantineTheme } from '@mantine/core';
import { PDFViewer, StyleSheet, pdf } from '@react-pdf/renderer';
import AppointmentPDF from '../../components/pdf/appointment';
import saveAs from 'file-saver';
import moment from 'moment';
import setNotification from '../system/errors/feedbackNotif';

const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: 800,
    },
});

const GenerateReport = ({ open, handler, data }: { open: boolean; handler: any; data: IAppointmentDataView }) => {
    const theme = useMantineTheme();
    const handleDownload = () => {
        pdf(<AppointmentPDF data={data} />)
            .toBlob()
            .then((blob) => saveAs(blob, `${moment(data.date).format('YYYYMMDD')}-facture-${data.appID}.pdf`));
        setNotification(false, 'Facture téléchargée');
    };

    return (
        <Modal.Root opened={open} onClose={handler} size="xl">
            <Modal.Overlay
                color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                opacity={0.55}
                blur={3}
            />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Group position="apart">
                            <Title order={4}>Appointment {data.appID}</Title>
                            <Button variant="light" color="fr-orange.4" onClick={handleDownload}>
                                Télécharger
                            </Button>
                        </Group>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    {data ? (
                        <PDFViewer style={styles.viewer}>
                            <AppointmentPDF data={data} />
                        </PDFViewer>
                    ) : (
                        <LoadingOverlay visible />
                    )}
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default GenerateReport;
