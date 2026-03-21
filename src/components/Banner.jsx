import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsArrowRightCircle } from "react-icons/bs";
import myimg from '../assets/img/Naveen-port.png'
import 'animate.css'
import TrackVisibility from 'react-on-screen';

import { motion } from 'framer-motion';

import { useRef } from 'react';

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const generateVCard = () => {
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Naveen Kumar\nTITLE:Software Engineer\nTEL;TYPE=CELL:8525926626\nURL:${window.location.origin}\nNOTE:Instagram: _i.am.naveen_\nEND:VCARD`;
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Naveen_Kumar.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <section className="banner" id="home" data-component="Banner">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.span variants={itemVariants} className="tagline">Welcome to my Portfolio</motion.span>
                            <motion.h1 variants={itemVariants} style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1' }}>
                                {`Hi! I'm Naveen Kumar `} <br />
                                <span className="wrap" style={{ color: 'var(--accent-color)' }}>{text}</span>
                            </motion.h1>
                            <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', marginTop: '20px', color: 'var(--text-muted)' }}>
                                Information Technology student focused on AI applications, backend engineering, and modern web development.
                            </motion.p>
                            <div style={{ display: 'flex', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
                                <motion.button 
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.location.href='#connect'}
                                    style={{
                                        background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))',
                                        padding: '15px 35px',
                                        borderRadius: '50px',
                                        fontSize: '1.1rem',
                                        border: 'none',
                                        color: '#fff'
                                    }}
                                >
                                    Let's Connect <BsArrowRightCircle />
                                </motion.button>
                                <motion.button 
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={generateVCard}
                                    style={{
                                        background: 'transparent',
                                        border: '2px solid var(--accent-color)',
                                        color: '#fff',
                                        padding: '15px 35px',
                                        borderRadius: '50px',
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Save Contact
                                </motion.button>
                            </div>
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