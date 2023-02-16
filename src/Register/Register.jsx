import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../src/App/features/Login/Actions";
import "./Register.css";
import otak from "./OTAK BUSINESS.png";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToLogin = () => {
    dispatch(setUserData(user));
    navigate("/Login");
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [select, setSelect] = useState([]);

  const fetchLogin = (formData) => {
    fetch(`http://localhost:8000/auth/register`, {
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
        goToLogin();
        console.log(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      return setError(true);
    }
    const formData = new URLSearchParams({
      full_name: name,
      email,
      password,
      role: select,
    });
    fetchLogin(formData);
    console.log(email, password);
  };

  const createItem = (data) => {
    localStorage.setItem("userData", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  return (
    <React.Fragment>
      <div className="bg-register">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <div className="box-register">
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
              <Form.Group className="mb-3">
                <div>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                  />
                </div>
                {error && name.length <= 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Nama tidak boleh kosong !
                  </label>
                ) : (
                  ""
                )}
                {error && email.length > 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Nama minimal 8 karakter !
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>

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
                    Email sudah terdaftar !
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

              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Role</strong>
                </Form.Label>
                <div>
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "7px",
                      paddingLeft: "10px",
                      background: "none",
                      cursor: "pointer",
                    }}
                    className="role-input"
                    name=""
                    id="role"
                    placeholder="select"
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option disabled hidden selected>
                      select role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                {error && select.length <= 0 ? (
                  <label style={{ color: "red" }} className="error-login">
                    Pilih role Anda !
                  </label>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button
                className="button-register"
                onClick={() => handleSubmit()}
                type="submit"
              >
                SigIn
              </Button>
            </Form>
          </div>
        </Container>
        <div className="sosmed-register">
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
  );
};

export default Register;
