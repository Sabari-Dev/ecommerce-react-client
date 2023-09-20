import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  BiLogoFacebookSquare,
  BiLogoTwitter,
  BiLogoInstagram,
} from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container fluid>
        <Row>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>Email: contact@happyshop.com</p>
            <p>Phone: +91-98400-98400</p>
          </Col>
          <Col md={3}>
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home">FAQs</a>
              </li>
              <li>
                <a href="#home">Shipping & Returns</a>
              </li>
              <li>
                <a href="#home">Privacy Policy</a>
              </li>
              <li>
                <a href="#home">Terms of Service</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Categories</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#home">Electronics</a>
              </li>
              <li>
                <a href="#home">Clothing</a>
              </li>
              <li>
                <a href="#home">Accessories </a>
              </li>
              <li>
                <a href="#home">Jewels</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Connect With Us</h5>
            <div className="social-icons">
              <a href="#home" className="text-light">
                <i className="">
                  <BiLogoFacebookSquare />
                </i>
              </a>
              <a href="#home" className="text-light">
                <i className="">
                  <BiLogoTwitter />
                </i>
              </a>
              <a href="#home" className="text-light">
                <i className="">
                  <BiLogoInstagram />
                </i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
