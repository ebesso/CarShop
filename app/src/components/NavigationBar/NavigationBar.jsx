import React from "react"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { logout } from "../../services"
import './navigationBar.css'

import { useIsAdmin, useIsAuthenticated } from "../../hooks/useApi"

export default function NavigationBar() {

  const {isAdmin} = useIsAdmin();
  const {loading, isAuthenticated, email} = useIsAuthenticated();


  const handleLogout = () => {
    logout().catch(() => console.log('Internal error'))
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="">Car Shop</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/employees">Employees</Nav.Link>
            <Nav.Link href="/sales">Sales</Nav.Link>
            <Nav.Link href="/car-models">Car Models</Nav.Link>
            <Nav.Link href="/users" disabled={!isAdmin}>Users</Nav.Link>

          </Nav>
          <Navbar.Text className="signedin-text">Signed in as </Navbar.Text>
          <NavDropdown title={email}>
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/login" onClick={handleLogout}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}