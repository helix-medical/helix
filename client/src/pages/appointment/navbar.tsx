import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

interface IProps {
    view?: boolean;
}

function NavBarAppointment({ view }: IProps): JSX.Element {
    return (
        <Navbar expand="lg">
            <div className="container-fluid">
                <Navbar.Brand>
                    <h1>Appointment&nbsp;
                        <Badge
                            bg={view ? 'danger' : 'primary'}
                        >
                            {view ? 'READONLY' : 'CAN EDIT'}
                        </Badge>
                    </h1>
                </Navbar.Brand>
                <div className="buttons-nav">
                    {view &&
                        <Button variant="primary" disabled>Export to PDF</Button>}
                </div>
            </div>
        </Navbar>
    );
};

export default NavBarAppointment;