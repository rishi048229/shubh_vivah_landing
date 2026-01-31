import React, { useState, useEffect } from "react";
import { Menu, X, Grid, MessageCircle, Heart, LogOut, LogIn, Info, Star } from "lucide-react";
import { MandapIcon, CoupleIcon, DiyaIcon, KalashIcon, UserTilakIcon } from "./Icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logoImg from "../assets/nav_logo_new.png";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Navbar.css";

/* ---------- NAVBAR ---------- */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("currentUser");
      setIsLoggedIn(!!user);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background
      setScrolled(currentScrollY > 20);

      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // Scrolling down -> Hide
      } else {
        setHidden(false); // Scrolling up -> Show
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/");
  };

    const handleServicesClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            const element = document.getElementById('services');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

  const navItems = isLoggedIn ? [
    { path: "/dashboard", icon: <Grid size={20} />, label: "Dashboard" },
    { path: "/people", icon: <CoupleIcon size={20} />, label: "People" },
    { path: "/services", icon: <DiyaIcon size={20} />, label: "Services" },
    { path: "/messages", icon: <MessageCircle size={20} />, label: "Messages" },
    { path: "/membership", icon: <KalashIcon size={20} />, label: "Plans" },
    { path: "/shortlist", icon: <Heart size={20} />, label: "Shortlist" },
    { path: "/my-profile", icon: <UserTilakIcon size={20} />, label: "Profile" },
  ] : [
    { path: "/", icon: <MandapIcon size={20} />, label: t('navbar.home') },
    { path: "/#services", icon: <DiyaIcon size={20} />, label: t('navbar.services') },
    { path: "/#about-us", icon: <Info size={20} />, label: t('navbar.about_us') },
    { path: "/#why-us", icon: <Star size={20} />, label: t('navbar.why_us') },
    { path: "/login", icon: <LogIn size={20} />, label: t('navbar.login') },
  ];

  const isHero = location.pathname === "/" && !scrolled;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""} ${isHero ? "navbar-hero" : ""}`}>
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Shubh Vivah Logo" className="navbar-logo-img" />
          <span className="logo-text" style={{ 
              color: (location.pathname === "/" && !scrolled) ? "#ffffff" : "var(--color-maroon)",
              fontFamily: 'var(--font-cursive)',
              fontSize: '1.8rem'
          }}>
            Shubh Vivah
          </span>
        </Link>

        {/* DESKTOP MENU (ICON BASED) */}
        <div className="desktop-menu">
          {navItems.map((item) => (
            <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-icon-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={item.onClick}
            >
                <span className="nav-icon-wrapper">{item.icon}</span>
                <span className="nav-tooltip">{item.label}</span>
            </Link>
          ))}
          
          <LanguageSwitcher />

          {isLoggedIn && (
            <button onClick={handleLogout} className="nav-icon-link" title="Logout">
                <span className="nav-icon-wrapper"><LogOut size={20} /></span>
                <span className="nav-tooltip">Logout</span>
            </button>
          )}
          
          {!isLoggedIn && (
             <Link to="/register" className="btn-primary" style={{ 
                 padding: '0.6rem 1.8rem', 
                 borderRadius: '50px', 
                 background: 'var(--color-maroon)', 
                 color: 'var(--color-gold)', 
                 textDecoration: 'none',
                 fontWeight: '600',
                 fontSize: '0.9rem',
                 border: '1px solid var(--color-gold)',
                 boxShadow: '0 4px 10px rgba(128,0,0,0.2)'
             }}>
                 Register Free
             </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-btn" style={{ color: (location.pathname === "/" && !scrolled) ? "#fff" : "var(--color-maroon)" }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="mobile-menu-overlay">
          {navItems.map((item) => (
            <Link 
                key={item.path} 
                to={item.path} 
                className="mobile-nav-link"
                onClick={() => setIsOpen(false)}
            >
                {item.icon} {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="mobile-nav-link" style={{ width: '100%', textAlign: 'left' }}>
                <LogOut size={22} /> Logout
            </button>
          )}
          {!isLoggedIn && (
             <Link to="/register" className="mobile-nav-link" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-maroon)' }}>
                 Register Free
             </Link>
          )}
          <div style={{ padding: '0 1rem', marginTop: '0.5rem' }}>
             <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
