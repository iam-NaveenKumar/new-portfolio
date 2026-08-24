import { Container, Row, Col, Modal } from "react-bootstrap";
import { useState } from 'react';
import { motion } from 'framer-motion';
import proofImg from '../assets/img/publications/proof.png';

const PublicationCard = ({ title, conference, details, link }) => {
  const [showProof, setShowProof] = useState(false);

  return (
    <motion.div
      className="publication-box h-100"
      whileHover={{ y: -5 }}
    >
      <div style={{ flex: 1 }}>
        <h4 className="publication-title">{title}</h4>

        <div style={{ marginBottom: '20px' }}>
          <p className="publication-conference">
            {conference}
          </p>
        </div>

        <ul className="publication-details">
          {details.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-3">
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="publication-link"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Show publication</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: '2px' }}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </motion.a>

        <motion.button
          onClick={() => setShowProof(true)}
          className="publication-link"
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.5)', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>View Proof</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </motion.button>
      </div>

      <Modal show={showProof} onHide={() => setShowProof(false)} size="lg" centered>
        <Modal.Header closeButton closeVariant="white" style={{ background: '#121212', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Modal.Title style={{ color: '#fff' }}>Publication Proof</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 text-center" style={{ background: '#121212' }}>
          <img src={proofImg} alt="Publication Proof" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </motion.div>
  );
};

export const Publications = () => {
  const publication = {
    title: "Quantum-Inspired Adaptive AI Tutor for Personalised Learning - A quiz driven knowledge framework",
    conference: "Presented at the 1st International Conference on Quantum Innovations for Computing and Knowledge Systems (QUICK’26) — Organized by Vellore Institute of Technology (VIT), Chennai in collaboration with Deakin University, Australia | March 2026.",
    details: [
      "Proposed adaptive learning architecture combining learner-state modelling with AI-driven content generation.",
      "Explored optimisation strategies for personalised quiz sequencing and instructional flow.",
      "Documented system design approach and experimental evaluation observations."
    ],
    link: "https://doi.org/10.1051/epjconf/202636001020"
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="publications" id="publications" data-component="Publications" style={{ paddingTop: '100px', paddingBottom: '100px', position: 'relative' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '800' }}>Publications</motion.h2>
              <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 50px' }}>
                Contributing to the academic community through research in AI and Quantum Computing.
              </motion.p>

              <Row className="justify-content-center">
                <Col md={10} lg={8}>
                  <motion.div variants={itemVariants}>
                    <PublicationCard {...publication} />
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Publications;
