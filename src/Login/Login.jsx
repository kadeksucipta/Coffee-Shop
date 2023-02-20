import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../src/App/features/Login/Actions"
import AnimatedPage from "../Component/AnimatedPage";
import "./Login.css";
import otak from "./OTAK BUSINESS.png";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToHome = () => {
    dispatch(setUserData(user));
    navigate("/Home");
  };

  const goToRegister = () => {
    dispatch(setUserData(user));
    navigate("/Register");
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");

  const fetchLogin = (formData) => {
    fetch(`https://glamorous-sock-ox.cyclic.app/auth/login`, {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 400) {
          return setError(true);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(setUserData({ user: data.user, token: data.token }));

        createItem(data);
        goToHome();
        console.log(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      return setError(true);
    }
    const formData = new URLSearchParams({
      email,
      password,
    });
    fetchLogin(formData);
    console.log(email, password);
  };

  const createItem = (data) => {
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  return (
    <AnimatedPage>
    <React.Fragment>
      <div className="bg-login">
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <div className="box-login">
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                alt=""
                src={otak}
                width="150px"
                height="100px"
                className="d-inline-block align-top"
              />
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              {error && email.length <= 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Email tidak boleh kosong !
                </label>
              ) : (
                ""
              )}
              {error && email.length > 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Email belum terdaftar !
                </label>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <div>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
              {error && password.length <= 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Password tidak boleh kosong !
                </label>
              ) : (
                ""
              )}

              {error && password.length > 0 ? (
                <label style={{ color: "red" }} className="error-login">
                  Password salah !
                </label>
              ) : (
                ""
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              className="button-login"
              onClick={() => handleSubmit()}
              type="submit"
            >
              LogIn
            </Button>
            <div
                style={{ justifyContent: "center", alignItems: "center", marginBottom: "20px" }}
                className="d-flex"
              >
                <span>Belum punya akun?</span>
                <Nav.Link
                  onClick={() => goToRegister()}
                  style={{ display: "flex", color: "blue", marginLeft: "5px" }}
                >
                  Sign Up
                </Nav.Link>
              </div>
          </Form>
        </div>
      </Container>
      <div className="sosmed-login">
      {/* <div className="icon-login">
          <FontAwesomeIcon style={{ maxWidth: "100%", maxWidth: "100%", marginTop: "80px", marginRight: "5px" }} icon={faInstagram} />
          <span
            style={{ maxWidth: "100%", marginTop: "80px", fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            otak.coffee
          </span>
          <span
            style={{ maxWidth: "100%", marginTop: "80px", fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            |
          </span>
          <FontAwesomeIcon style={{ maxWidth: "100%", marginTop: "80px", marginRight: "5px" }} icon={faTwitter} />
          <span
            style={{ maxWidth: "100%", marginTop: "80px", fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            otak_coffee.b
          </span>
          <span
            style={{ maxWidth: "100%", marginTop: "80px", fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            |
          </span>
          <FontAwesomeIcon style={{ maxWidth: "100%", marginTop: "80px", marginRight: "5px" }} icon={faFacebook} />
          <span
            style={{ maxWidth: "100%", marginTop: "80px", fontSize: "18px", marginRight: "5px", fontWeight: "100" }}
          >
            otakbusinesscf
          </span>
        </div> */}
      </div>
      </div>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Login;
