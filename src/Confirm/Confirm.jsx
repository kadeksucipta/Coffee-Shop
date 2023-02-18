import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { Badge, Col, Container, ListGroup, Nav, Navbar, NavDropdown, Row, Table } from "react-bootstrap";
import { numberWithCommas } from "../Component/Utils";
import otak from "./OTAK BUSINESS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import "./Confirm.css"

const Confirm = () => {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate("/Profile")
  }
  const goToHome = () => {
      navigate("/Home")
  }
  const goToCheckout = () => {
    navigate("/Checkout")
  }
  // const goToInvoice = () => {
  //   navigate("/Invoice")
  // }
  const goToCart = () => {
    navigate("/Cart")
  }

  var totalCartPrice = 0;
  const {state} = useLocation()
  const cart = useSelector((state) => state.cart);
  const [payload, setPayload] = useState([])
  const [profile, setProfile] = useState({
    full_name: "",
    email: ""
  })

  useEffect(() => {
    submitAddress()
  }, [])

  const goToInvoice = () => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/api/orders`, {
      method: "POST", 
      body: JSON.stringify({
        delivery_fee: 10000,
        delivery_address: state.address
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data._id) {
        navigate("/Invoice", {state: {id: data._id}})
      }
    })
  }

  const submitAddress = () => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/api/delivery-addresses`, {
      method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
      setPayload(data.data)
      console.log(data);
    })
  }

    {cart.map((item, index) => (
      totalCartPrice += item.price * item.qty
    ))}

    let {count}= useSelector(state => state.counter)
    const dispatch = useDispatch()
  
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
            Confirm
          </Card.Header>
          <Card.Body>
          <Table responsive style={{ maxWidth: "100%" }} className="table-alamat" striped bordered hover>
              <thead style={{maxWidth: "100%"}}>
                <tr style={{maxWidth: "100%"}}>
                  <th>Alamat</th>
                  <th>Sub total</th>
                  <th>Ongkir</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody style={{maxWidth: "100%"}}>
                <tr style={{maxWidth: "100%"}}>
                  <td>{state?.address?.detail}</td>
                  <td>Rp.{numberWithCommas(totalCartPrice)}.00</td>
                  <td>Rp.10.000.00</td>
                  <td><strong>Rp.{numberWithCommas(totalCartPrice+10000)}.00</strong></td>
                </tr>
              </tbody>

            </Table>
          </Card.Body>
          <Container style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Button onClick={() => goToCheckout()} className="btn-confirmkembali">Kembali</Button>
            </div>
            <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
            <Button onClick={() => goToInvoice()} className="btn-confirmbayar">Bayar</Button>
            </div>
          </Container>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default Confirm;