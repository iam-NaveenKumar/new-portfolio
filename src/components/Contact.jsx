import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from 'framer-motion';

export const Contact = () => {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    try {
      let response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });
      let result = await response.json();
      setFormDetails(formInitialDetails);
      if (result.code === 200) {
        setStatus({ success: true, message: "Message sent successfully" });
      } else {
        setStatus({ success: false, message: "Something went wrong, please try again later." });
      }
    } catch (error) {
      setStatus({ success: false, message: "Failed to send message. Please try again." });
    }
    setButtonText("Send");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="contact" id="connect" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <motion.div 
              className="contact-bx"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ 
                padding: '60px 40px', 
                background: 'var(--glass-bg)', 
                backdropFilter: 'var(--glass-blur)', 
                border: '1px solid var(--glass-border)',
                borderRadius: '30px'
              }}
            >
              <motion.h2 variants={itemVariants} style={{ textAlign: 'center', marginBottom: '15px', fontWeight: '800' }}>Let's Build Something Great</motion.h2>
              <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                Feel free to reach out for collaborations or just a friendly hello.
              </motion.p>
              <form onSubmit={handleSubmit}>
                <Row className="g-4">
                  <Col sm={6} as={motion.div} variants={itemVariants}>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: 'var(--accent-color)' }}
                      type="text"
                      value={formDetails.firstName}
                      placeholder="First Name"
                      onChange={(e) => onFormUpdate("firstName", e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', padding: '15px 20px', borderRadius: '15px', width: '100%' }}
                    />
                  </Col>
                  <Col sm={6} as={motion.div} variants={itemVariants}>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: 'var(--accent-color)' }}
                      type="text"
                      value={formDetails.lastName}
                      placeholder="Last Name"
                      onChange={(e) => onFormUpdate("lastName", e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', padding: '15px 20px', borderRadius: '15px', width: '100%' }}
                    />
                  </Col>
                  <Col sm={6} as={motion.div} variants={itemVariants}>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: 'var(--accent-color)' }}
                      type="email"
                      value={formDetails.email}
                      placeholder="Email Address"
                      onChange={(e) => onFormUpdate("email", e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', padding: '15px 20px', borderRadius: '15px', width: '100%' }}
                    />
                  </Col>
                  <Col sm={6} as={motion.div} variants={itemVariants}>
                    <motion.input
                      whileFocus={{ scale: 1.02, borderColor: 'var(--accent-color)' }}
                      type="tel"
                      value={formDetails.phone}
                      placeholder="Phone No."
                      onChange={(e) => onFormUpdate("phone", e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', padding: '15px 20px', borderRadius: '15px', width: '100%' }}
                    />
                  </Col>
                  <Col xs={12} as={motion.div} variants={itemVariants}>
                    <motion.textarea
                      whileFocus={{ scale: 1.01, borderColor: 'var(--accent-color)' }}
                      rows="5"
                      value={formDetails.message}
                      placeholder="Your Message"
                      onChange={(e) => onFormUpdate("message", e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', color: '#fff', padding: '15px 20px', borderRadius: '15px', width: '100%', resize: 'none' }}
                    />
                  </Col>
                  <Col xs={12} className="text-center" as={motion.div} variants={itemVariants}>
                    <motion.button 
                      type="submit"
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(170, 54, 124, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      style={{ 
                        background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '16px 60px', 
                        borderRadius: '50px', 
                        fontSize: '1.1rem', 
                        fontWeight: '700',
                        letterSpacing: '1px'
                      }}
                    >
                      <span>{buttonText}</span>
                    </motion.button>
                  </Col>
                  {status.message && (
                    <Col xs={12} className="mt-4 text-center">
                      <p className={status.success === false ? "text-danger" : "text-success"} style={{ fontWeight: '500' }}>{status.message}</p>
                    </Col>
                  )}
                </Row>
              </form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
