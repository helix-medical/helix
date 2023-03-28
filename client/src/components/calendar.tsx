import React from "react";
import { Alert, Badge, Title } from "@mantine/core";

const Calendar = () => {
    return (
        <div>
            <Title order={2}>## Calendar <Badge color='red' radius='md' variant="outline">12</Badge></Title>
            <div className="calendar">
                <Alert color='red' title='Calendar Not Implemented'>
                </Alert>
            </div>
        </div>
    );
};

export default Calendar;