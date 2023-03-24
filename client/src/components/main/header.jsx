import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

function Header(props) {
  return (
    <Navbar expand="md" bg='light'>
      <Container fluid>
        <Navbar.Brand href="/"><h1>Helix</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="me-auto my-2 my-lg-0"
          >
            <Nav.Link href="/patients"><h4>Patients</h4></Nav.Link>
            <Nav.Link href="/appointments"><h4>Appointments</h4></Nav.Link>
            <Nav.Link href="/calendar" disabled><h4>Calendar</h4></Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Patient"
              className="me-2"
              aria-label="Search"
              disabled
            />
            <Button variant="outline-success" disabled>Search</Button>
          </Form>
          <Nav>
            <Nav.Link href="/account"><Icon path={mdiAccount} size={1} />User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;