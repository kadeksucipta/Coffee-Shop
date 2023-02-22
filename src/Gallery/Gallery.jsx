import { faCartFlatbed, faCartPlus, faCartShopping, faCocktail, faTag, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import otak from "./OTAK BUSINESS.png";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../Component/Utils";
import { setCart } from "../App/features/Cart/Actions";
import AnimatedPage from "../Component/AnimatedPage";

const Gallery= () => {
  const goToProfile = () => {
    navigate("/Profile");
  };
  const goToCart = () => {
    navigate("/Cart");
  }; 
  const goToLanding = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [tags, setTags] = useState([]);
  const [select, setSelect] = useState([]);
  const cart = useSelector((state) => state.cart);

  const fetchGallery = () => {
    fetch(`https://glamorous-sock-ox.cyclic.app/api/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data.data);
        console.log(data);
      });
  };

  return (
    <AnimatedPage>
    <React.Fragment>
      <Navbar variant="light" className="nav-portal" expand="lg">
        <Container>
          <Navbar.Brand style={{cursor: "pointer"}} onClick={() => goToLanding()}>
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
            {/* <Nav
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
            </Nav> */}
            
            {/* <Nav className="d-flex">
              <Nav.Link  style={{ color: "black" }} active>
                Menu
              </Nav.Link>
              <Nav.Link onClick={() => goToCart()} style={{ color: "black" }}>
                <FontAwesomeIcon icon={faCartShopping} /><Badge pill bg="danger">{cart.length}</Badge>
              </Nav.Link>
              <Nav.Link onClick={() => goToProfile()} style={{ color: "black" }}>
              <FontAwesomeIcon icon={faUserAlt} />
              </Nav.Link>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div style={{ marginTop: "30px" }}>
          <h5>Selamat datang !</h5>
          <h3>Gallery kami</h3>
        </div>
        <div className="box-gallery">
          {gallery.map((item, index) => (
            <Card
              key={index}
              className="card-gallery"
              style={{
                borderRadius: "10px 10px 80px 80px",
              }}
            >
              <Card.Img
                style={{ borderRadius: "10px 10px 0px 0px" }}
                variant="top"
                src={"https://glamorous-sock-ox.cyclic.app/images/" + item.image_url}
              />
              <Card.Body>
                <Card.Title className="text-center">{item.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Gallery;
