import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { useParams } from "react-router-dom";
import NavPage from "./NavPage";
import Products from "./Products";
import Loading from "./Loading";
import Form from "react-bootstrap/Form";
import { FaFilter } from "react-icons/fa";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Footer from "./Footer";
import { Row, Col } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState(false); // Changed to a boolean
  const [priceFilter, setPriceFilter] = useState(false); // Changed to a boolean
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://hilarious-skirt-moth.cyclic.cloud/api/s1/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const applyFilters = () => {
    let filteredProducts = [...products];

    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (ratingFilter) {
      filteredProducts = _.orderBy(filteredProducts, ["rating.rate"], ["desc"]);
    }

    if (priceFilter) {
      filteredProducts = _.orderBy(filteredProducts, ["price"], ["asc"]);
    }

    return filteredProducts;
  };

  const clearFilters = () => {
    setSearch("");
    setRatingFilter(false);
    setPriceFilter(false);
    setCategoryFilter("All");
    setProducts([...products]);
  };

  return (
    <>
      <div className="home-page" id="home">
        <NavPage />
      </div>
      <div className="filter" style={{ minHeight: "10vh" }}>
        <Navbar className="bg-body-tertiary" style={{ minHeight: "10vh" }}>
          <Row>
            <Col xs={10} lg={4}>
              <Navbar.Brand href="#home">
                Filter <FaFilter />
              </Navbar.Brand>
            </Col>
            <Col xs={10} lg={4}>
              <Navbar.Collapse>
                <Form.Control
                  type="search"
                  placeholder="Search products"
                  className="me-2 ms-3 my-2 w-100"
                  style={{ width: "400px" }}
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Navbar.Collapse>
            </Col>
            <Col xs={10} lg={4}>
              <Navbar.Collapse
                className="justify-content-end gap-3"
                style={{ width: "400px" }}
              >
                <Form.Check
                  name="filters"
                  label="Rating"
                  onChange={(e) => setRatingFilter(e.target.checked)}
                />
                <Form.Check
                  name="filters"
                  label="Price"
                  onChange={(e) => setPriceFilter(e.target.checked)}
                />
                <Form.Select
                  aria-label="Default select example"
                  className="border border-warning border-2"
                  style={{ width: "150px" }}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                  }}
                  value={categoryFilter}
                >
                  <option value="All">Category</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="women's clothing">women's clothing</option>
                  <option value="jewelery">jewelery</option>
                  <option value="electronics">electronics</option>
                </Form.Select>
                <Button variant="outline-danger" onClick={clearFilters}>
                  Clear
                </Button>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Navbar>
      </div>
      <div className="products d-flex flex-wrap gap-3 mt-3 ">
        {loading ? (
          <Loading />
        ) : (
          applyFilters().map((product, index) => (
            <Products product={product} index={index} userId={id} />
          ))
        )}
      </div>
      <div className="footers">
        <Footer />
      </div>
    </>
  );
};

export default Home;
