import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./acceuil.css";
import logo from "../assets/images/logo.png";
import backgroundVideo from "../assets/images/banner/background01.mp4";
import { Menu } from "./menu";

export function Acceuil() {
  const scrollToPredictions = () => {
    // Implémentez la logique de défilement ici
  };

  return (
    <div className="home-wrapper">
      {/* Hero Banner Section */}
      <motion.section 
        className="hero-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video autoPlay loop muted playsInline className="video-background">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        <div className="container">
          <motion.div 
            className="banner-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="logo-container">
              <motion.img 
                src={logo} 
                alt="TacticSense Logo" 
                className="banner-logo"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <div className="logo-glow"></div>
            </div>
            <motion.h1 
              className="banner-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tactic<span>Sense</span>
            </motion.h1>
            <motion.h2 
              className="banner-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              GAME CHANGER IN THE SPORT INDUSTRY
            </motion.h2>
            <motion.p 
              className="banner-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Empowering fans to contribute to the development of future sports legends
            </motion.p>
            <motion.div 
              className="banner-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link to="/signup" className="btn-primary">
                <motion.span whileHover={{ x: 5 }}>Sign Up</motion.span>
                <svg className="btn-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/login" className="btn-secondary">
                <motion.span whileHover={{ x: 5 }}>Login</motion.span>
                <svg className="btn-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button onClick={scrollToPredictions} className="btn-tertiary">
                <motion.span whileHover={{ x: 5 }}>View Predictions</motion.span>
                <svg className="btn-icon" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Preview Section */}
      <motion.section 
        className="about-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div 
            className="about-card"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="section-title">News Team</h2>
            <p className="section-text">
              Tactic Sense Sports combines cutting-edge Tactic Sense technology with the passion of sports,
              creating a revolutionary platform where fans become stakeholders in the future of sports.
            </p>
            <Link to="/about" className="btn-learn-more">
              <motion.span whileHover={{ x: 5 }}>Learn More</motion.span>
              <svg className="btn-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Menu Component with Carousel */}
      <Menu />


      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Tactic Sense in Sports?
          </motion.h2>
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </motion.div>
              <h3>Fan Engagement</h3>
              <p>Tokenized systems allow fans to participate in team decisions and player development.</p>
              <Link to="/features/fan-engagement" className="feature-link">
                <motion.span whileHover={{ x: 5 }}>Explore</motion.span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </motion.div>
              <h3>Transparency</h3>
              <p>Immutable records ensure fair play and transparent transactions in sports.</p>
              <Link to="/features/transparency" className="feature-link">
                <motion.span whileHover={{ x: 5 }}>Explore</motion.span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </motion.div>
              <h3>New Revenue</h3>
              <p>Smart contracts create innovative monetization opportunities for athletes and teams.</p>
              <Link to="/features/revenue" className="feature-link">
                <motion.span whileHover={{ x: 5 }}>Explore</motion.span>
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="testimonials-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Industry Leaders Say
          </motion.h2>
          <div className="testimonials-grid">
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <svg className="quote-icon" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <blockquote>
                "Tactic Sense is revolutionizing how we engage with sports fans worldwide."
              </blockquote>
              <cite>Sports Tech Magazine</cite>
            </motion.div>
            
            <motion.div 
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <svg className="quote-icon" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <blockquote>
                "This platform represents the future of fan participation in sports."
              </blockquote>
              <cite>Yahoo Finance</cite>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}