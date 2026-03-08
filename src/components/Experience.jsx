import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";

export const Experience = () => {
  const experiences = [
    {
      title: "Product Engineering Intern",
      company: "CODEGRAMMER",
      duration: "Jan 2026 – Mar 2026",
      description: [
        "Performed factual accuracy and linguistic audits on large-scale datasets.",
        "Identified inconsistencies and structured QA reports for senior review.",
        "Contributed to improving content reliability for the learning platform."
      ]
    },
    {
      title: "Frontend Developer Intern",
      company: "CODEHUNTERS",
      duration: "June 2025 – July 2025",
      description: [
        "Built reusable React.js UI components based on design specs.",
        "Improved responsive layouts using modern CSS techniques.",
        "Collaborated with the team to integrate frontend with backend APIs."
      ]
    }
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 2 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <section className="experience" id="experience">
      <Container>
        <Row>
          <Col size={12}>
            <div className="experience-bx">
              <h2>Experience</h2>
              <p>My professional journey and internship experiences.</p>
              <Carousel 
                responsive={responsive} 
                infinite={true} 
                autoPlay={true}
                autoPlaySpeed={3500}
                className="experience-slider"
                itemClass="px-2"
              >
                {experiences.map((exp, index) => (
                  <div key={index} className="experience-card">
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                    <span className="duration">{exp.duration}</span>
                    <ul>
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
