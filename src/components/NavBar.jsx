import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React ,{ useState , useEffect } from 'react';
import logo from '../assets/img/Naveen-port.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
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
            <Navbar expand="lg" className={`${scrolled ? "scrolled" : ""} py-3 transition-all duration-300`} style={{
                background: scrolled ? 'rgba(10, 10, 12, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(15px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}>
                <Container>
                    <Navbar.Brand href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <motion.img 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            src={logo} 
                            alt="LOGO" 
                            style={{ 
                                overflow: "hidden", 
                                borderRadius: "50%", 
                                height: "3.5rem", 
                                width: "3.5rem", 
                                border: scrolled ? "2px solid var(--accent-color)" : "1px solid #fff",
                                transition: 'all 0.3s ease'
                            }} 
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            {['home', 'skills', 'experience', 'projects', 'publications'].map((link) => (
                                <Nav.Link 
                                    key={link}
                                    href={`#${link}`} 
                                    className={activeLink === link ? 'active navbar-link' : 'navbar-link'} 
                                    onClick={() => onUpdateActiveLink(link)}
                                    style={{ padding: '0 20px' }}
                                >
                                    <motion.span
                                        whileHover={{ y: -2, color: 'var(--accent-color)' }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        style={{ fontWeight: '500', letterSpacing: '1px' }}
                                    >
                                        {link.toUpperCase()}
                                    </motion.span>
                                </Nav.Link>
                            ))}
                        </Nav>
                        <span className="navbar-text ms-lg-4">
                            <div className="social-icon d-flex align-items-center me-3">
                                <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://www.linkedin.com/in/naveen-kumar-p-492020290/" target="_blank"><img src={navIcon1} alt="linkedin" /></motion.a>
                                <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://www.instagram.com/_i.am.naveen_/" target="_blank"><img src={navIcon3} alt="instagram" /></motion.a>
                            </div>
                            <a href="/Naveen_Kumar_Resume.pdf" download="Naveen_Kumar_Resume.pdf" className="vvd-link">
                                <motion.button 
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: '0 0 20px rgba(170, 54, 124, 0.4)',
                                        background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))',
                                        borderColor: 'transparent'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        border: '1px solid #fff',
                                        padding: '12px 25px',
                                        borderRadius: '50px',
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease'
                                    }}
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