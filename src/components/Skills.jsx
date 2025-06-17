import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import colorSharp from "../assets/img/color-sharp.png";

function Skills() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skills-bx">
              <h2>Skills</h2>
              <p>Here are some of the skills I have acquired over the years:</p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="skill-slider"
              >
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={82}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      80%
                    </text>
                  </svg>

                  <h5>HTML</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={82}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      80%
                    </text>
                  </svg>

                  <h5>CSS</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={82}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      80%
                    </text>
                  </svg>

                  <h5>JavaScript</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={122}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      70%
                    </text>
                  </svg>

                  <h5>React</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={163}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      60%
                    </text>
                  </svg>

                  <h5>Java</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={102}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      75%
                    </text>
                  </svg>

                  <h5>Python</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={102}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      75%
                    </text>
                  </svg>

                  <h5>SQL</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={102}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      75%
                    </text>
                  </svg>

                  <h5>DSA</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={82}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      80%
                    </text>
                  </svg>

                  <h5>Git</h5>
                </div>
                <div className="item">
                  <svg
                    width={150}
                    height={150}
                    viewBox="-18.75 -18.75 187.5 187.5"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      fill="transparent"
                      stroke="#dedede"
                      strokeWidth={15}
                    />
                    <circle
                      r={65}
                      cx={75}
                      cy={75}
                      stroke="#c304bd"
                      strokeWidth={10}
                      strokeLinecap="round"
                      strokeDashoffset={82}
                      fill="transparent"
                      strokeDasharray="408.2"
                    />
                    <text
                      x={29}
                      y={92}
                      fill="#000000"
                      fontSize={50}
                      fontWeight="bold"
                      style={{
                        transform: "rotate(90deg) translate(0px, -146px)",
                      }}
                    >
                      80%
                    </text>
                  </svg>

                  <h5>Canva</h5>
                </div>
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
