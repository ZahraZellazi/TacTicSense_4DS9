import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./menu.css";

export function Menu() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselCards.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const pauseCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeCarousel = () => {
    pauseCarousel();
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselCards.length - 1 ? 0 : prev + 1));
    resetAutoSlide();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselCards.length - 1 : prev - 1));
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    pauseCarousel();
    resumeCarousel();
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    pauseCarousel();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    } else if (touchStart - touchEnd < -50) {
      prevSlide();
    }
    resumeCarousel();
  };

  // Données pour les cartes du carrousel
  const carouselCards = [
    {
      title: "Market Value Prediction",
      description: "Accurate estimation of player transfer values based on performance metrics and market trends.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 2v4m0 12v4M6 12H2m20 0h-4m1.078 7.078L16.25 16.25M19.078 5 16.25 7.828M4.922 19.078 7.75 16.25M4.922 5 7.75 7.828"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      link: "/market-value-page"  
    },
    {
      title: "Growth Prediction",
      description: "Forecast player development and potential improvement over time based on historical data.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M3 3v18h18M7 16l5-5 5 5M7 11l5-5 5 5"/>
        </svg>
      ),
      link: "/growth-page"
    },
    {
      title: "Best Position Prediction",
      description: "Determine the optimal playing position for maximum performance and team contribution.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      ),
      link: "/best-position-page"
    },
    {
      title: "Injury Duration Prediction",
      description: "Predict recovery timelines for injured players based on injury type and player history.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      ),
      link: "/injury-duration-page"
    },
    {
      title: "Post-Injury Performance Prediction",
      description: "Assess how a player's performance may change after recovering from an injury.",
      icon: (
        <svg viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          <path d="M12 17v4"/>
        </svg>
      ),
      link: "/post-injury-page"
    },
  ];

  return (
    <section className="features-carousel">
      <div className="container">
        <h2 className="section-title">Our Predictive Models</h2>
        <div className="carousel-wrapper">
          <button className="carousel-arrow prev" onClick={prevSlide}>
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <div 
            className="carousel-inner" 
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={pauseCarousel}
            onMouseLeave={resumeCarousel}
          >
            <AnimatePresence custom={currentSlide}>
              {carouselCards.map((card, index) => (
                <motion.div
                  className={`feature-card ${index === currentSlide ? 'active' : ''}`}
                  key={index}
                  initial={{ opacity: 0, x: index > currentSlide ? 100 : -100 }}
                  animate={{ 
                    opacity: index === currentSlide ? 1 : 0.5,
                    x: 0,
                    scale: index === currentSlide ? 1 : 0.9,
                    zIndex: index === currentSlide ? 10 : 1
                  }}
                  exit={{ opacity: 0, x: index > currentSlide ? -100 : 100 }}
                  transition={{ duration: 0.5 }}
                  custom={currentSlide}
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="feature-icon">
                    {card.icon}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link to={card.link} className="feature-link" style={{ zIndex: 20 }}>
                    <span>Predict</span>
                    <svg viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <button className="carousel-arrow next" onClick={nextSlide}>
            <svg viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        <div className="carousel-indicators">
          {carouselCards.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}