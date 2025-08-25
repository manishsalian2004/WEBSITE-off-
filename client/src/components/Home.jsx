import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const footerRef = useRef(null);
  const servicesRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sample brand data
  const brands = [
    { id: 1, name: "Open Well And Borewell Motor Rewinding", logo: "/images/winding.png", description: "" },
    { id: 2, name: "Generator Armature Repair", logo: "/images/generator.webp", description: "" },
    { id: 3, name: "Borewell Flushing", logo: "/images/flush.png", description: "" },
    { id: 4, name: "Borewell Pump Re-installation", logo: "/images/reinstallation.png", description: "" },
  ];

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 992);
      setIsSmallMobile(width < 375);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll functions
  const scrollToFooter = () => {
    if (footerRef.current) footerRef.current.scrollIntoView({ behavior: 'smooth' });
    setDropdownOpen(false);
  };

  const scrollToServices = () => {
    if (servicesRef.current) servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    setDropdownOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Auto-slide brands
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [brands.length]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{
          backgroundColor: '#156829ff',
          minHeight: isSmallMobile ? '50px' : '60px',
          padding: isSmallMobile ? '0.25rem 0' : '0.5rem 0',
        }}
      >
        <div className="container-fluid px-2 d-flex align-items-center justify-content-between">
          {/* LEFTMOST Hamburger Menu */}
          <div className="dropdown" ref={dropdownRef} style={{ order: 0 }}>
            <button
              className="btn"
              type="button"
              onClick={toggleDropdown}
              style={{
                backgroundColor: '#156829',
                border: 'none',
                padding: '0.25rem',
                width: isSmallMobile ? '32px' : '40px',
                height: isSmallMobile ? '32px' : '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              aria-label="Menu"
            >
              <span style={{ height: '2px', width: isSmallMobile ? '16px' : '20px', backgroundColor: 'white', margin: '2px 0', borderRadius: '1px' }}></span>
              <span style={{ height: '2px', width: isSmallMobile ? '16px' : '20px', backgroundColor: 'white', margin: '2px 0', borderRadius: '1px' }}></span>
              <span style={{ height: '2px', width: isSmallMobile ? '16px' : '20px', backgroundColor: 'white', margin: '2px 0', borderRadius: '1px' }}></span>
            </button>

            {dropdownOpen && (
              <div
                className="dropdown-menu show"
                style={{
                  display: 'block',
                  position: isMobile ? 'fixed' : 'absolute',
                  top: isMobile ? (isSmallMobile ? '50px' : '60px') : '100%',
                  left: isMobile ? '0' : '0',
                  right: isMobile ? '0' : 'auto',
                  width: isMobile ? '100%' : 'auto',
                  borderRadius: isMobile ? '0' : '0.25rem',
                  border: isMobile ? 'none' : '1px solid rgba(0,0,0,.15)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  zIndex: 1000,
                }}
              >
                <Link className="dropdown-item" to="/Products" onClick={() => setDropdownOpen(false)}>Products</Link>
                <Link className="dropdown-item" to="/Brands" onClick={() => setDropdownOpen(false)}>Brands</Link>
                <Link className="dropdown-item" to="/Images" onClick={() => setDropdownOpen(false)}>Photos</Link>
                {isMobile && (
                  <>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/" onClick={() => setDropdownOpen(false)}>Home</Link>
                    <a className="dropdown-item" href="#contact" onClick={(e) => { e.preventDefault(); scrollToFooter(); }}>Contact Us</a>
                  </>
                )}
              </div>
            )}
          </div>

          {/* CENTER Brand */}
          <Link
            className="navbar-brand fw-bold mx-auto"
            to="/"
            style={{
              fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1.1rem' : '1.5rem',
              order: 1,
              textAlign: 'center',
              padding: '0 0.25rem',
            }}
          >
            Sri Vinayaka Electricals
          </Link>

          {/* RIGHT Nav (Desktop only) */}
          <div className="d-none d-lg-flex align-items-center" style={{ order: 2 }}>
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollToFooter(); }}>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          paddingTop: isSmallMobile ? '60px' : isMobile ? '70px' : '90px',
          backgroundColor: '#f8f9fa',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/flushing.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: isSmallMobile ? '40vh' : isMobile ? '50vh' : '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="container text-center py-4">
          <h1 className="fw-bold" style={{
            color: '#156829', textTransform: 'uppercase', background: 'linear-gradient(90deg,#156829,#28a745)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.5rem' : '2.5rem',
          }}>SRI VINAYAKA ELECTRICALS MOODBIDRI</h1>
          <p className="lead" style={{ fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.9rem' : '1.25rem', color: '#2c3e50' }}>SINCE 1998</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center flex-wrap">
            <button className="btn btn-success btn-lg px-4 gap-3 mb-2" style={{ backgroundColor: '#156829', borderColor: '#156829' }} onClick={scrollToServices}>Available Services</button>
            <button className="btn btn-outline-success btn-lg px-4 mb-2" style={{ color: '#156829', borderColor: '#156829' }} onClick={scrollToFooter}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} style={{ backgroundColor: '#f8f9fa', padding: isSmallMobile ? '1.5rem 0' : isMobile ? '2rem 0' : '4rem 0' }}>
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: '#28a745' }}>Services Provided</h2>
          <div style={{ overflow: 'hidden', position: 'relative', height: isSmallMobile ? '250px' : isMobile ? '280px' : '350px' }}>
            <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentBrandIndex * (100 / brands.length)}%)`, width: `${brands.length * 100}%` }}>
              {brands.map((brand) => (
                <div key={brand.id} style={{ width: `${100 / brands.length}%`, padding: '0 0px',paddingBottom:'0px', marginBottom:'0px' }}>
                  <div className="card h-100 border-0" style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
                    <div className="card-body text-center d-flex flex-column justify-content-center p-2">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'contain',
                          marginBottom: '10px',
                          borderRadius: '500px', 
                        }}
                      />

                      <h5 className="card-title" style={{ fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.9rem' : '1.1rem' }}>{brand.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-3">
            {brands.map((_, idx) => (
              <span key={idx} onClick={() => setCurrentBrandIndex(idx)} style={{
                cursor: 'pointer', height: '10px', width: '10px', margin: '0 3px',
                backgroundColor: idx === currentBrandIndex ? '#28a745' : '#bbb', borderRadius: '50%', display: 'inline-block',
              }}></span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        style={{
          backgroundColor: '#343a40',
          color: 'white',
          padding: isSmallMobile ? '1rem 0' : '1.5rem 0',
          marginTop: 'auto'
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center text-md-start">
            <div className="col-12 col-md-6 col-lg-4 mb-3">
  <h5 style={{ fontSize: isSmallMobile ? '0.9rem' : (isMobile ? '1rem' : '1.25rem') }}>
    Sri Vinayaka Electricals, Moodbidri
  </h5>
  <p style={{ fontSize: isSmallMobile ? '0.8rem' : (isMobile ? '0.9rem' : '1rem'), marginBottom: '0.5rem' }}>
    Sales And Service
  </p>
  <small style={{ fontSize: isSmallMobile ? '0.75rem' : (isMobile ? '0.85rem' : '0.9rem'), opacity: 0.85 }}>
    Proprietor: Dinesh P Salian
  </small>
</div>
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <h5 style={{ fontSize: isSmallMobile ? '0.9rem' : (isMobile ? '1rem' : '1.25rem') }}>Contact Details</h5>
              <ul className="list-unstyled">
                <li style={{ marginBottom: '0.5rem', fontSize: isSmallMobile ? '0.8rem' : (isMobile ? '0.9rem' : '1rem') }}>
                  📍
                  <a
                    href="https://maps.app.goo.gl/yiuenLJH1NATnQtB6?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffffff', textDecoration: 'underline', marginLeft: '5px' }}
                  >
                    Lavantabettu road, near Ranger forest office, Moodbidri, Karnataka 574227
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem', fontSize: isSmallMobile ? '0.8rem' : (isMobile ? '0.9rem' : '1rem') }}>📞 +91 9880014760</li>
              </ul>
            </div>
          </div>
          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />
          <div className="text-center">
            <p className="mb-0" style={{ fontSize: isSmallMobile ? '0.7rem' : (isMobile ? '0.8rem' : '1rem') }}>Sri Vinayaka Electricals Since 1998.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;