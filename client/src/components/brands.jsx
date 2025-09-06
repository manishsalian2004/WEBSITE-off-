import React, { useState, useRef, useEffect } from 'react';

function Brands() {
  const footerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 400);

  // Sample brand data with images
  const brands = [
    { id: 1, name: "Mahendra", logo: "/images/Mahendra.jpeg", category: "Pumps & Motors" },
    { id: 2, name: "KSB", logo: "/images/KSB.png", category: "Pumps & Motors" },
    { id: 3, name: "Tormac", logo: "/images/Tormac.jpg", category: "Pumps & Motors" },
    { id: 4, name: "Lubi", logo: "/images/Lubi.jpg", category: "Pumps & Motors" },
    { id: 5, name: "Hi-Flow", logo: "/images/Hi-Flow.webp", category: "Pumps & Motors" },
    { id: 6, name: "Himalaya", logo: "/images/Himalaya.webp", category: "Pumps & Motors" },
    { id: 7, name: "Astral Borewell Pipes", logo: "/images/Astral borewell pipes.jpg", category: "Borewell Pipes" },
    { id: 7, name: "Sudhakar Pipes And Fittings", logo: "/images/sudhakar-pipes.jpg", category: "PVC Pipes And Fittings" },
    { id: 8, name: "Sudhakar Wires", logo: "/images/Sudhakar Wires.jpeg", category: "Wires" },
    
  ];

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      setIsSmallMobile(window.innerWidth < 400);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                marginLeft: '20px',
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
               <span style={{ display: 'inline-flex', alignItems: 'center', color: 'white', fontSize: isSmallMobile ? '14px' : '16px' , borderStyle:'solid',padding:'20%', borderRadius:'10%',borderWidth:'0.1px', borderColor:'black'}}>
  More
  <svg 
    width={isSmallMobile ? '12' : '14'} 
    height={isSmallMobile ? '12' : '14'} 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginLeft: '4px' }}
  >
    <path d="M4 6 L8 10 L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</span>

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
                <a className="dropdown-item" href="/Products" onClick={() => setDropdownOpen(false)}>Products</a>
                <a className="dropdown-item" href="/Brands" onClick={() => setDropdownOpen(false)}>Brands</a>
                <a className="dropdown-item" href="/Images" onClick={() => setDropdownOpen(false)}>Photos</a>
                {isMobile && (
                  <>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/" onClick={() => setDropdownOpen(false)}>Home</a>
                    <a className="dropdown-item" href="#contact" onClick={(e) => { e.preventDefault(); scrollToFooter(); }}>Contact Us</a>
                  </>
                )}
              </div>
            )}
          </div>

          {/* CENTER Brand */}
          <a
            className="navbar-brand fw-bold mx-auto"
            href="/"
            style={{
              fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1.1rem' : '1.5rem',
              order: 1,
              textAlign: 'center',
              padding: '0 0.25rem',
            }}
          >
             Sri Vinayaka Electricals
          </a>

          {/* RIGHT Nav (Desktop only) */}
          <div className="d-none d-lg-flex align-items-center" style={{ order: 2 }}>
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollToFooter(); }}>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Page Content */}
      <div className="container py-5" style={{ flex: '1', paddingTop: isSmallMobile ? '60px' : '70px', marginTop: '10px' }}>
        <h1 className="text-center mb-4" style={{ color: '#28a745' , marginTop:'20px' }}>Available Brands</h1>
        <p className="text-center mb-5">
          We partner with leading brands to provide the highest quality agricultural and commercial based electrical products.
        </p>

        {/* Brand cards - similar to services in Home component */}
        <div className="row justify-content-center">
          {brands.map((brand) => (
            <div key={brand.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 text-center border-0" style={{ boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)' }}>
                <div className="card-body d-flex flex-column justify-content-center p-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'contain',
                      marginBottom: '10px',
                    }}
                  />
                  <h5 className="card-title" style={{ fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.9rem' : '1rem' }}>{brand.name}</h5>
                  <small className="text-muted">{brand.category}</small>
                </div>
              </div>
            </div>
          ))}
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
                                <li style={{ marginBottom: '0.5rem', fontSize: isSmallMobile ? '0.8rem' : (isMobile ? '0.9rem' : '1rem') }}>📞 +91 8197942760</li>

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
}

export default Brands;
