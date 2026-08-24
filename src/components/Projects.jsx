import { Container, Row, Col, Tab, Nav, Modal } from "react-bootstrap";
import { useState } from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp2 from "../assets/img/color-sharp2.png";
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProjectCard = ({ title, description, stack, status, link, apkLink, onClick, folder }) => {
  return (
    <motion.div 
      className="project-box h-100"
      whileHover={{ y: -5 }}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ flex: 1 }}>
        <h4 className="project-title">{title}</h4>
        {status && <span className="status-tag">{status}</span>}
        <p className="project-description">{description}</p>
      </div>
      <div className="project-footer">
        {stack && (
          <p className="project-stack">
            <strong>Stack:</strong> {stack}
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center">
          {folder && <span className="gallery-hint">View Gallery →</span>}
          <div className="d-flex gap-3">
            {apkLink && (
              <a href={apkLink} download className="project-link apk-link" onClick={(e) => e.stopPropagation()}>
                Download APK ↓
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="project-link" onClick={(e) => e.stopPropagation()}>
                Live Demo →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Load all images from the projects folder
  const projectImages = import.meta.glob('../assets/img/projects/**/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

  const getProjectImages = (folder) => {
    if (!folder) return [];
    return Object.keys(projectImages)
      .filter(path => path.includes(`/projects/${folder}/`))
      .sort((a, b) => {
        // Sort numerically (img1, img2, etc)
        const aNum = parseInt(a.match(/img(\d+)/)?.[1] || 0);
        const bNum = parseInt(b.match(/img(\d+)/)?.[1] || 0);
        return aNum - bNum;
      })
      .map(path => projectImages[path]);
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
  };

  const projects = [
    {
      title: "Travel Tracking App",
      description: "A React Native & Expo app that tracks GPS location in the background (even when locked). It uses the Haversine formula to calculate distance and automatically triggers the system call dialer and a high-priority notification to alert family when approaching a destination. Built with TypeScript, expo-location, and AsyncStorage.",
      stack: "React Native, Expo, TypeScript, expo-location, AsyncStorage",
      folder: "travel-tracker",
      apkLink: "/travel-tracker.apk"
    },
    {
      title: "AI-Powered Learning Tutor",
      description: "Adaptive AI tutor generating lessons, quizzes, and summaries based on learner level. Focused on caching and AI orchestration.",
      stack: "React, Node.js, Firebase, Gemini 2.0, Llama 3.1",
      status: "🔧 Undergoing Project",
      folder: "ai-tutor"
    },
    {
      title: "Anonymous Chat Web App",
      description: "Real-time anonymous messaging platform with guest login and responsive UI. Optimized message rendering.",
      stack: "React, Firebase",
      link: "https://anonymouschat007.web.app/",
      folder: "anonymous-chat"
    },
    {
      title: "Medicine Reminder App",
      description: "Cross-platform mobile app with scheduled notifications and persistent reminder tracking using Capacitor.",
      stack: "React, Capacitor, Local Notifications",
    },
    {
      title: "Smart Home Network Monitor",
      description: "Built a real-time network monitoring dashboard to track internet latency, uptime, and connected devices. Implemented ARP-based device scanning, unknown device alerts, and Telegram notifications for network events. Developed responsive Flask dashboard with live charts and device management features.",
      stack: "Python, Flask, SQLite, Scapy",
      folder: "network-monitor"
    },
  ];

  const miniProjects = [
    { title: "CI/CD Pipeline", description: "a CI/CD pipeline where a developer pushes code to GitHub. GitHub Actions runs tests on a self-hosted PC runner. If tests fail, deployment stops; if they pass, the app is deployed using PM2 and runs a Node.js/Express server on localhost:3000.", stack: "GitHub Actions, PM2, Node.js", folder: "ci-cd" },
    { title: "Gemini Clone", description: "AI chatbot clone inspired by Google Gemini.", stack: "React, Vite, Gemini API" },
    { title: "Joke Generator App", description: "Fetches and displays jokes using the JokeAPI.", stack: "React, JokeAPI" },
    { title: "FoodLens", description: "A mobile app that helps users identify food items.", stack: "React, Capacitor" },
    { title: "News App", description: "Displays the latest news articles using NewsAPI.", stack: "React, NewsAPI" },
    { title: "AI Image Generator", description: "Generates AI images using Hugging Face models.", stack: "React, Hugging Face API" },
    { title: "Rock Paper Scissors Game with Autoplay", description: "Built an interactive browser-based game with autoplay functionality and score tracking. Implemented dynamic UI updates and game logic using JavaScript.", stack: "HTML, CSS, JavaScript" },
  ];

  const containerVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
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
    <section className="project" id="projects" data-component="Projects">
      <Container>
        <Row>
          <Col xs={12}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={itemVariants} style={{ textAlign: 'center' }}>Projects</motion.h2>
              <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '20px auto' }}>
                A selection of my recent works, ranging from complex full-stack applications to focused technical experiments.
              </motion.p>
              <Tab.Container id="projects-tabs" defaultActiveKey="first">
                <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Main Projects</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Mini Projects</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Carousel responsive={responsive} infinite={true} autoPlay={!selectedProject} className="project-slider" partialVisible={false} centerMode={false}>
                      {projects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          className="px-2 h-100"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <ProjectCard 
                            {...project} 
                            onClick={() => {
                              if (project.folder) {
                                setSelectedProject(project);
                                setActiveImgIndex(0);
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </Carousel>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Carousel responsive={responsive} infinite={true} autoPlay={!selectedProject} className="project-slider" partialVisible={false} centerMode={false}>
                      {miniProjects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          className="px-2 h-100"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <ProjectCard 
                            {...project} 
                            onClick={() => {
                              if (project.folder) {
                                setSelectedProject(project);
                                setActiveImgIndex(0);
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </Carousel>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Modal 
        show={!!selectedProject} 
        onHide={() => setSelectedProject(null)}
        size="lg"
        centered
        className="project-gallery-modal"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedProject?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 overflow-hidden">
          <div className="gallery-container">
            <div className="main-image-wrapper">
              <button 
                className="gallery-nav-btn prev" 
                onClick={(e) => {
                  e.stopPropagation();
                  const imgs = getProjectImages(selectedProject?.folder);
                  setActiveImgIndex((prev) => (prev - 1 + imgs.length) % imgs.length);
                }}
              >
                <FiChevronLeft />
              </button>

              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImgIndex}
                  src={getProjectImages(selectedProject?.folder)[activeImgIndex]} 
                  alt="Project Screenshot"
                  className="img-fluid main-gallery-img"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <button 
                className="gallery-nav-btn next" 
                onClick={(e) => {
                  e.stopPropagation();
                  const imgs = getProjectImages(selectedProject?.folder);
                  setActiveImgIndex((prev) => (prev + 1) % imgs.length);
                }}
              >
                <FiChevronRight />
              </button>
            </div>
            
            <div className="thumbnail-strip-wrapper">
              <div className="thumbnail-strip">
                {getProjectImages(selectedProject?.folder).map((img, idx) => (
                  <div 
                    key={idx}
                    className={`thumbnail-item ${idx === activeImgIndex ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};

export default Projects;
