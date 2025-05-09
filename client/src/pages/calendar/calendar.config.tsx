// import { momentLocalizer } from 'react-big-calendar';
// import { Event, AgendaEvent } from './events';
// import Toolbar from './toolbar';
// import { Text } from '@mantine/core';
// import moment from 'moment';
// import { useCallback, useMemo } from 'react';
//
// const useCalendarConfig = () => {
//     const customComponents = useMemo(
//         () => ({
//             timeGutterWrapper: (props: any): any => (
//                 <Text tt="uppercase" fw={500}>
//                     {props.children}
//                 </Text>
//             ),
//             toolbar: Toolbar,
//             week: {
//                 event: Event as any,
//                 header: (props: any) => (
//                     <Text tt="uppercase" fw={700}>
//                         {props.label}
//                     </Text>
//                 ),
//             },
//             day: { event: Event as any },
//             agenda: { event: AgendaEvent as any },
//         }),
//         []
//     );
//
//     const slotGroupPropGetter = useCallback(() => ({ style: { minHeight: 60 } }), []);
//
//     const eventPropGetter = useCallback(
//         (event: any) => ({ ...(event.kind === 'app' && { className: 'test-event' }) }),
//         []
//     );
//
//     const localizer = momentLocalizer(moment);
//
//     const formats = useMemo(
//         () => ({
//             selectRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
//                 `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'hh:mm', 'fr')}`,
//             dateFormat: 'DD',
//             dayFormat: 'ddd DD',
//             dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
//                 `${localizer.format(start, 'ddd DD MMM', 'fr')} - ${localizer.format(end, 'ddd DD MMM', 'fr')}`,
//             dayHeaderFormat: 'dddd DD MMMM',
//             agendaDateFormat: 'dddd DD MMM',
//             agendaTimeFormat: 'HH:mm',
//             agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
//                 `${localizer.format(start, 'HH:mm', 'fr')} - ${localizer.format(end, 'HH:mm', 'fr')}`,
//             eventTimeRangeFormat: () => '',
//             timeGutterFormat: 'HH:mm',
//             agendaHeaderFormat: ({ start, end }: { start: Date; end: Date }) =>
//                 `${localizer.format(start, 'ddd DD MMM', 'fr')} - ${localizer.format(end, 'ddd DD MMM', 'fr')}`,
//         }),
//         [localizer]
//     );
//
//     const messages = {
//         date: 'Date',
//         time: 'Time',
//         event: 'Event',
//         allDay: 'All Day',
//         week: 'Week',
//         work_week: 'Work Week',
//         day: 'Day',
//         month: 'Month',
//         previous: 'Back',
//         next: 'Next',
//         yesterday: 'Yesterday',
//         tomorrow: 'Tomorrow',
//         today: 'Today',
//         agenda: 'Agenda',
//         noEventsInRange: 'There are no events in this range.',
//         showMore: (total: number) => `+${total} more`,
//     };
//
//     return { customComponents, localizer, formats, messages, slotGroupPropGetter, eventPropGetter };
// };
//
// export { useCalendarConfig };
