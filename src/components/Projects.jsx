import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp2 from "../assets/img/color-sharp2.png";

const ProjectCard = ({ title, description, stack, status, link }) => {
  return (
    <div className="project-box">
      <h4>{title}</h4>
      {status && <span className="status">{status}</span>}
      <p>{description}</p>
      {stack && (
        <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
          <strong>Stack:</strong> {stack}
        </p>
      )}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>
          Live Demo
        </a>
      )}
    </div>
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
    {
      title: "Gemini Clone",
      description: "AI chatbot clone inspired by Google Gemini using Google’s Generative Language API.",
      stack: "React, Vite, Gemini API",
    },
    {
      title: "Joke Generator App",
      description: "Fetches and displays jokes using the JokeAPI for entertainment.",
      stack: "React, JokeAPI",
    },
    {
      title: "FoodLens",
      description: "A mobile app that helps users identify food items and provides nutritional insights.",
      stack: "React, Capacitor",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio site to showcase projects, skills, and contact information.",
      stack: "React, Bootstrap, Vite",
    },
    {
      title: "News App",
      description: "Displays the latest news articles by fetching data from NewsAPI.",
      stack: "React, NewsAPI",
    },
    {
      title: "AI Image Generator",
      description: "Generates AI images from text prompts using Hugging Face models.",
      stack: "React, Hugging Face API",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <div>
              <h2>Projects</h2>
              <p>A selection of my recent works, ranging from complex full-stack applications to focused technical experiments.</p>
              <Tab.Container id="projects-tabs" defaultActiveKey="first">
                <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="first" id="projects-tabs-tab-first">Main Projects</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" id="projects-tabs-tab-second">Mini Projects</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content id="slideInUp">
                  <Tab.Pane eventKey="first">
                    <Carousel 
                      responsive={responsive} 
                      infinite={true} 
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      className="project-slider"
                    >
                      {projects.map((project, index) => (
                        <div key={index} className="px-2 h-100">
                          <ProjectCard {...project} />
                        </div>
                      ))}
                    </Carousel>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Carousel 
                      responsive={responsive} 
                      infinite={true} 
                      autoPlay={true}
                      autoPlaySpeed={3000}
                      className="project-slider"
                    >
                      {miniProjects.map((project, index) => (
                        <div key={index} className="px-2 h-100">
                          <ProjectCard {...project} />
                        </div>
                      ))}
                    </Carousel>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
};

export default Projects;
