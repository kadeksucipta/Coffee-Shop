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
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { Badge, Col, Container, ListGroup, Navbar, NavDropdown, Row, Table } from "react-bootstrap";
import {
  decrementWitchCheckingAction,
  increment,
} from "../App/features/Counter/actions";
import { numberWithCommas } from "../Component/Utils";
import otak from "./OTAK BUSINESS.png";
import "./Invoice.css"
import AnimatedPage from "../Component/AnimatedPage";

const Invoice = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToPemesanan = () => {
    navigate("/Pemesanan");
  };
  const goToHome = () => {
    navigate("/Home");
  };
  const goToCart = () => {
    navigate("/Cart");
  };

  const {state} = useLocation()
  const [invoice, setInvoice] = useState({})
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });
  console.log("invoiceee", invoice);

  useEffect(() => {
    fetchProfile();
    getInvoices();
    fetchCart()
  }, []);

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`https://jungle-green-hermit-crab-fez.cyclic.app/auth/me`, {
      method: "GET",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
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
    fetch(`https://jungle-green-hermit-crab-fez.cyclic.app/api/carts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data);
      });
  };

  const getInvoices = () => {
    const token = localStorage.getItem("token");
    fetch(`https://jungle-green-hermit-crab-fez.cyclic.app/api/invoices/${state?.id}`, {
      method: "GET", 
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setInvoice(data)
      console.log("get invoice: ", data);
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
              <Nav.Link
                onClick={() => goToHome()}
                style={{ color: "black" }}
                active
              >
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
            Invoice
          </Card.Header>
          <Card.Body>
          <Table responsive style={{ maxWidth: "100%" }} className="table-alamat" striped bordered hover>
              <thead style={{ maxWidth: "100%" }}>
                <tr style={{ maxWidth: "100%" }}>
                  <th>Time Order</th>
                  <th>Status</th>
                  <th>Order ID</th>
                  <th>Total Amount</th>
                  <th>Billed to</th>
                  <th>Payment to</th>
                </tr>
              </thead>
              <tbody style={{maxWidth: "100%"}}>
                <tr style={{maxWidth: "100%"}}>
                  <td>{invoice?.createdAt}</td>
                  <td>{invoice?.order?.status}</td>
                  <td>#{invoice?.user?.customer_id}</td>
                  <td>Rp.{numberWithCommas(invoice?.total)}.00</td>
                  <td><strong>{invoice?.user?.full_name}</strong>
                  <br />
                  {invoice?.user?.email} <br />
                  {invoice?.order?.delivery_address.detail}</td>
                  <td><strong>PUTRA DWI</strong>
                  <br />
                  dwip@gmail.com <br />
                  Mandiri <br />
                  xxxx-xxxxxxx-999-24</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Invoice;
