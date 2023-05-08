import React from 'react';
import { Button, Group, LoadingOverlay, Modal, Title } from '@mantine/core';
import { PDFViewer } from '@react-pdf/renderer';
import { useViewFacture } from './logic';
import { ViewFactureStyles } from './styles';
import Facture from '../pdf/facture';
import ModalOverlay from '../modal-overlay';

const ViewFacture = ({ open, handler, id }: { open: boolean; handler: any; id: string }) => {
    const { factureNumber, data, handleDownload } = useViewFacture(id);

    return (
        <Modal.Root opened={open} onClose={handler} size="xl">
            <Modal.Overlay {...ModalOverlay} />
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
                        <PDFViewer style={ViewFactureStyles.viewer}>
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
