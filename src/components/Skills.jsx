import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";

function Skills() {
  const skillsData = [
    {
      category: "Languages",
      skills: ["Python", "Java", "JavaScript", "SQL"],
    },
    {
      category: "Web Technologies",
      skills: ["HTML", "CSS", "React.js", "Bootstrap", "Node.js"],
    },
    {
      category: "Databases",
      skills: ["MongoDB"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "GitHub", "Firebase", "VS Code"],
    },
    {
      category: "Domains",
      skills: ["Frontend Development", "Backend Fundamentals", "API Integration", "AI Applications"],
    },
  ];

  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skills-bx">
              <h2>Skills</h2>
              <p>
                A comprehensive showcase of my technical expertise across various domains.
              </p>
              <Row className="skills-content justify-content-center">
                {skillsData.map((item, index) => (
                  <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                    <div className="skill-category-card h-100">
                      <h3>{item.category}</h3>
                      <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                        {item.skills.map((skill, i) => (
                          <span key={i} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <img src={colorSharp} alt="" className="background-image-left" />
    </section>
  );
}

export default Skills;
