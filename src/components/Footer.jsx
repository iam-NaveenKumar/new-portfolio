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
    <footer className="footer" style={{ padding: '40px 0', background: 'var(--primary-bg)', borderTop: '1px solid var(--glass-border)' }}>
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="align-items-center">
            <Col size={12} sm={8} className="d-flex align-items-center gap-4 footer-main-col" as={motion.div} variants={itemVariants}>
              <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <motion.img
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  src={logo}
                  alt="Logo"
                  style={{ borderRadius: "50%", height: "4.5rem", width: "4.5rem", border: "2px solid var(--accent-color)", cursor: "pointer", boxShadow: "0 0 15px rgba(170, 54, 124, 0.3)" }}
                />
              </a>
              <div className="footer-text-block">
                <h4>Did you try my CLI yet? No?</h4>
                <p>Click the button on the right →</p>
              </div>
            </Col>
           
          </Row>
        </motion.div>
      </Container>
    </footer>
  );
};
