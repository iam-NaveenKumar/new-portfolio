import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

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
              <Carousel 
                responsive={responsive} 
                infinite={true} 
                autoPlay={true}
                autoPlaySpeed={3000}
                className="skills-slider"
              >
                {skillsData.map((item, index) => (
                  <div key={index} className="skill-category-card-wrapper">
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
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      <img src={colorSharp} alt="" className="background-image-left" />
    </section>
  );
}

export default Skills;
