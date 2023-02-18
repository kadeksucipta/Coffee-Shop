import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {

  const [landing, setLanding] = useState([])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/Home");
  };
  const goToLogin = () => {
    navigate("/Login");
  };
  const goToGallery = () => {
    navigate("/Gallery");
  };

  useEffect(() => {
    fetchLanding();
  }, []);

  const fetchLanding = () => {
    fetch(`https://glamorous-sock-ox.cyclic.app/api/landing`)
      .then((res) => res.json())
      .then((data) => {
        setLanding(data.data);
        console.log(data);
      });
  };

  return (
    <React.Fragment>
      <div className="box-bg">
      <Navbar variant="dark" className="nav-portal" expand="lg">
        <Container>
          <Navbar.Brand>
            <strong>Otak</strong>Business
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav className="d-flex">
              <Nav.Link onClick={() => goToLogin()} style={{color: "white"}}>Menu</Nav.Link>
              <Nav.Link onClick={() => goToGallery()} style={{color: "white"}}>Gallery</Nav.Link>
              <Nav.Link onClick={() => goToLogin()} style={{color: "white"}}><FontAwesomeIcon icon={faUserAlt} /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="contens">
        <Container>
          <div className="d-flex">
            <div className="text-landing">
              <h1 style={{ color: "white", fontWeight: "700" }}>Otak Business</h1>
              <h4 style={{ color: "white" }}>
                Nikmati secangkir kopi dengan nuansa alam !
              </h4>
              <button onClick={() => goToLogin()} className="btn-landing">
                <strong>Ngopi Yuk !</strong>
              </button>
              <p style={{ color: "white", marginTop: "10px" }}>
                Grand Opening ada diskon 5% lhooo
                {" "}
                <span>*setiap berbelanja Rp. 100.000 ++</span>
              </p>
            </div>
          </div>
        </Container>
        <div className="box-landing">
        <div className="box2-landing">
          <br />
          <h4 style={{ color: "black", fontSize: "20px", textAlign: "center" }}>
            <strong>Menu Utama</strong>
          </h4>
          
          <div className="d-flex" style={{justifyContent: "center", alignItems: "center"}}>
          {landing.map((item, index) => (
            <Card className="card-landing" key={index} style={{width: "15rem", height: "15rem", borderRadius: "10px 10px 100px 100px", border: "none"}}>
              <Card.Img style={{borderRadius: "10px 10px 5px 5px"}} variant="top" src={"http://localhost:8000/images/" + item.image_url} />
              <Card.Body>
                <Card.Title style={{textAlign: "center"}}>{item.name}</Card.Title>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
          ))}
          </div>
        </div>

        <div className="icon-landing">
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faInstagram} />
          <span
            style={{ fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            otak.coffee
          </span>
          <span
            style={{ fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            |
          </span>
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faTwitter} />
          <span
            style={{ fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            otak_coffee.b
          </span>
          <span
            style={{ fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            |
          </span>
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faFacebook} />
          <span
            style={{ fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            otakbusinesscf
          </span>
        </div>
      </div>
      </main>
      </div>
    </React.Fragment>
  );
};

export default Landing;
