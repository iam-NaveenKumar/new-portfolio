import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
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

                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">React js</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Mobile app</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>AI-Powered Personalized Learning Tutor</h4>
                              <span className="status">
                                🔧 Undergoing Project
                              </span>
                              <p>
                                A smart learning assistant that adapts to
                                student learning pace and style using GPT-based
                                AI.
                              </p>
                              <strong>Tech:</strong> React, Flask, OpenAI API,
                              TensorFlow
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Rock, Paper, Scissors Game</h4>
                              <p>
                                Simple fun browser game where you play Rock,
                                Paper, Scissors against the computer.
                              </p>
                              <strong>Tech:</strong> HTML, CSS, JavaScript
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
                              <h4>AI Image Generator</h4>
                              <p>
                                Generates AI images from text prompts using
                                Hugging Face models and React frontend.
                              </p>
                              <strong>Tech:</strong> React, Hugging Face API
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Joke App</h4>
                              <p>
                                Fetches and displays jokes using the JokeAPI for
                                entertainment.
                              </p>
                              <strong>Tech:</strong> React, JokeAPI
                              (https://v2.jokeapi.dev)
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>Gemini Clone</h4>
                              <p>
                                An AI chatbot clone inspired by Google Gemini.
                                It interacts with users, provides responses
                                using Google’s Generative Language API, and
                                simulates typing effects.
                              </p>
                              <strong>Tech:</strong> React, Vite, Gemini API
                              (Google PaLM/Gemma), CSS
                            </div>
                          </Col>
                          <Col md={4}>
                            <div className="project-box">
                              <h4>News App</h4>
                              <p>
                                Displays the latest news articles by fetching
                                data from NewsAPI, categorized by topics like
                                sports, business, and technology.
                              </p>
                              <strong>Tech:</strong> React, NewsAPI
                              (https://newsapi.org), Bootstrap
                            </div>
                          </Col>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Col md={4}>
                            <div className="project-box">
                              <h4>Medicine Remainder</h4>
                              <p>
                                A mobile app that helps users schedule and get reminders for taking their medicines on time. Designed for daily health management and medication tracking.
                                made it to for my beloved parents .                              
                              </p>
                              <strong>Tech:</strong> React, Capacitor, Local Notifications
                              
                            </div>
                            </Col>
                            <Col md={4}>
                              <div className="project-box">
                              <h4>FoodlLens</h4>
                              <p>
                                A mobile app that helps users identify food items and provides nutritional 
    insights . Designed to promote healthy 
    eating habits and make food tracking effortless.                             
                              </p>
                              <strong>Tech:</strong> React, Capacitor, Local Notifications
                              
                            </div>
                            </Col>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Cumque quam, quod neque provident velit, rem
                          explicabo excepturi id illo molestiae blanditiis,
                          eligendi dicta officiis asperiores delectus quasi
                          inventore debitis quo.
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
