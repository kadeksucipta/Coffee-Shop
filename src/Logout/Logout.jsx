import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Badge, Container, Modal, Navbar, NavDropdown } from "react-bootstrap";
import otak from "./OTAK BUSINESS.png";
import "./Logout.css"

const Logout = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToPemesanan = () => {
    navigate("/Pemesanan");
  };
  const goToAlamat = () => {
    navigate("/Alamat");
  };
  const goToLogout = () => {
    navigate("/Logout");
  };
  const goToLogin = () => {
    navigate("/Login");
  };

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/auth/me`, {
      method: "GET",
      body: formData,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyMTQxZmRkOTQ4MTg3Y2FiOTdkYTkiLCJmdWxsX25hbWUiOiJrYWRlayBzdWNpcHRhIiwiZW1haWwiOiJrYWNpcDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3VzdG9tZXJfaWQiOjE2LCJpYXQiOjE2NzY4MDkyNjd9.2s40qd3LHnkSPGxkgtdr4RB5dLshARd3PFm-FGPERg4`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  };

  return (
    <React.Fragment>
      <Navbar variant="light" className="nav-portal" expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={otak}
              width="50"
              height="30"
              className="d-inline-block align-top"
            />
            <strong>Otak</strong>Business
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <select
                style={{
                  borderRadius: "4px",
                  background: "white",
                  color: "black",
                  border: "none",
                }}
                // onChange={(e) => {
                //   handleClick(e.target.value);
                // }}
                title="Category"
                id="navbarScrollingDropdown"
              >
                <option
                  style={{ background: "white", color: "black" }}
                  value="Semua Menu"
                >
                  Semua Menu
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Minuman"
                >
                  Minuman
                </option>
                <NavDropdown.Divider />
                <option
                  style={{ background: "white", color: "black" }}
                  value="Snack"
                >
                  Snack
                </option>
                <NavDropdown.Divider />
              </select>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link style={{ color: "black" }} active>
                Menu
              </Nav.Link>
              <Nav.Link style={{ color: "black" }}>
                <FontAwesomeIcon icon={faCartShopping} />
                <Badge pill bg="danger">
                  {cart.length}
                </Badge>
              </Nav.Link>
              <Nav.Link
                onClick={() => goToProfile()}
                href="#action2"
                style={{ color: "black" }}
              >
                <FontAwesomeIcon icon={faUserAlt} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*---------------------------------------------------------*/}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header className="header-logout" onClick={() => goToProfile()} closeButton>
            <Modal.Title>Logout</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Anda yakin ingin Logout.</p>
          </Modal.Body>

          <Modal.Footer className="footer-logout">
            <Button
              className="btn-logout-tidak"
              onClick={() => goToProfile()}
            >
              Tidak
            </Button>
            <Button onClick={() => goToLogin()} className="btn-logout-ya">
              Ya
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </React.Fragment>
  );
};

export default Logout;
