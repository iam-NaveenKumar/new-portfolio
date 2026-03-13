import { Container, Row, Col } from "react-bootstrap";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";

import { motion } from 'framer-motion';

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
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="skill" id="skills" data-component="Skills">
      <Container>
        <Row>
          <Col>
            <motion.div 
              className="skills-bx"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ marginTop: '0' }}
            >
              <motion.h2 variants={itemVariants}>Skills</motion.h2>
              <motion.p variants={itemVariants} style={{ color: 'var(--text-muted)' }}>
                A showcase of my technical expertise and the tools I use to bring ideas to life.
              </motion.p>
              <Carousel 
                responsive={responsive} 
                infinite={true} 
                autoPlay={true}
                autoPlaySpeed={3000}
                className="skills-slider"
              >
                {skillsData.map((item, index) => (
                  <div key={index} className="skill-category-card-wrapper">
                    <motion.div 
                      className="skill-category-card h-100" 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      style={{ background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)' }}
                    >
                      <h3 style={{ color: 'var(--accent-color)', marginBottom: '20px', fontWeight: '700' }}>{item.category}</h3>
                      <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                        {item.skills.map((skill, i) => (
                          <motion.span 
                            key={i} 
                            className="skill-tag"
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-color)', color: '#fff' }}
                            style={{ 
                              background: 'rgba(255,255,255,0.05)', 
                              padding: '8px 16px', 
                              borderRadius: '20px', 
                              fontSize: '0.9rem',
                              border: '1px solid var(--glass-border)'
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Carousel>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <img src={colorSharp} alt="" className="background-image-left" />
    </section>
  );
}

export default Skills;
