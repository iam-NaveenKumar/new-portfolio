import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.jpg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img
              src={logo}
              alt="Logo"
              style={{ borderRadius: "50%", height: "4rem", width: "4rem" }}
            />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/naveen-kumar-p-492020290/">
                <img src={navIcon1} alt="Icon" />
              </a>
              <a href="https://github.com/iam-NaveenKumar">
                <img src={navIcon2} alt="Icon" />
              </a>
              <a href="https://www.instagram.com/_i.am.naveen_/">
                <img src={navIcon3} alt="Icon" />
              </a>
            </div>
            <p>Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
