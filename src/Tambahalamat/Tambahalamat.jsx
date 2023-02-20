import { faCartShopping, faPlus, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge, Container, Dropdown, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Tambahalamat.css"
import otak from "./OTAK BUSINESS.png";
import AnimatedPage from "../Component/AnimatedPage";

const Tambahalamat = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToAlamat = () => {
    navigate("/Alamat")
  }
  const goToHome = () => {
    navigate("/Homepage")
  }
  const goToContact = () => {
    navigate("/Contactpage")
  }
  const goToProfile = () => {
    navigate("/Profilepage")
  }

  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [payload, setPayload] = useState({
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
    detail: "",
    nama: ""
  })

  useEffect(() => {
    fetchProvinsi();
  }, []);
  
  const submitAddress = () => {
    const token = localStorage.getItem("token");
    fetch(`https://glamorous-sock-ox.cyclic.app/api/delivery-addresses`, {
      method: "POST",
        body: JSON.stringify(payload),

        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YyMTQxZmRkOTQ4MTg3Y2FiOTdkYTkiLCJmdWxsX25hbWUiOiJrYWRlayBzdWNpcHRhIiwiZW1haWwiOiJrYWNpcDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiY3VzdG9tZXJfaWQiOjE2LCJpYXQiOjE2NzY4MDkyNjd9.2s40qd3LHnkSPGxkgtdr4RB5dLshARd3PFm-FGPERg4`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    })
    goToAlamat()
  }

  const fetchProvinsi = () => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then((res) => res.json())
      .then((data) => {
        setProvinsi(data);
        console.log(data);
      });
  };

  const fetchKabupaten = (provincesId) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provincesId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setKabupaten(data);
        console.log(data);
      });
  };

  const fetchKecamatan = (districtsId) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${districtsId}.json`)
    .then((res) => res.json())
    .then((data) => {
      setKecamatan(data)
      console.log(data);
    });
  };

  const fetchKelurahan = (villagesId) => {
    fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${villagesId}.json`)
    .then((res) => res.json())
    .then((data) => {
      setKelurahan(data)
      console.log(data);
    });
  };

  // HANDLE API WILAYAH RI
  const handleProvinsi = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, provinsi: item.name})
    fetchKabupaten(item.id)
  };

  const handleKabupaten = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, kabupaten: item.name})
    fetchKecamatan(item.id)
  };

  const handleKecamatan = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, kecamatan: item.name})
    fetchKelurahan(item.id)
  };

  const handleKelurahan = (e) => {
    const item = JSON.parse(e)
    setPayload({...payload, kelurahan: item.name})
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
                // onChange={(e) => {
                //   handleClick(e.target.value);
                // }}
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
              <Nav.Link href="#action1" style={{ color: "black" }} active>
                Menu
              </Nav.Link>
              <Nav.Link href="#action2" style={{ color: "black" }}>
                <FontAwesomeIcon icon={faCartShopping} /><Badge pill bg="danger">0</Badge>
              </Nav.Link>
              <Nav.Link href="#action2" style={{ color: "black" }}>
              <FontAwesomeIcon icon={faUserAlt} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
      <Card style={{ marginTop: "40px"}}>
        <Card.Header style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}} className="header-tambah" as="h6">Tambah Alamat</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="column-form">
            <form style={{ display: "flex" }}>
              <input
                onChange={e => setPayload({...payload, nama: e.target.value})}
                className="form-alamat"
                type="text"
                placeholder="Masukan Alamat"
              />
              <select
                onChange={e => handleProvinsi(e.target.value)}
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  borderRadius: "5px",
                }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Provinsi
                </option>
                {provinsi.map((item, index) => (
                  <option key={index}  value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </form>
            <br />

            <form style={{ display: "flex" }}>
              <select
                onChange={e => handleKabupaten(e.target.value)}
                style={{ width: "20%", borderRadius: "5px" }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Kabupaten
                </option>
                {kabupaten.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                onChange={e => handleKecamatan(e.target.value)}
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  borderRadius: "5px",
                }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Kecamatan
                </option>
                {kecamatan.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>
            </form>
            <br />

            <form style={{ display: "flex" }}>
              <select
                onChange={e => handleKelurahan(e.target.value)}
                style={{ width: "20%", borderRadius: "5px" }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  Kelurahan
                </option>
                {kelurahan.map((item, index) => (
                  <option key={index} value={JSON.stringify(item)}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                style={{
                  marginLeft: "10px",
                  width: "20%",
                  borderRadius: "5px",
                  cursor: "not-allowed"
                }}
                name=""
                id="role"
                placeholder="select"
              >
                <option disabled hidden selected>
                  None
                </option>
                <option value="admin">-</option>
              </select>
            </form>
            <br />

            <textarea
              onChange={e => setPayload({...payload, detail: e.target.value})}
              style={{
                borderRadius: "5px",
                paddingLeft: "5px",
                width: "40.6%",
                height: "80px",
              }}
              placeholder="Detail Alamat"
            ></textarea>
            </div>
          </Card.Text>
          <Button onClick={() => submitAddress()} style={{background: "white", border: "1px solid #a56e06", color: "#a56e06"}}>Simpan</Button>
        </Card.Body>
      </Card>
      </Container>
    </React.Fragment>
    </AnimatedPage>
  );
};

export default Tambahalamat;
