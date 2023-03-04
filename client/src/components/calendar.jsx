import React from "react";
import Badge from "react-bootstrap/esm/Badge";

const Calendar = () => {
    return (
        <div>
            <h2>## Calendar <Badge bg='secondary' pill>12</Badge></h2>
            <div className="calendar">
            </div>
        </div>
    );
}

export default Calendar;