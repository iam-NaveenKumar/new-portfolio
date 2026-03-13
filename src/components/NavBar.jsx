import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React ,{ useState , useEffect } from 'react';
import logo from '../assets/img/Naveen-port.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

import { motion } from 'framer-motion';

function NavBar() {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
                <Container>
                    <Navbar.Brand href="/" onClick={() => window.location.reload()}>
                        <motion.img 
                            whileHover={{ scale: 1.1 }}
                            src={logo} 
                            alt="LOGO" 
                            style={{ overflow: "hidden", borderRadius: "50%", height: "4rem", width: "4rem", border: "1px solid #fff" }} 
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {['home', 'skills', 'experience', 'projects'].map((link) => (
                                <Nav.Link 
                                    key={link}
                                    href={`#${link}`} 
                                    className={activeLink === link ? 'active navbar-link' : 'navbar-link'} 
                                    onClick={() => onUpdateActiveLink(link)}
                                >
                                    <motion.span
                                        whileHover={{ y: -2 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {link.toUpperCase()}
                                    </motion.span>
                                </Nav.Link>
                            ))}
                        </Nav>
                        <span className="navbar-text">
                            <div className="social-icon">
                                <motion.a whileHover={{ y: -3 }} href="https://www.linkedin.com/in/naveen-kumar-p-492020290/"><img src={navIcon1} alt="linkedin" /></motion.a>
                                <motion.a whileHover={{ y: -3 }} href="https://github.com/iam-NaveenKumar"><img src={navIcon2} alt="github" /></motion.a>
                                <motion.a whileHover={{ y: -3 }} href="https://www.instagram.com/_i.am.naveen_/"><img src={navIcon3} alt="instagram" /></motion.a>
                            </div>
                            <a href="/Naveen_Kumar_Resume.pdf" download="Naveen_Kumar_Resume.pdf" className="vvd-link">
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="vvd"
                                >
                                    <span>Download CV</span>
                                </motion.button>
                            </a>
                        </span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </motion.div>
    );
}

export default NavBar;