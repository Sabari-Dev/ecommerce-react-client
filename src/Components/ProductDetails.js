import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { FaShoppingCart } from "react-icons/fa";
import Loading from "./Loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id, userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://hilarious-skirt-moth.cyclic.cloud/api/s1/products/product/${id}`
      )
      .then((res) => {
        setProduct(res.data.data);
        // console.log(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(product);
  const handleIncrement = () => {
    if (quantity < 15) {
      setQuantity(quantity + 1);
    }
  };
  const handleAddToCart = () => {
    let productId = id;
    const data = { userId, productId, quantity };
    // console.log(data);
    axios
      .post("https://hilarious-skirt-moth.cyclic.cloud/api/s1/cart/add", data)
      .then((response) => {
        // console.log("Item added to cart:", response.data);
        toast.success("product add to cart");
        navigate(`/home/${userId}`);
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        toast.error("An error occurred");
      });
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="product-view container w-100 mt-2 border border-3">
          <Row className="mt-4">
            <Col xs={11} lg={6}>
              <div className="prod-img  my-auto mx-auto">
                <img
                  src={product.image}
                  alt="Product image"
                  style={{ height: "400px", width: "400px" }}
                />
              </div>
            </Col>
            <Col xs={11} lg={6}>
              <div className="prod-detail  my-auto">
                <h2 className="text-start">{product.title}</h2>
                <p className="text-secondary">{`Category : ${product.category}`}</p>
                <h4 className="text-success">{`$.${product.price}`}</h4>
                <p>{product.description}</p>
                <i>
                  <Rating rate={product.rating.rate} id={id} />
                </i>
                <Form.Group className="d-flex align-items-center mt-2">
                  <Button variant="warning" onClick={handleDecrement}>
                    -
                  </Button>
                  <Form.Control
                    type="number"
                    min="1"
                    max="15"
                    value={quantity}
                    className="w-25 text-center"
                    onChange={(e) =>
                      setQuantity(Math.min(15, Math.max(1, e.target.value)))
                    }
                  />
                  <Button variant="warning" onClick={handleIncrement}>
                    +
                  </Button>
                </Form.Group>
                <button
                  className="btn btn-warning mt-3"
                  onClick={handleAddToCart}
                >
                  Add to Cart <FaShoppingCart />
                </button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
