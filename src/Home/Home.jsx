import { faCartFlatbed, faCartPlus, faCartShopping, faCocktail, faTag, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import otak from "./OTAK BUSINESS.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../Component/Utils";
import swal from "sweetalert";
import { setCart } from "../App/features/Cart/Actions";

const Home = () => {
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToCart = () => {
    navigate("/Cart");
  }; 

  useEffect(() => {
    fetchProduct();
    fetchTags();
    fetchCart();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [tags, setTags] = useState([]);
  const [select, setSelect] = useState([]);
  const cart = useSelector((state) => state.cart);

  const fetchProduct = () => {
    fetch(`http://localhost:8000/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log(data);
      });
  };

  const handleClick = (category) => {
    setSelect(category);
    fetch(`http://localhost:8000/api/products?limit=50&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log(data);
      });
  };

  const fetchTags = () => {
    fetch(`http://localhost:8000/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };

  const handleTags = (tags) => {
    fetch(`http://localhost:8000/api/products?limit=50&tags=${tags}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log(data);
      });
  };

  const addtoCart = (item) => {
    const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      let oldCart = cart.map(item => ({...item.product, qty: item.qty}))
      let existingItemIndex = oldCart.findIndex(cartItem => cartItem._id === item._id)
      let items 
      if (existingItemIndex >= 0) {
        oldCart[existingItemIndex] = {...oldCart[existingItemIndex], qty: oldCart[existingItemIndex].qty+1}
        items = oldCart
      } else {
        items = [...oldCart, {...item, qty: 1}]
      }
      console.log("oldcart :", oldCart);
      console.log("cart: ",cart);
      console.log("itemsss :", items);

      fetch(`http://localhost:8000/api/carts`, {
        method: "PUT",
        body: JSON.stringify({
          user: JSON.parse(userData),
          items
        }),

        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log({response});
        if (response.status === 200) {
          fetchCart() 
          swal({
            title: "Pesanan Diterima",
            text: "Terimakasi Sudah Berbelanja :)",
            icon: "success",
            button: false,
            timer: 1000,
          });
        }
      })

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
        console.log({ data });
        dispatch(setCart(data));
        console.log(data);
      });
  };

  return (
    <React.Fragment>
      <Navbar variant="light" className="nav-coffe" expand="lg">
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
                onChange={(e) => {
                  handleClick(e.target.value);
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
              <Nav.Link  style={{ color: "black" }} active>
                Menu
              </Nav.Link>
              <Nav.Link onClick={() => goToCart()} style={{ color: "black" }}>
                <FontAwesomeIcon icon={faCartShopping} /><Badge pill bg="danger">{cart.length}</Badge>
              </Nav.Link>
              <Nav.Link onClick={() => goToProfile()} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faUserAlt} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div style={{ marginTop: "30px" }}>
          <h5>Selamat datang !</h5>
          <h3>Silahkan pilih menu favorite anda !</h3>
        </div>
        <div>
        {tags.map((item, index) => (
          
            <button
              key={index}
              value={tags}
              className="tag-menu"
              onClick={() => handleTags(item.name)}
            ><FontAwesomeIcon icon={faTag} />
              {item.name}
            </button>
          ))}
        </div>
        <div className="box-home">
          {product.map((item, index) => (
            <Card
              key={index}
              className="card-home"
              style={{
                borderRadius: "10px 10px 80px 80px",
              }}
            >
              <Card.Img
                style={{ borderRadius: "10px 10px 0px 0px" }}
                variant="top"
                src={"http://localhost:8000/images/" + item.image_url}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Rp.{numberWithCommas(item.price)}</Card.Text>
                <div style={{ display: "flex" }}>
                  {item.tags.map((value, index) => (
                    <Button
                      style={{
                        display: "flex",
                        border: "1px solid #a56e06",
                        background: "none",
                        color: "#a56e06",
                      }}
                      key={index}
                    >
                      {value.name}
                    </Button>
                  ))}
                  <Button
                    style={{
                      border: "none",
                      background: "#a56e06",
                      color: "white",
                    }}
                    onClick={() => addtoCart(item)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Home;
