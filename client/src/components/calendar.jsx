import Alert from "react-bootstrap/Alert";
import React from "react";
import Badge from "react-bootstrap/Badge";

const Calendar = () => {
    return (
        <div>
            <h2>## Calendar <Badge bg='secondary' pill>12</Badge></h2>
            <div className="calendar">
                <Alert variant="danger">
                    <Alert.Heading>
                        Calendar Not Implemented
                    </Alert.Heading>
                </Alert>
            </div>
        </div>
    );
};

export default Calendar;