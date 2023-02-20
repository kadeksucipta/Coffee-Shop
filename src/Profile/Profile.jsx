import {
  faCartFlatbed,
  faCartPlus,
  faCartShopping,
  faEnvelope,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../Component/AnimatedPage";
import otak from "./OTAK BUSINESS.png";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/Home");
  };
  const goToLogout = () => {
    navigate("/Logout")
  }
  const goToAlamat = () => {
    navigate("/Alamat")
  }
  const goToCart = () => {
    navigate("/Cart")
  }
  const goToPemesanan = () => {
    navigate("/Pemesanan")
  }

  const [product, setProduct] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [tags, setTags] = useState([]);
  const [select, setSelect] = useState([]);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProduct = () => {
    fetch(`https://glamorous-sock-ox.cyclic.app/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log(data);
      });
  };

  const handleClick = (category) => {
    setSelect(category);
    fetch(`https://glamorous-sock-ox.cyclic.app/api/products?limit=50&category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log(data);
      });
  };

  const fetchTags = () => {
    fetch(`https://glamorous-sock-ox.cyclic.app/api/tags`)
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  };

  const handleTags = (tags) => {
    fetch(`https://glamorous-sock-ox.cyclic.app/api/products?limit=50&tags=${tags}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        console.log(data);
      });
  };

  const fetchProfile = (formData) => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/auth/me`, {
      method: "GET",
      body: formData,
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyMTQxZmRkOTQ4MTg3Y2FiOTdkYTkiLCJmdWxsX25hbWUiOiJrYWRlayBzdWNpcHRhIiwiZW1haWwiOiJrYWNpcDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3VzdG9tZXJfaWQiOjE2LCJpYXQiOjE2NzY4MDkyNjd9.2s40qd3LHnkSPGxkgtdr4RB5dLshARd3PFm-FGPERg4` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  };

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
              <Nav.Link onClick={() => goToHome()} href="#action1" style={{ color: "black" }} active>
                Menu
              </Nav.Link>
              <Nav.Link onClick={() => goToCart()} style={{ color: "black" }}>
                <FontAwesomeIcon icon={faCartShopping} />
                <Badge pill bg="danger">
                  {cart.length}
                </Badge>
              </Nav.Link>
              <Nav.Link style={{ color: "black" }}>
                <FontAwesomeIcon icon={faUserAlt} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Card
          style={{
            border: "none",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
          className="card-profile"
        >
          <Card.Header className="header-profile">
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToAlamat()} style={{ color: "white" }}>Alamat</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToPemesanan()} style={{ color: "white" }}>Pemesanan</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => goToLogout()} style={{ color: "white" }}>Log Out</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            <Card.Title>My Profile</Card.Title>
            <hr style={{ width: "10%" }} />
            <Card.Text>
              <FontAwesomeIcon icon={faUser} /> Name: {profile.full_name}
            </Card.Text>
            <Card.Text>
              <FontAwesomeIcon icon={faEnvelope} /> Email: {profile.email}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="footer-profile">Hello User !</Card.Footer>
        </Card>
      </Container>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Profile;
