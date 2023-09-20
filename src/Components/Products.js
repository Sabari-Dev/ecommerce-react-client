import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "./Rating";

const Products = ({ product, userId, index }) => {
  const navigate = useNavigate();

  const getId = (id) => {
    navigate(`/${userId}/product/${id}`);
  };
  return (
    <Card
      style={{ width: "18rem" }}
      key={index}
      className="p-2 text-center mx-auto"
    >
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: "150px", width: "150px" }}
        className="m-auto"
      />
      <hr />
      <Card.Body className="pt-1">
        <Card.Title>{product.title.substring(0, 20)}...</Card.Title>
        <Card.Text className=" mb-1 text-success">{`$ . ${product.price}`}</Card.Text>
        <Card.Text className=" mb-2">
          <Rating
            rate={product.rating.rate}
            id={product._id}
            key={product._id}
          />
        </Card.Text>
        <Button
          variant="warning"
          className="m-auto px-4"
          onClick={() => getId(product._id)}
        >
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Products;
