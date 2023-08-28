import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import logo from "../images/logoE.png";
import Loading from "./Loading";
import { toast } from "react-hot-toast";
import { FcFilledFilter } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const NavPage = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(true);
  const [cartLength, setCartLength] = useState(0);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
  });
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    setEditing(true);
  };
  const handleShow = () => {
    setShow(true);
    viewProfile();
  };
  const { id } = useParams();
  // console.log(id);
  const viewProfile = async () => {
    await axios
      .get(`http://localhost:5000/api/s1/users/${id}`)
      .then((users) => {
        setUser(users.data.user);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Filter
    </Tooltip>
  );
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/s1/cart/${id}`)
      .then((res) => {
        const cartData = res.data;
        const itemsLength = cartData.items.length;
        setCartLength(itemsLength);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const onEdit = () => {
    setEditing(false);
    setEditedUser(user);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [name]: value,
    }));
  };

  const onSave = async () => {
    try {
      await axios
        .put(`http://localhost:5000/api/s1/users/${id}`, editedUser)
        .then((users) => {
          setUser(editedUser);
          setEditing(true);
          toast.success(users.data.message);
          handleClose();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const onDelete = async () => {
    try {
      if (window.confirm("Are you sure to delete the Account ? ")) {
        await axios
          .delete(`http://localhost:5000/api/s1/users/${id}`)
          .then((users) => {
            toast(users.data.message);
            navigate("/");
          });
      }
    } catch (error) {}
  };
  const getCart = () => {
    navigate(`/cart/${id}`);
  };
  const onActive = () => {
    document.querySelector(".filter").classList.toggle("active");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ height: "15vh" }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="" style={{ height: "150px", width: "170px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button
                onClick={onActive}
                variant="outline-warning"
                className="my-auto"
              >
                <FcFilledFilter />
              </Button>
            </OverlayTrigger>
            <Button
              variant="warning"
              onClick={handleShow}
              className="my-3 mx-3 h-25"
            >
              profile
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title className="m-auto ps-5">Profile </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {loading ? (
                  <Loading />
                ) : (
                  <Form className="text-start p-2 ">
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupName"
                    >
                      <Form.Label>Name :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={editing ? user.name : editedUser.name}
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupEmail"
                    >
                      <Form.Label>Email :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={editing ? user.email : editedUser.email}
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupPassword"
                    >
                      <Form.Label>Password :</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={editing ? user.password : editedUser.password}
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupGender"
                    >
                      <Form.Label>Gender :</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="w-75 mb-3"
                        name="gender"
                        value={editing ? user.gender : editedUser.gender}
                        disabled={editing}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="formGroupDob">
                      <Form.Label>Date Of Birth :</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="02-02-2000"
                        name="dateOfBirth"
                        value={
                          editing ? user.dateOfBirth : editedUser.dateOfBirth
                        }
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer className="p-1">
                <Link to="/" className="btn btn-outline-secondary">
                  Logout <GrLogout />
                </Link>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {editing ? (
                  <Button variant="primary" onClick={onEdit}>
                    Edit
                  </Button>
                ) : (
                  <Button variant="success" onClick={onSave}>
                    save
                  </Button>
                )}
                <Button variant="danger" onClick={onDelete}>
                  Delete Accout
                </Button>
              </Modal.Footer>
            </Modal>
            <Button variant="warning h-50 my-auto" onClick={getCart}>
              Cart <Badge bg="secondary">{cartLength}</Badge>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavPage;
