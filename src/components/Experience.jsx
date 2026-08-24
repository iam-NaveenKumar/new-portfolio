import { Container, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiFileText, FiAward } from 'react-icons/fi';

export const Experience = () => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Load all images from the credentials folder
  const credentialImages = import.meta.glob('../assets/img/credentials/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

  const getCredentials = (folder) => {
    if (!folder) return [];
    return Object.keys(credentialImages)
      .filter(path => path.includes(`/credentials/${folder}/`))
      .map(path => ({
        url: credentialImages[path],
        name: path.includes('lor') ? 'Letter of Recommendation' : 'Completion Certificate'
      }));
  };

  const experiences = [
    {
      title: "Product Engineering Intern",
      company: "CODEGRAMMER",
      duration: "Jan 2026 – Mar 2026",
      folder: "codegrammer",
      description: [
        "Developed structured video-based learning content using HTML, CSS, and JavaScript by converting provided transcripts and audio into interactive lessons.",
        "Built a WordPress plugin to connect recruiters and students, enabling job posting and application workflows.",
        "Integrated resume submission flow by leveraging an external resume-generation plugin for streamlined applications.",
        "Conducted product reviews of the platform, providing regular feedback and suggesting improvements to enhance usability and workflow."
      ]
    },
    {
      title: "Frontend Developer Intern",
      company: "CODEHUNTERS",
      duration: "June 2025 – July 2025",
      folder: "codehunters",
      description: [
        "Built reusable React.js UI components based on design specs.",
        "Participated in code reviews and improved layout responsiveness.",
        "Collaborated with the team to integrate frontend with backend APIs."
      ]
    },
    {
      title: "Full stack developer Intern",
      company: "MindFulAI Technologies",
      duration: "June 2026 – July 2026",
      folder: "MindfulAI",
      description: [
        "Developed a Hospital Waste Management System as a full-stack web application.",
        "Implemented JWT authentication for secure user login and access control.",
        "Used MongoDB for storing and managing hospital waste-related data.",
        "Designed the system to improve waste collection and disposal management"
      ]
    }
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
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
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="experience" id="experience" data-component="Experience">
      <Container>
        <Row>
          <Col size={12}>
            <motion.div
              className="experience-bx"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants}>Experience</motion.h2>
              <motion.p variants={itemVariants}>My internship experiences.</motion.p>
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3500}
                className="experience-slider"
                itemClass="px-2"
                partialVisible={false}
                centerMode={false}
              >
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="experience-card"
                    variants={itemVariants}
                  >
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                    <span className="duration">{exp.duration}</span>
                    <ul>
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="credential-btns">
                      {getCredentials(exp.folder).map((cred, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05, background: 'rgba(170, 54, 124, 0.2)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedExp(exp);
                            setActiveImgIndex(i);
                          }}
                          className="cred-btn"
                        >
                          {cred.name.includes('LOR') ? <FiFileText /> : <FiAward />}
                          <span>{cred.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </Carousel>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={!!selectedExp}
        onHide={() => setSelectedExp(null)}
        size="lg"
        centered
        className="credential-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedExp?.company} Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 overflow-hidden">
          <div className="gallery-container">
            <div className="main-image-wrapper">
              {getCredentials(selectedExp?.folder).length > 1 && (
                <button
                  className="gallery-nav-btn prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    const creds = getCredentials(selectedExp?.folder);
                    setActiveImgIndex((prev) => (prev - 1 + creds.length) % creds.length);
                  }}
                >
                  <FiChevronLeft />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImgIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="credential-display"
                >
                  <img
                    src={getCredentials(selectedExp?.folder)[activeImgIndex]?.url}
                    alt="Credential"
                    className="img-fluid"
                  />
                  <div className="credential-label">
                    {getCredentials(selectedExp?.folder)[activeImgIndex]?.name}
                  </div>
                </motion.div>
              </AnimatePresence>

              {getCredentials(selectedExp?.folder).length > 1 && (
                <button
                  className="gallery-nav-btn next"
                  onClick={(e) => {
                    e.stopPropagation();
                    const creds = getCredentials(selectedExp?.folder);
                    setActiveImgIndex((prev) => (prev + 1) % creds.length);
                  }}
                >
                  <FiChevronRight />
                </button>
              )}
            </div>

            {getCredentials(selectedExp?.folder).length > 1 && (
              <div className="thumbnail-strip-wrapper">
                <div className="thumbnail-strip">
                  {getCredentials(selectedExp?.folder).map((cred, idx) => (
                    <div
                      key={idx}
                      className={`thumbnail-item ${idx === activeImgIndex ? 'active' : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                    >
                      <img src={cred.url} alt={`Thumbnail ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
