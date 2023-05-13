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
import { Badge, Col, Container, ListGroup, Navbar, NavDropdown, Row } from "react-bootstrap";
import otak from "./OTAK BUSINESS.png";
import Table from 'react-bootstrap/Table';
import "./Pemesanan.css"
import { numberWithCommas } from "../Component/Utils";
import AnimatedPage from "../Component/AnimatedPage";

const Pemesanan = () => {
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
  const goToTambahAlamat = () => {
    navigate("/TambahAlamat");
  };
  const goToCart = () => {
    navigate("/Cart");
  };
  const goToHome = () => {
    navigate("/Home");
  };
  const goToInvoice = (id) => {
    navigate("/Invoice", {state:{id}});
  };

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  const [payload, setPayload] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState([])

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = () => {
    const token = localStorage.getItem("token");
    fetch(`https://jungle-green-hermit-crab-fez.cyclic.app/api/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setOrder(data.data)
      console.log("order:", data);
    })
  }

  return (
    <AnimatedPage>
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
              <Nav.Link onClick={() => goToHome()}  style={{ color: "black" }} active>
                Menu
              </Nav.Link>
              <Nav.Link onClick={() => goToCart()} style={{ color: "black" }}>
                <FontAwesomeIcon icon={faCartShopping} />
                <Badge pill bg="danger">
                  {cart.length}
                </Badge>
              </Nav.Link>
              <Nav.Link
                onClick={() => goToProfile()}
                style={{ color: "black" }}
              >
                <FontAwesomeIcon icon={faUserAlt} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/*---------------------------------------------------------*/}

    <Container>
      <Card className="mt-5">
        <Card.Header className="header-alamat">
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link onClick={() => goToProfile()} style={{color: "white"}}>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => goToAlamat()} style={{color: "white"}}>Alamat</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => goToPemesanan()} style={{color: "black"}} href="#first">Pemesanan</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => goToLogout()} style={{color: "white"}}>Log Out</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Pemesanan</Card.Title>
          <hr style={{ width: "10%" }} />
          <ListGroup style={{ width: "100%" }} variant="flush">
           
            <div style={{maxWidth: "100%"}}>
              <Table responsive className="table-alamat" striped bordered hover>
              <thead style={{maxWidth: "100%"}}>
                <tr style={{maxWidth: "100%"}}>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              {order?.map((item, index) => (
              <tbody key={index} style={{maxWidth: "100%"}}>
                <tr style={{maxWidth: "100%"}}>
                  <td>{item._id}</td>
                  <td>Rp.{numberWithCommas(item?.total)}.00</td>
                  <td>{item.status}</td>
                  <td><button className="inv-btn" onClick={() => goToInvoice(item._id)}>invoice</button></td>
                </tr>
              </tbody>
            ))}
            </Table>
            </div>
          </ListGroup>
        </Card.Body>
      </Card>
      </Container>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Pemesanan;
