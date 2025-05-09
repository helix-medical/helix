import { Button, Group, LoadingOverlay, Modal, Title } from '@mantine/core';
import { PDFViewer } from '@react-pdf/renderer';
import { useViewPDF } from './logic';
import { PDFStyles } from './styles';
import Facture from './facture';
import ModalOverlay from '../modal-overlay';
import PatientPDF from './patient';
// import AppointmentPDF from './appointment';

const ViewPDF = ({ open, handler, id, type }: { open: boolean; handler: any; id: string; type: string }) => {
  const { title, data, handleDownload } = useViewPDF(id, type);
  // TODO: Center the download button
  return (
    <Modal.Root opened={open} onClose={handler} size="xl">
      <Modal.Overlay {...ModalOverlay} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Group align="apart">
              <Title order={4}>{title}</Title>
            </Group>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          {data ? (
            <PDFViewer style={PDFStyles.viewer}>
              {type === 'facture' ? (
                <Facture data={data} id={id} />
              ) : (
                // ) : type === 'patient' ? (
                <PatientPDF data={data} />
                // <AppointmentPDF data={{}} />
              )}
            </PDFViewer>
          ) : (
            <LoadingOverlay visible />
          )}
          <Group align="center" mt="sm">
            <Button variant="light" color="teal" onClick={handleDownload}>
              Télécharger
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ViewPDF;
