import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/Naveen-port.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

import { motion } from 'framer-motion';

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <footer className="footer" style={{ padding: '60px 0', background: 'var(--primary-bg)', borderTop: '1px solid var(--glass-border)' }}>
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="align-items-center">
            <Col size={12} sm={6} as={motion.div} variants={itemVariants}>
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
            <Col size={12} sm={6} className="text-center text-sm-end" as={motion.div} variants={itemVariants}>
              <div className="social-icon">
                <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/naveen-kumar-p-492020290/">
                  <img src={navIcon1} alt="Icon" />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="https://www.instagram.com/_i.am.naveen_/">
                  <img src={navIcon3} alt="Icon" />
                </motion.a>
              </div>
              
            </Col>
          </Row>
        </motion.div>
      </Container>
    </footer>
  );
};
