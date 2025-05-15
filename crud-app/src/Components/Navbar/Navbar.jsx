import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <Navbar expand="lg" className=" ">
      <Container>
        <Navbar.Brand className="fw-bold text-warning fs-4" href="#home">
          CRUD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Link
              to="/"
              className="me-5  text-decoration-none fw-bold nav-color"
            >
              Dashboard
            </Link>

            <Link
              to="AddPost"
              className="me-5  text-decoration-none fw-bold nav-color"
            >
              AddPost
            </Link>

            <Link
              to="login"
              className="me-5  text-decoration-none fw-bold nav-color"
            >
              LogIn
            </Link>

            <Link
              to="/signup"
              className="me-5  text-decoration-none fw-bold nav-color"
            >
              SignUp
            </Link>
            <Link
              to="/logout"
              className="  text-decoration-none fw-bold nav-color"
            >
              Logout
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
