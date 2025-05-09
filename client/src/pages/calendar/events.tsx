// import { Badge, Center, Group, Text } from '@mantine/core';
// import moment from 'moment';
// import { EventProps } from 'react-big-calendar';
// import { IEvent } from '../../types/interfaces';
//
// const Event = ({ event }: EventProps<IEvent>) => {
//   return (
//     <>
//       <Text fz="xs" fw={700}>
//         {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
//       </Text>
//       <Center>
//         <Text>{event.title}</Text>
//       </Center>
//     </>
//   );
// };
//
// const AgendaEvent = ({ event }: EventProps<IEvent>) => {
//   return (
//     <Group align="left">
//       <Badge variant="outline" color={event.kind === 'app' ? 'fr-orange.4' : 'fr-cyan.4'} size="sm">
//         {event.kind}
//       </Badge>
//       <Text>{event.title}</Text>
//     </Group>
//   );
// };
//
// export { Event, AgendaEvent };
