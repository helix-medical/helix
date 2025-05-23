// import { useEffect } from 'react';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Calendar as BigCalendar } from 'react-big-calendar';
// import { CreateEvent } from './create';
// import { Group, Paper, Title } from '@mantine/core';
// import { useCalendar } from './logic';
// import { useCalendarConfig } from './calendar.config';
// import { ViewEvent } from './view';
// // import AppTableView from '../appointments/list-view';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import classes from './calendar.module.css';
// // import Appointments from '../appointments';
//
// const Calendar = () => {
//   const {
//     handleResizeEvent,
//     events,
//     event,
//     handleClose,
//     onSelectEvent,
//     opened,
//     fetchEvents,
//     openCreate,
//     toggleOpenCreate,
//     onCreateEvent,
//     range,
//   } = useCalendar();
//   const { customComponents, formats, localizer, messages, slotGroupPropGetter, eventPropGetter } = useCalendarConfig();
//   const HelixCalendar = withDragAndDrop(BigCalendar);
//
//   useEffect(() => {
//     fetchEvents();
//     return () => {};
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//
//   return (
//     <>
//       <Group align="apart" mb="xl">
//         <Title order={1}>Calendar</Title>
//         {/*<SegmentedControl*/}
//         {/*  data={[*/}
//         {/*    { label: 'Calendar', value: 'calendar' },*/}
//         {/*    { label: 'List', value: 'list' },*/}
//         {/*  ]}*/}
//         {/*  color={view === 'calendar' ? 'fr-cyan' : 'fr-orange'}*/}
//         {/*  radius="xl"*/}
//         {/*  value={view}*/}
//         {/*  onChange={(value) => setView(value)}*/}
//         {/*/>*/}
//       </Group>
//       <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
//         <HelixCalendar
//           // defaultDate={moment('2023-04-16').toDate()}
//           className={classes.calendar}
//           localizer={localizer}
//           events={events}
//           defaultView="week"
//           formats={formats}
//           max={new Date(1972, 0, 1, 19, 59, 59)}
//           min={new Date(1972, 0, 1, 8, 0, 0)}
//           slotGroupPropGetter={slotGroupPropGetter}
//           eventPropGetter={eventPropGetter}
//           views={['week', 'day', 'agenda']}
//           messages={messages}
//           selectable
//           onSelectSlot={(range) => onCreateEvent(range)}
//           onSelectEvent={onSelectEvent as any}
//           components={customComponents}
//           draggableAccessor={() => true}
//           onDragStart={(event) => console.log(event)}
//           onEventResize={handleResizeEvent as any}
//           onEventDrop={handleResizeEvent as any}
//         />
//       </Paper>
//       <Paper shadow="sm" radius="md" p="lg" withBorder my="lg">
//         {/*<AppTableView appointments={events.filter((event) => event.kind === 'app') as any} />*/}
//       </Paper>
//       {opened ? <ViewEvent input={event} opened={opened} handleClose={handleClose} /> : null}
//       {openCreate ? <CreateEvent opened={openCreate} handler={toggleOpenCreate} range={range} /> : null}
//     </>
//   );
// };
//
// export default Calendar;
