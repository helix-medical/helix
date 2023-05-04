import { createStyles } from '@mantine/core';

const Styles = createStyles((theme) => {
    const borderColor = theme.colorScheme === 'dark' ? '#373A40' : 'inherit';
    return {
        calendar: {
            '.rbc-time-content': { borderTop: `2px solid ${borderColor}` },
            '.rbc-day-slot .rbc-time-slot': { border: 0 },
            '.rbc-time-header-content': { borderLeft: `2px solid ${borderColor}` },
            '.rbc-header + .rbc-header': { borderLeft: `2px solid ${borderColor}` },
            '.rbc-day-bg + .rbc-day-bg': { borderLeft: `2px solid ${borderColor}` },
            '.rbc-event-label': { display: 'none' },
            '.rbc-today': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors['fr-cyan'][0],
            },
            '.rbc-event': {
                margin: 5,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors['fr-cyan'][6] : theme.colors['fr-cyan'][4],
            },
            '.rbc-time-view': {
                border: `1px solid ${borderColor}`,
                borderRadius: theme.radius.sm,
            },
            '.rbc-event-container': {
                borderRadius: theme.radius.sm,
                border: `1px solid ${borderColor}`,
            },
            '.rbc-header': {
                borderBottom: `2px solid ${borderColor}`,
                paddingBottom: 5,
            },
            '.rbc-timeslot-group': {
                borderLeft: `2px solid ${borderColor}`,
                borderBottom: `1px solid ${borderColor}`,
            },
        },
    };
});

export default Styles;
