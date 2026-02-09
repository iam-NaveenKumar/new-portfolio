import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const mainProjects = [
    {
      title: "AI-Powered Learning Tutor",
      description: "Developing adaptive AI tutor generating lessons, quizzes, and summaries based on learner level. Focused on caching strategies and cost-efficient API workflows. Designed dynamic prompt structures to generate level-based explanations and quizzes.",
      tech: "React, Flask, OpenAI API, TensorFlow",
      imgUrl: "", // Assuming no image update requested, will leave blank or use placeholder if Card component expects it. 
      // Wait, the original code didn't use a ProjectCard component with props, it hardcoded the HTML.
      // I should stick to the existing pattern or introduce a ProjectCard component if it exists.
      // Checking imports: `import { Container, Row, Col, Tab, Nav } from "react-bootstrap";`
      // There was NO ProjectCard import in the original file I read.
      // But looking at the original file content again...
      // line 45: <div className="project-box"> ... </div>
      // It seems it was hardcoded.
      // I will reproduce the hardcoded structure to avoid breaking things if I don't have the CSS for a new component.
    } 
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Projects</h2>
                  <p>My recent work, featuring AI-powered applications, web development, and mobile apps.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="main">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="main">Main Projects</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="mini">Mini Projects</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="about">About</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="main">
                        <Row>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>AI-Powered Learning Tutor</h4>
                              <span className="status">
                                🔧 Undergoing Project
                              </span>
                              <p>
                                Developing adaptive AI tutor generating lessons, quizzes, and summaries based on learner level.
                                <br />
                                Focused on caching strategies and cost-efficient API workflows.
                                <br />
                                Designed dynamic prompt structures to generate level-based explanations and quizzes.
                              </p>
                              <strong>Tech:</strong> React, Flask, OpenAI API, TensorFlow
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Anonymous Chat Web Application</h4>
                              <p>
                                Built real-time anonymous messaging platform with guest login and responsive UI.
                                <br />
                                Optimized message rendering and state updates to maintain smooth real-time user interaction.
                              </p>
                              <strong>Tech:</strong> React, Firebase
                              <br />
                              <a href="https://anonymouschat007.web.app/" target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "underline" }}>Live Demo</a>
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Medicine Reminder Mobile App</h4>
                              <p>
                                Cross-platform mobile app with scheduled notifications and persistent reminder tracking.
                                <br />
                                Implemented local notifications using Capacitor plugins for scheduled alerts.
                              </p>
                              <strong>Tech:</strong> React, Capacitor, Local Notifications
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="mini">
                        <Row>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Gemini Clone (Chatbot)</h4>
                              <p>
                                An AI chatbot clone inspired by Google Gemini.
                                It interacts with users, provides responses
                                using Google’s Generative Language API.
                              </p>
                              <strong>Tech:</strong> React, Vite, Gemini API
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Joke Generator App</h4>
                              <p>
                                Fetches and displays jokes using the JokeAPI for
                                entertainment.
                              </p>
                              <strong>Tech:</strong> React, JokeAPI
                            </div>
                          </Col>
                           <Col md={4}>
                            <div className="project-box">
                              <h4>FoodLens</h4>
                              <p>
                                A mobile app that helps users identify food items and provides nutritional insights.
                              </p>
                              <strong>Tech:</strong> React, Capacitor
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Portfolio Website</h4>
                              <p>
                                A personal portfolio site to showcase projects,
                                skills, and contact information.
                              </p>
                              <strong>Tech:</strong> React, Bootstrap, Vite
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>News App</h4>
                              <p>
                                Displays the latest news articles by fetching
                                data from NewsAPI.
                              </p>
                              <strong>Tech:</strong> React, NewsAPI
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>AI Image Generator</h4>
                              <p>
                                Generates AI images from text prompts using Hugging Face models.
                              </p>
                              <strong>Tech:</strong> React, Hugging Face API
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="about">
                        <p>
                          I am a passionate developer who loves building applications that solve real-world problems. 
                          Check out my main projects for complex systems and mini projects for fun experiments!
                        </p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt="Background"
      />
    </section>
  );
};
