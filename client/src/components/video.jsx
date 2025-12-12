import React, { useRef, useState, useEffect } from "react";

function Video() {
  const footerRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth < 400);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔴 NEW — modal video ref
  const modalVideoRef = useRef(null);
  // 🔴 NEW — refs for all gallery videos
  const galleryVideoRefs = useRef([]);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      setIsSmallMobile(window.innerWidth < 400);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

  // Sample videos
  const videos = [
    { id: 1, src: "/Videos/detail.mp4", isPrimary: true },
    { id: 2, src: "/Videos/flushing_truck.mp4", isPrimary: false }
  ];

  const primaryVideo = videos.find((vid) => vid.isPrimary);
  const otherVideos = videos.filter((vid) => !vid.isPrimary);

  const openModal = (video) => {
    // 🔴 NEW — Pause all gallery videos when opening modal
    pauseAllGalleryVideos();
    setSelectedVideo(video);
  };

  // 🔴 UPDATED — Pause modal video before closing
  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedVideo(null);
  };

  // 🔴 NEW — Function to pause all gallery videos
  const pauseAllGalleryVideos = () => {
    galleryVideoRefs.current.forEach(ref => {
      if (ref && !ref.paused) {
        ref.pause();
      }
    });
  };

  // 🔴 NEW — Function to handle gallery video play
  const handleGalleryVideoPlay = (currentVideoId) => {
    // Pause all other gallery videos
    galleryVideoRefs.current.forEach((ref, index) => {
      if (ref && index !== currentVideoId && !ref.paused) {
        ref.pause();
      }
    });
    
    // Pause modal video if it's playing
    if (modalVideoRef.current && !modalVideoRef.current.paused) {
      modalVideoRef.current.pause();
    }
  };

  // 🔴 NEW — Function to handle modal video play
  const handleModalVideoPlay = () => {
    // Pause all gallery videos when modal video plays
    pauseAllGalleryVideos();
  };

  // 🔴 NEW — Initialize galleryVideoRefs array
  useEffect(() => {
    // Initialize the refs array with the correct length
    const totalVideos = videos.length;
    galleryVideoRefs.current = galleryVideoRefs.current.slice(0, totalVideos);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* HEADER */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{
          backgroundColor: "#156829ff",
          minHeight: isSmallMobile ? "50px" : "60px",
          padding: isSmallMobile ? "0.25rem 0" : "0.5rem 0",
        }}
      >
        <div className="container-fluid px-2 d-flex align-items-center justify-content-between">
          {/* Left - More Button */}
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn text-white"
              type="button"
              onClick={toggleDropdown}
              style={{
                backgroundColor: "#094b1fff",
                border: "none",
                padding: "0.25rem 0.5rem",
                width: isSmallMobile ? "32px" : "auto",
                height: isSmallMobile ? "32px" : "auto",
                fontSize: isSmallMobile ? "0.75rem" : "1rem",
              }}
            >
              More ▾
            </button>
            {dropdownOpen && (
              <div
                className="dropdown-menu show"
                style={{
                  display: "block",
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  borderRadius: "0.25rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  zIndex: 2000,
                }}
              >
                <a className="dropdown-item" href="/Products" onClick={() => setDropdownOpen(false)}>Products</a>
                <a className="dropdown-item" href="/Brands" onClick={() => setDropdownOpen(false)}>Brands</a>
                <a className="dropdown-item" href="/Images" onClick={() => setDropdownOpen(false)}>Photos</a>
                <a className="dropdown-item" href="/" onClick={() => setDropdownOpen(false)}>Home</a>
              </div>
            )}
          </div>

          {/* Center - Brand Name */}
          <a
            className="navbar-brand fw-bold mx-auto"
            href="/"
            style={{
              fontSize: isSmallMobile ? "0.9rem" : isMobile ? "1.1rem" : "1.5rem",
              textAlign: "center",
            }}
          >
            Sri Vinayaka Electricals
          </a>

          {/* Right side empty */}
          <div style={{ width: "40px" }}></div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div
        className="container py-5"
        style={{ flex: "1", paddingTop: "50px", marginTop: "10px" }}
      >
        <h1 className="text-center mb-4" style={{ color: "#156829", marginTop: "10px" }}>
          Our Work Videos
        </h1>
        <p className="text-center mb-5 lead">A showcase of our projects in motion</p>

        {/* Featured Video */}
        {primaryVideo && (
          <div className="row mb-5">
            <div className="col-12">
              <div
                className="card border-0 shadow-lg overflow-hidden bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => openModal(primaryVideo)}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "500px", overflow: "hidden" }}
                >
                  <video
                    ref={el => {
                      if (el) galleryVideoRefs.current[0] = el;
                    }}
                    src={primaryVideo.src}
                    className="w-100 h-100"
                    style={{ objectFit: "contain", maxHeight: "100%" }}
                    controls
                    onPlay={() => handleGalleryVideoPlay(0)}
                    onClick={(e) => {
                      // Prevent card click when clicking on video controls
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Videos */}
        <div className="row">
          {otherVideos.map((video, index) => (
            <div key={video.id} className="col-lg-4 col-md-6 mb-4">
              <div
                className="card h-100 border-0 shadow-sm overflow-hidden bg-light gallery-item"
                style={{ cursor: "pointer" }}
                onClick={() => openModal(video)}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "250px", overflow: "hidden" }}
                >
                  <video
                    ref={el => {
                      if (el) galleryVideoRefs.current[index + 1] = el;
                    }}
                    src={video.src}
                    className="w-100 h-100"
                    style={{ objectFit: "contain", maxHeight: "100%" }}
                    controls
                    onPlay={() => handleGalleryVideoPlay(index + 1)}
                    onClick={(e) => {
                      // Prevent card click when clicking on video controls
                      e.stopPropagation();
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 1050 }}
          onClick={closeModal}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl m-0 vh-100">
            <div className="modal-content bg-transparent border-0 h-100">
              <div className="modal-header border-0 position-absolute top-0 end-0 z-3">
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  style={{ fontSize: "1.5rem" }}
                ></button>
              </div>
              <div className="modal-body d-flex justify-content-center align-items-center h-100">
                <video
                  ref={modalVideoRef}
                  src={selectedVideo.src}
                  className="w-100 h-100"
                  style={{ maxHeight: "90vh", objectFit: "contain" }}
                  controls
                  autoPlay
                  onPlay={handleModalVideoPlay}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        ref={footerRef}
        style={{
          backgroundColor: "#343a40",
          color: "white",
          padding: isSmallMobile ? "1rem 0" : "1.5rem 0",
          marginTop: "auto",
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center text-md-start">
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <h5
                style={{
                  fontSize: isSmallMobile ? "0.9rem" : isMobile ? "1rem" : "1.25rem",
                }}
              >
                Sri Vinayaka Electricals, Moodbidri
              </h5>
              <p
                style={{
                  fontSize: isSmallMobile ? "0.8rem" : isMobile ? "0.9rem" : "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                Sales And Service
              </p>
              <small
                style={{
                  fontSize: isSmallMobile ? "0.75rem" : isMobile ? "0.85rem" : "0.9rem",
                  opacity: 0.85,
                }}
              >
                Proprietor: Dinesh P Salian
              </small>
            </div>

            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <h5
                style={{
                  fontSize: isSmallMobile ? "0.9rem" : isMobile ? "1rem" : "1.25rem",
                }}
              >
                Contact Details
              </h5>
              <ul className="list-unstyled">
                <li
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: isSmallMobile ? "0.8rem" : isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  📍
                  <a
                    href="https://maps.app.goo.gl/yiuenLJH1NATnQtB6?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#ffffff",
                      textDecoration: "underline",
                      marginLeft: "5px",
                    }}
                  >
                    Lavantabettu road, near Ranger forest office, Moodbidri,
                    Karnataka 574227
                  </a>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>📞 +91 9880014760</li>
                <li style={{ marginBottom: "0.5rem" }}>📞 +91 8197942760</li>
              </ul>
            </div>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />

          <div className="text-center">
            <p className="mb-0" style={{ fontSize: isSmallMobile ? "0.7rem" : "1rem" }}>
              Sri Vinayaka Electricals Since 1998.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .gallery-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .gallery-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15) !important;
        }
        /* Ensure video controls are visible and usable */
        video::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.5);
        }
        video::-webkit-media-controls-play-button,
        video::-webkit-media-controls-volume-slider,
        video::-webkit-media-controls-mute-button,
        video::-webkit-media-controls-fullscreen-button {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
}

export default Video;
