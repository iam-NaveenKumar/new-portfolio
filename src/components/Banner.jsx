import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsArrowRightCircle } from "react-icons/bs";
import headerImg from '../assets/img/header-img.svg';
import 'animate.css'
import TrackVisibility from 'react-on-screen';

function Banner() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Web Developer", "AI Enthusiast", "Software Engineer", "UI / UX Designer"];
    const [text, setText] = useState('');
    const period = 2000;
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    useEffect(() => {
        const ticker = setTimeout(() => {
            tick();
        }, delta);

        return () => clearTimeout(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, isDeleting, loopNum, delta]); // Add all dependencies

    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        } else {
            setDelta(300 - Math.random() * 100);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(l => l + 1); // Use functional update
            setDelta(500);
        }
    };

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                    <TrackVisibility>
                    {({ isVisible }) => (
                    <div className={isVisible => isVisible ? "animate__animated animate__fadeIn" : ""}>
                
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>{`Hi I'm Naveen Kumar`} <br /> <span className="wrap">{text}</span>
                        </h1>
                        <p>I am an IT student with a strong focus on Artificial Intelligence, Machine Learning, and Software Development. As an aspiring Fall 2025 intern, I am passionate about leveraging technology to solve real-world problems. I am dedicated to continuous learning and growth, with plans to graduate in 2027.</p>
                        <button onClick={() => console.log('connect')}>Let's Connect <BsArrowRightCircle /></button>
                    </div>
                    )}
                    </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Banner Image" />
                    </Col>
                
                    
                </Row>
            </Container>
        </section>
    );
}

export default Banner;