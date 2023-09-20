import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { BsFillTrash3Fill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cartEmpty from "../images/empty-cart.gif";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const { id } = useParams();
  const cartIsEmpty = cart.length === 0;
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const handleClose = () => {
    setShow(false);
    setErrors({});
  };
  useEffect(() => {
    axios
      .get(`https://hilarious-skirt-moth.cyclic.cloud/api/s1/cart/${id}`)
      .then((res) => {
        setCart(res.data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id, cart]);

  useEffect(() => {
    let cartQty = cart.reduce((acc, all) => acc + all.quantity, 0);
    setTotalQty(cartQty);

    const calculateTotalAmount = (cart) => {
      return cart.reduce((total, item) => {
        const itemSubtotal = item.quantity * item.productId.price;
        return total + itemSubtotal;
      }, 0);
    };
    let total = calculateTotalAmount(cart);
    setTotalPrice(total);
  }, [totalQty, cart, totalPrice]);

  // const handleUpdateQuantity = async (itemId, newQuantity) => {
  //   console.log("Updating quantity:", itemId, newQuantity);
  //   const updatedCart = cart.map((item) => {
  //     if (item.productId._id === itemId) {
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   });
  //   console.log("Updated cart:", updatedCart);
  //   setCart(updatedCart);

  //   await axios
  //     .put(
  //       `https://hilarious-skirt-moth.cyclic.cloud/api/s1/cart/update/${itemId}`,
  //       {
  //         quantity: newQuantity,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("error on update");
  //     });
  // };

  const removeCartItem = (itemId) => {
    axios
      .delete(
        `https://hilarious-skirt-moth.cyclic.cloud/api/s1/cart/remove/${itemId}`
      )
      .then((response) => {
        console.log("Product removed from cart:", response.data);
        toast.success("product removed");
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
        toast.error("error");
      });
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.cardName) {
      newErrors.cardName = "Name on card is required";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckOut = () => {
    if (validateForm()) {
      axios
        .delete(
          `https://hilarious-skirt-moth.cyclic.cloud/api/s1/cart/delete/${id}`
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Payment proceeded!");
          handleClose();
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting cart:", error);
          toast.error("Error on payment");
        });
    } else {
      toast.error("error");
    }
  };
  const backHome = () => {
    navigate(`/home/${id}`);
  };

  return (
    <div>
      {loading || !cart.length ? (
        <div className="w-100 text-center">
          {/* <Loading /> */}
          <img
            src={cartEmpty}
            alt="emptyCart"
            style={{ height: "250px", width: "400px" }}
          />
          <h3>Cart is Empty</h3>
          <Button variant="warning" onClick={backHome}>
            Back to Home
          </Button>
        </div>
      ) : (
        <div className="cart-page">
          <Row>
            <Col xs={12} lg={7}>
              <div className="cart-prod ">
                {cartIsEmpty ? (
                  <p>cart empty</p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex border border-2 gap-3 my-2 p-3 rounded ms-2 "
                      style={{ height: "200px" }}
                    >
                      <div className="img my-auto w-25">
                        <img
                          variant="top"
                          src={item.productId.image}
                          height="100px"
                          width="100px"
                        />
                      </div>

                      <div className="content my-auto">
                        <h5 className="mt-2">
                          {item.productId.title.substring(0, 35)}...
                        </h5>
                        {/* <Form.Group className="d-flex align-items-center mt-2">
                      <Button
                        variant="warning"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        max="15"
                        value={item.quantity}
                        className="w-25 text-center"
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.productId._id,
                            Math.min(15, Math.max(1, e.target.value))
                          )
                        }
                      />
                      <Button
                        variant="warning"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </Button>
                    </Form.Group> */}
                        <div className="quantity text-secondary">
                          Quantity : {item.quantity}
                        </div>

                        <h5 className="text-success mt-2">
                          $.{item.productId.price}
                        </h5>
                        <Button
                          variant="danger"
                          onClick={() => removeCartItem(item._id)}
                        >
                          Remove <BsFillTrash3Fill />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Col>
            <Col xs={12} lg={5}>
              <div
                className="total-page border border-2 rounded mx-2 mt-2"
                style={{ height: "250px" }}
              >
                <Table width={"100%"} bordered>
                  <tr>
                    <th className="p-3">Total products</th>
                    <th>:</th>
                    <td>{cart.length}</td>
                  </tr>
                  <tr className="mt-2">
                    <th className="p-3">Total Quantity</th>
                    <th>:</th>
                    <td>{totalQty}</td>
                  </tr>
                  <tr className="mt-2">
                    <th className="p-3"> Total Price </th>
                    <th>:</th>
                    <td>{`$.${totalPrice.toFixed(2)}`}</td>
                  </tr>
                </Table>

                <Button variant="primary" className="ms-2" onClick={handleShow}>
                  Make Payment
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Payment page</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form className="text-start w-75">
                      <Form.Group controlId="cardNumber">
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your card number"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cardNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="cardName">
                        <Form.Label>Name on Card</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter the name on the card"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cardName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cardName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="expiryDate">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          isInvalid={!!errors.expiryDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.expiryDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="cvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          isInvalid={!!errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      cancel
                    </Button>
                    <Button variant="primary" onClick={handleCheckOut}>
                      Proceed to Payment
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Cart;
