import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { BsFillTrash3Fill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import Table from "react-bootstrap/Table";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const { id } = useParams();
  const cartIsEmpty = cart.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/s1/cart/${id}`)
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

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    console.log("Updating quantity:", itemId, newQuantity);
    const updatedCart = cart.map((item) => {
      if (item.productId._id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    console.log("Updated cart:", updatedCart);
    setCart(updatedCart);

    await axios
      .put(`http://localhost:5000/api/s1/cart/update/${itemId}`, {
        quantity: newQuantity,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("error on update");
      });
  };

  const removeCartItem = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/s1/cart/remove/${itemId}`)
      .then((response) => {
        console.log("Product removed from cart:", response.data);
        toast.success("product removed");
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
        toast.error("error");
      });
  };

  const handleCheckOut = () => {
    axios
      .delete(`http://localhost:5000/api/s1/cart/delete/${id}`)
      .then((response) => {
        console.log("Cart deleted:", response.data);
        // Implement additional logic, such as updating the UI
        toast.success("Cart deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting cart:", error);
        toast.error("Error deleting cart");
      });
  };
  const backHome = () => {
    navigate(`/home/${id}`);
  };

  return (
    <div>
      {loading ? (
        <div className="w-100 text-center">
          <Loading />
          <h3>Cart is Empty</h3>
          <Button variant="warning" onClick={backHome}>
            Back to Home
          </Button>
        </div>
      ) : (
        <div className="cart-page d-flex">
          <div className="cart-prod w-50">
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
                    <Form.Group className="d-flex align-items-center mt-2">
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
                    </Form.Group>

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
          <div
            className="total-page border border-2 rounded w-50 mx-2 mt-2"
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
                <td>{`$.${totalPrice}`}</td>
              </tr>
            </Table>

            <Button variant="primary" className="ms-2" onClick={handleCheckOut}>
              Check Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
