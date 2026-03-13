import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp2 from "../assets/img/color-sharp2.png";
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, stack, status, link }) => {
  return (
    <motion.div 
      className="project-box h-100"
      whileHover={{ y: -5 }}
      style={{ 
        background: 'var(--glass-bg)', 
        backdropFilter: 'var(--glass-blur)', 
        border: '1px solid var(--glass-border)',
        padding: '30px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <div style={{ flex: 1 }}>
        <h4 style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '1.4rem' }}>{title}</h4>
        {status && <span className="status" style={{ 
          background: 'rgba(255, 105, 180, 0.1)', 
          color: 'hotpink', 
          border: '1px solid rgba(255, 105, 180, 0.2)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          display: 'inline-block',
          marginBottom: '10px'
        }}>{status}</span>}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{description}</p>
      </div>
      <div>
        {stack && (
          <p style={{ fontSize: "0.85rem", color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-main)' }}>Stack:</strong> {stack}
          </p>
        )}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ 
            color: "var(--accent-color)", 
            textDecoration: "none", 
            fontWeight: '600',
            display: 'inline-block',
            marginTop: '10px'
          }}>
            Live Demo →
          </a>
        )}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
  };

  const projects = [
    {
      title: "AI-Powered Learning Tutor",
      description: "Adaptive AI tutor generating lessons, quizzes, and summaries based on learner level. Focused on caching and AI orchestration.",
      stack: "React, Node.js, Firebase, Gemini 2.0, Llama 3.1",
      status: "🔧 Undergoing Project",
    },
    {
      title: "Anonymous Chat Web App",
      description: "Real-time anonymous messaging platform with guest login and responsive UI. Optimized message rendering.",
      stack: "React, Firebase",
      link: "https://anonymouschat007.web.app/",
    },
    {
      title: "Medicine Reminder App",
      description: "Cross-platform mobile app with scheduled notifications and persistent reminder tracking using Capacitor.",
      stack: "React, Capacitor, Local Notifications",
    },
  ];

  const miniProjects = [
    { title: "Gemini Clone", description: "AI chatbot clone inspired by Google Gemini.", stack: "React, Vite, Gemini API" },
    { title: "Joke Generator App", description: "Fetches and displays jokes using the JokeAPI.", stack: "React, JokeAPI" },
    { title: "FoodLens", description: "A mobile app that helps users identify food items.", stack: "React, Capacitor" },
    { title: "News App", description: "Displays the latest news articles using NewsAPI.", stack: "React, NewsAPI" },
    { title: "AI Image Generator", description: "Generates AI images using Hugging Face models.", stack: "React, Hugging Face API" },
  ];

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
                    <Carousel responsive={responsive} infinite={true} autoPlay={true} className="project-slider">
                      {projects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          className="px-2 h-100"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <ProjectCard {...project} />
                        </motion.div>
                      ))}
                    </Carousel>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Carousel responsive={responsive} infinite={true} autoPlay={true} className="project-slider">
                      {miniProjects.map((project, index) => (
                        <motion.div 
                          key={index} 
                          className="px-2 h-100"
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <ProjectCard {...project} />
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
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};

export default Projects;
