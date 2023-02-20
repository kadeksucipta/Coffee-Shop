import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import Card from "react-bootstrap/Card";
import {
  Badge,
  Col,
  Container,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Table,
} from "react-bootstrap";
import otak from "./OTAK BUSINESS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { setCart } from "../App/features/Cart/Actions";
import AnimatedPage from "../Component/AnimatedPage";

const Checkout = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToCart = () => {
    navigate("/Cart");
  };
  const goToHome = () => {
    navigate("/Home");
  };
  const goToConfirm = () => {
    navigate("/Confirm", { state: { address: selectAddress } });
  };

  const cart = useSelector((state) => state.cart);
  const [selectAddress, setSelectAddress] = useState();
  const [payload, setPayload] = useState([]);
  // const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
    submitAddress();
  }, []);

  const submitAddress = () => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/api/delivery-addresses`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyMTQxZmRkOTQ4MTg3Y2FiOTdkYTkiLCJmdWxsX25hbWUiOiJrYWRlayBzdWNpcHRhIiwiZW1haWwiOiJrYWNpcDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3VzdG9tZXJfaWQiOjE2LCJpYXQiOjE2NzY4MDkyNjd9.2s40qd3LHnkSPGxkgtdr4RB5dLshARd3PFm-FGPERg4`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPayload(data.data);
        console.log(data);
      });
  };

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

  const fetchCart = () => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/api/carts`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyMTQxZmRkOTQ4MTg3Y2FiOTdkYTkiLCJmdWxsX25hbWUiOiJrYWRlayBzdWNpcHRhIiwiZW1haWwiOiJrYWNpcDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3VzdG9tZXJfaWQiOjE2LCJpYXQiOjE2NzY4MDkyNjd9.2s40qd3LHnkSPGxkgtdr4RB5dLshARd3PFm-FGPERg4`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data);
      });
  };

  let { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

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
              <Nav.Link onClick={() => goToHome()} style={{ color: "black" }} active>
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
          <Card.Header style={{ color: "white" }} className="header-checkout">
            CheckOut
          </Card.Header>
          <Card.Body>
            <Table responsive className="table-checkout" striped bordered hover>
              
                <thead style={{ maxWidth: "100%" }}>
                  <tr style={{ maxWidth: "100%" }}>
                    <th>Alamat</th>
                    <th>Detail</th>
                  </tr>
                  </thead>
                  {payload.map((item, index) => (
                  <tbody key={index} style={{ maxWidth: "100%" }}>
                    <tr style={{ maxWidth: "100%" }}>
                      <td>            
                        <input
                        type="checkbox"
                        checked={item._id === selectAddress?._id}
                        onClick={() => setSelectAddress(item)}
                      />{" "}
                      {item.kabupaten}</td>
                      <td>{item.detail}</td>
                    </tr>
                  </tbody>
                
              ))}
            </Table>
          </Card.Body>
          <Container>
            <Button className="btn-checkout" onClick={() => goToConfirm()}>Selanjutnya</Button>
          </Container>
        </Card>
      </Container>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Checkout;
