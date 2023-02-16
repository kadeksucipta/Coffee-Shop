import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { increment } from "../App/features/Counter/actions";
import { setCart } from "../App/features/Cart/Actions";
import otak from "./OTAK BUSINESS.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { numberWithCommas } from "../Component/Utils";

const Cart = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToHome = () => {
    navigate("/Home");
  };
  const goToAlamat = () => {
    navigate("/Alamat");
  };
  const goToCheckout = () => {
    navigate("/Checkout");
  };

  const dispatch = useDispatch();
  let { count } = useSelector((state) => state.counter);
  var totalCartPrice = 0;
  const cart = useSelector((state) => state.cart);

  const addtoCart = (item) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    let oldCart = cart.map((item) => ({ ...item.product, qty: item.qty }));
    let existingItemIndex = oldCart.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    let items;
    if (existingItemIndex >= 0) {
      oldCart[existingItemIndex] = {
        ...oldCart[existingItemIndex],
        qty: oldCart[existingItemIndex].qty + 1,
      };
      items = oldCart;
    } else {
      items = [...oldCart, { ...item, qty: 1 }];
    }
    console.log("oldcart :", oldCart);
    console.log("cart: ", cart);
    console.log("itemscart :", items);

    fetch(`http://localhost:8000/api/carts`, {
      method: "PUT",
      body: JSON.stringify({
        user: JSON.parse(userData),
        items,
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log({ response });
      if (response.status === 200) {
        fetchCart();
      }
    });
    console.log(cart);
  };

  const removeProduct = (item) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    let oldCart = cart.map((item) => ({ ...item.product, qty: item.qty }));
    let existingItemIndex = oldCart.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    let items;
    if (existingItemIndex >= 0) {
      oldCart[existingItemIndex] = {
        ...oldCart[existingItemIndex],
        qty: oldCart[existingItemIndex].qty - 1,
      };
      items = oldCart;
    } else {
      items = [...oldCart, { ...item, qty: 1 }];
    }
    console.log("oldcart :", oldCart);
    console.log("cart: ", cart);

    fetch(`http://localhost:8000/api/carts`, {
      method: "PUT",
      body: JSON.stringify({
        user: JSON.parse(userData),
        items,
      }),

      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log({ response });
      if (response.status === 200) {
        fetchCart();
      }
    });

    console.log(cart);
  };

  const fetchCart = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8000/api/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCart(data));
        console.log(data);
      });
  };

  {
    cart.map((item, index) => (totalCartPrice += item.price * item.qty));
  }

  return (
    <React.Fragment>
      <Navbar variant="light" className="nav-portal" expand="lg">
        <Container>
          <Navbar.Brand href="#">
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
              <Nav.Link style={{ color: "black" }}>
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
          <Card.Header style={{color: "white"}} className="header-cart">Keranjang Belanja</Card.Header>
          <Card.Body>
            <h5 onClick={() => dispatch(increment(1))}>
              <strong>
                Sub Total : Rp.{numberWithCommas(totalCartPrice)}.00
              </strong>
            </h5>
            <Table className="table-alamat" striped bordered hover>
              <thead style={{ maxWidth: "100%" }}>
                <tr style={{ maxWidth: "100%" }}>
                  <th>Gambar</th>
                  <th>Barang</th>
                  <th>Harga</th>
                  <th>Qty</th>
                </tr>
              </thead>
              {cart.map((item, index) => (
                <tbody key={index} style={{ maxWidth: "100%" }}>
                  <tr style={{ maxWidth: "100%" }}>
                    <td>
                      <img
                        style={{
                          width: "150px",
                          height: "100px",
                          borderRadius: "5px",
                          maxWidth: "100%"
                        }}
                        variant="top"
                        src={"http://localhost:8000/images/" + item.image_url}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>Rp. {numberWithCommas(item.price)}</td>
                    <td>
                      <button
                        onClick={() => removeProduct(item.product)}
                        className="minus"
                      >
                        <strong>-</strong>
                      </button>
                      {" "}<span>{item.qty}</span>{" "}
               
                      <button
                        onClick={() => addtoCart(item.product)}
                        className="plus"
                      >
                        <strong>+</strong>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Card.Body>
          <Container>
          <Button className="btn-gocheckout" style={{background: "white", border: "1px solid #a56e06", color: "#a56e06"}} onClick={() => goToCheckout()}>Check Out</Button>
          </Container>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Cart;
