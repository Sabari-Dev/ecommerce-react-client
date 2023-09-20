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
import FileBase64 from "react-file-base64";

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
    profileImage: "",
  });
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    setEditing(true);
  };
  const handleShow = () => {
    setShow(true);
  };
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    const viewProfile = async () => {
      await axios
        .get(`https://hilarious-skirt-moth.cyclic.cloud/api/s1/users/${id}`)
        .then((users) => {
          setUser(users.data.user);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    viewProfile();
  }, [id]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Filter
    </Tooltip>
  );
  useEffect(() => {
    axios
      .get(`https://hilarious-skirt-moth.cyclic.cloud/api/s1/cart/${id}`)
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
  const handleFileUpload = (file) => {
    setEditedUser((prev) => {
      return { ...prev, profileImage: file.base64 };
    });
  };

  const onSave = async () => {
    try {
      await axios
        .put(
          `https://hilarious-skirt-moth.cyclic.cloud/api/s1/users/${id}`,
          editedUser
        )
        .then((response) => {
          setUser(editedUser);
          setEditing(true);
          toast.success(response.data.message);
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
          .delete(
            `https://hilarious-skirt-moth.cyclic.cloud/api/s1/users/${id}`
          )
          .then((users) => {
            toast(users.data.message);
            navigate("/");
          });
      }
    } catch (error) {}
  };
  // console.log(user);
  const getCart = () => {
    navigate(`/cart/${id}`);
  };
  const onActive = () => {
    document.querySelector(".filter").classList.toggle("active");
  };
  return (
    <Navbar expand="lg" className="bg-light" style={{ minHeight: "15vh" }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="" style={{ height: "40px", width: "140px" }} />
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
              {user && (
                <img
                  className="me-2"
                  src={user.profileImage}
                  alt="img"
                  style={{
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                  }}
                />
              )}
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
                      controlId="formGroupNameProfile"
                    >
                      <Form.Label>Name :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={editing ? user.name : editedUser.name}
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupEmailProfile"
                    >
                      <Form.Label>Email :</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={editing ? user.email : editedUser.email}
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupPasswordProfile"
                    >
                      <Form.Label>Password :</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={editing ? user.password : editedUser.password}
                        disabled={editing}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupGenderProfile"
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
                    <Form.Group
                      className="mb-3 w-100"
                      controlId="formGroupDobProfile"
                    >
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
                    <Form.Group className="mb-1 w-75 d-flex">
                      <Form.Label>Upload profile:</Form.Label>
                      <FileBase64 multiple={false} onDone={handleFileUpload} />
                      {editedUser.profileImage && (
                        <img
                          src={editedUser.profileImage}
                          alt="Profile Preview"
                          className="mb-3"
                          style={{ height: "60px", width: "60px" }}
                        />
                      )}
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
