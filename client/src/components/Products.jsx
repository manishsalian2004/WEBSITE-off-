import React, { useState, useEffect, useRef } from "react";

function Products() {
  const footerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 375);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      setIsSmallMobile(window.innerWidth < 375);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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

      {/* Main Content */}
      <div className="container py-5" style={{ flex: 1, paddingTop: '50px', marginTop: '20px' }}>
        <h1 className="text-center mb-4" style={{ color: "#28a745" }}>
          Our Products
        </h1>
        <p className="text-center mb-5">
          Discover our wide range of agricultural and electrical products designed for sustainability and efficiency.
        </p>
        <div className="row">
          {[
            {
              title: "Agricultural Pumps",
              desc: "High-efficiency pumps for all your irrigation needs.",
            },
            {
              title: "Solar Solutions",
              desc: "Eco-friendly solar power systems for farms and homes.",
            },
            {
              title: "Electrical Components",
              desc: "Quality wiring, switches, and electrical accessories.",
            },
          ].map((product, idx) => (
            <div key={idx} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.desc}</p>
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
              </ul>
            </div>
            {/* <div className="col-12 col-md-6 col-lg-4 mb-3">
              <h5 style={{ fontSize: isSmallMobile ? '0.9rem' : (isMobile ? '1rem' : '1.25rem') }}>Follow Us</h5>
              <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', gap: '0.8rem' }}>
                <a href="#" style={{ color: 'white', fontSize: isSmallMobile ? '1rem' : '1.2rem' }}>📘</a>
                <a href="#" style={{ color: 'white', fontSize: isSmallMobile ? '1rem' : '1.2rem' }}>🐦</a>
                <a href="#" style={{ color: 'white', fontSize: isSmallMobile ? '1rem' : '1.2rem' }}>📷</a>
                <a href="#" style={{ color: 'white', fontSize: isSmallMobile ? '1rem' : '1.2rem' }}>📺</a>
              </div>
            </div> */}
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

export default Products;
