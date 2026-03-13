import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsArrowRightCircle } from "react-icons/bs";
import myimg from '../assets/img/Naveen-port.png'
import 'animate.css'
import TrackVisibility from 'react-on-screen';

import { motion } from 'framer-motion';

function Banner() {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["Web Developer", "Backend Developer", "AI Enthusiast", "Software Engineer", "UI / UX Designer"];
    const [text, setText] = useState('');
    const period = 2000;
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    useEffect(() => {
        const ticker = setTimeout(() => {
            tick();
        }, delta);

        return () => clearTimeout(ticker);
    }, [text, isDeleting, loopNum, delta]);

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
            setLoopNum(l => l + 1);
            setDelta(500);
        }
    };

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="tagline">Welcome to my Portfolio</span>
                            <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1' }}>
                                {`Hi! I'm Naveen Kumar `} <br />
                                <span className="wrap" style={{ color: 'var(--accent-color)' }}>{text}</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', marginTop: '20px', color: 'var(--text-muted)' }}>
                                Information Technology student focused on AI applications, backend engineering, and modern web development.
                            </p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href='#connect'}
                                style={{
                                    marginTop: '40px',
                                    background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))',
                                    padding: '15px 35px',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Let's Connect <BsArrowRightCircle />
                            </motion.button>
                        </motion.div>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img src={myimg} alt="Banner Image" style={{ width: '90%', filter: 'drop-shadow(0 0 30px rgba(170, 54, 124, 0.3))' }} />
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Banner;