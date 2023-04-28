import React from 'react';
import { Badge, useMantineTheme } from '@mantine/core';
import { DateCellWrapperProps } from 'react-big-calendar';
import moment from 'moment';

const DateCellWrapper = (props: DateCellWrapperProps) => {
    const { children, value } = props;
    const theme = useMantineTheme();
    const style = {
        display: 'center',
        flex: 1,
        border: `1px solid`,
        borderColor: theme.colorScheme === 'dark' ? '#373A40' : '#dee2e6',
    };
    return (
        <div style={style}>
            <Badge color="red" variant="filled" style={{ float: 'none' }}>
                {moment(value).format('DDD')}
            </Badge>
            {children}
        </div>
    );
};

export default DateCellWrapper;
