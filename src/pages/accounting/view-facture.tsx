import React, { useEffect, useState } from 'react';
import { PDFViewer, StyleSheet, pdf } from '@react-pdf/renderer';
import setNotification from '../../components/errors/feedback-notification';
import { Button, Group, LoadingOverlay, Modal, Title, useMantineTheme } from '@mantine/core';
import Facture from '../../components/pdf/facture';
import { saveAs } from 'file-saver';
import moment from 'moment';
import useSecureAPI from '../../hooks/use-secure-api';

const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: 720,
    },
});

const ViewFacture = ({ open, handler, id }: { open: boolean; handler: any; id: string }) => {
    const api = useSecureAPI();
    const [data, setData] = useState<any>();
    const theme = useMantineTheme();

    const handleDownload = () => {
        pdf(<Facture data={{ ...data, factureNumber }} id={id} />)
            .toBlob()
            .then((blob) => saveAs(blob, `${moment(data.date).format('YYYYMMDD')}-facture-${factureNumber}.pdf`));
        setNotification(false, 'Facture téléchargée');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/accounting/${id}/facture`);
                setData(res.data[0]);
            } catch (error: any) {
                if (!error?.response) setNotification(true, 'Network error');
                else setNotification(true, `${error.message}: ${error.response.data.message}`);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const factureNumber = data && moment(data.date).format('YYYYMM') + '-' + data.factureID.toString().padStart(3, '0');

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
                            <Title order={4}>Facture {factureNumber}</Title>
                        </Group>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    {data ? (
                        <PDFViewer style={styles.viewer}>
                            <Facture data={{ ...data, factureNumber }} id={id} />
                        </PDFViewer>
                    ) : (
                        <LoadingOverlay visible />
                    )}
                    <Group position="center" mt="sm">
                        <Button variant="light" color="teal" onClick={handleDownload}>
                            Télécharger
                        </Button>
                    </Group>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ViewFacture;
