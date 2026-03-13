import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/Naveen-port.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="footer" style={{ padding: '60px 0', background: 'var(--primary-bg)', borderTop: '1px solid var(--glass-border)' }}>
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <a href="/" onClick={() => window.location.reload()}>
              <motion.img
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                src={logo}
                alt="Logo"
                style={{ borderRadius: "50%", height: "4rem", width: "4rem", border: "1px solid var(--glass-border)", cursor: "pointer" }}
              />
            </a>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/naveen-kumar-p-492020290/">
                <img src={navIcon1} alt="Icon" />
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="https://github.com/iam-NaveenKumar">
                <img src={navIcon2} alt="Icon" />
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="https://www.instagram.com/_i.am.naveen_/">
                <img src={navIcon3} alt="Icon" />
              </motion.a>
            </div>
            <p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>Copyright 2025. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
