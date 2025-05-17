import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./header.css";

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setActiveLink(window.location.pathname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-main">
      {/* Upper Header - User Info */}
      <div className="header-upper">
        <div className="container">
          <div className="user-nav">
            {user ? (
              <div className="user-info">
                <span className="username">Welcome, {user.username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  <svg className="logout-icon" viewBox="0 0 24 24">
                    <path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2h-2v2H5V6h7v2h2zm-1 3l5 4-5 4v-3H3v-2h10v-3z"/>
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="auth-link">
                <svg className="user-icon" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Sign Up / Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Navigation */}
      <div className="header-lower">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src={logo} alt="logo" className="logo-img" />
              <div className="logo-glow"></div>
            </Link>

            <button 
              className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
              <ul className="main-menu">
                {[
                  { path: "/", name: "Home" },
                  { path: "/about", name: "About" },
                  { 
                    path: "#gallery", 
                    name: "Gallery",
                    submenu: [
                      { path: "/gallery/masonry", name: "Masonry" },
                      { path: "/gallery/column-two", name: "Column Two" },
                      { path: "/gallery/column-three", name: "Column Three" }
                    ]
                  },
                  { path: "/blog", name: "Blog" },
                  { path: "/tickets", name: "Book Tickets" },
                  { path: "/shop", name: "Shop" },
                  { path: "/contact", name: "Contact" },
                  { 
                    path: "#error", 
                    name: "Error Pages",
                    submenu: [
                      { path: "/400", name: "400 Error" },
                      { path: "/401", name: "401 Error" },
                      { path: "/403", name: "403 Error" },
                      { path: "/404", name: "404 Error" },
                      { path: "/500", name: "500 Error" },
                      { path: "/503", name: "503 Error" }
                    ]
                  }
                ].map((item) => (
                  <li 
                    key={item.path} 
                    className={`${activeLink === item.path ? 'active' : ''} ${item.submenu ? 'has-submenu' : ''}`}
                  >
                    <Link 
                      to={item.path} 
                      onClick={() => {
                        setActiveLink(item.path);
                        if (!item.submenu) setIsMenuOpen(false);
                      }}
                    >
                      <span>{item.name}</span>
                      <div className="menu-link-hover"></div>
                    </Link>
                    {item.submenu && (
                      <ul className="submenu">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.path}>
                            <Link 
                              to={subItem.path} 
                              onClick={() => {
                                setActiveLink(subItem.path);
                                setIsMenuOpen(false);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="social-links">
              <a href="https://www.facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://www.twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="https://www.behance.net" className="social-link" target="_blank" rel="noopener noreferrer">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M8.84 10.835h-1.965V8.872h1.783c1.878 0 1.646 1.913.182 1.963zm5.789 1.392h1.891v.539h-2.484v-.117c0-1.776 2.163-1.29 2.163-3.807 0-1.572-1.221-2.113-2.447-2.113H5.5v9.191h4.741c2.135 0 2.461-2.996 2.461-2.996h-2.334v.387s.204 1.078 2.198 1.078h2.465c1.745 0 1.69-2.334 1.69-2.334zm-13.569-.539h1.62V8.872H5.5v1.62h1.62v1.396H5.5v1.62h1.62v1.396H5.5v1.62h3.041c1.113 0 2.02-.556 2.02-2.116 0-1.653-1.414-2.555-2.447-2.555H5.5v1.396zm12.988 1.396c0 1.653-1.414 2.555-2.447 2.555h-1.965v-5.111h1.965c1.033 0 2.447.902 2.447 2.556z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};