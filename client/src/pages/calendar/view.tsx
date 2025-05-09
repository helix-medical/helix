// import { Button, Center, Group, Modal, Paper, Text, ThemeIcon } from '@mantine/core';
// import { IEvent } from '../../types/interfaces';
// import moment from 'moment';
// import cnf from '../../config/config';
// import { IconCalendar, IconReportMedical } from '@tabler/icons-react';
// import ModalOverlay from '../../components/modal-overlay';
// import PeekAppointment from '../../components/peek-appointment';
//
// const Header = ({ kind }: { kind: string }) => (
//   <Group>
//     <ThemeIcon variant="light" color={kind === 'app' ? 'fr-orange.4' : 'fr-cyan.4'} size="lg">
//       {kind === 'app' ? <IconReportMedical size="1.2rem" /> : <IconCalendar size="1.2rem" />}
//     </ThemeIcon>
//     <Text fz="lg" fw={700}>
//       {kind === 'app' ? 'Appointment' : 'Event'}
//     </Text>
//   </Group>
// );
// const Footer = ({ handleClose }: { handleClose: () => void }) => (
//   // Add buttons to:
//   // 1. Edit / View event
//   // 2. Delete event
//   <Group align="right" mt="sm">
//     <Button variant="light" color="gray" onClick={handleClose}>
//       Close
//     </Button>
//   </Group>
// );
//
// const Event = ({ input }: { input: IEvent }) => (
//   <>
//     <Center>
//       <Text size="xl" fw={700}>
//         {input.title}
//       </Text>
//     </Center>
//     <Text fz="sm">
//       <Text span fw={700} fz="md">
//         Start:
//       </Text>{' '}
//       {moment(input.start).format(cnf.formatDateTimePretty)}
//     </Text>
//     <Text fz="sm">
//       <Text span fw={700} fz="md">
//         End:
//       </Text>{' '}
//       {moment(input.end).format(cnf.formatDateTimePretty)}
//     </Text>
//     <Text fz="sm">
//       <Text span fw={700} fz="md">
//         Calendar:
//       </Text>{' '}
//       Calendar
//     </Text>
//   </>
// );
//
// const ViewEvent = ({ input, opened, handleClose }: { input: IEvent; opened: boolean; handleClose: () => void }) => (
//   <Modal.Root opened={opened} onClose={handleClose} radius="md">
//     <Modal.Overlay {...ModalOverlay} />
//     <Modal.Content>
//       <Modal.Header>
//         <Modal.Title>
//           <Header kind={input.kind} />
//         </Modal.Title>
//         <Modal.CloseButton />
//       </Modal.Header>
//       <Modal.Body>
//         <Paper shadow="sm" radius="md" p="sm" withBorder>
//           {input.kind === 'event' ? <Event input={input} /> : <PeekAppointment input={input} />}
//         </Paper>
//         <Footer handleClose={handleClose} />
//       </Modal.Body>
//     </Modal.Content>
//   </Modal.Root>
// );
//
// export { ViewEvent };
