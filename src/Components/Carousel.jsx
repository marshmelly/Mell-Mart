import React, { useState } from "react";


const images = [pic1, pic2, pic3, pic5, pic6];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div style={styles.carouselContainer}>
      <button onClick={prevSlide} style={{ ...styles.navButton, left: 0 }}>
        &#10094;
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={styles.image}
      />
      <button onClick={nextSlide} style={{ ...styles.navButton, right: 0 }}>
        &#10095;
      </button>
      <div style={styles.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              backgroundColor: currentIndex === index ? "#333" : "#bbb",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  carouselContainer: {
    position: "relative",
    maxWidth: "800px",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: "99vw",
    height: "600px",
    borderRadius: "8px",
  },
  navButton: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    padding: "16px",
    marginTop: "-22px",
    color: "black",
    fontWeight: "bold",
    fontSize: "24px",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "none",
    zIndex: 1,
  },
  dotsContainer: {
    textAlign: "center",
    paddingTop: "10px",
  },
  dot: {
    cursor: "pointer",
    height: "15px",
    width: "15px",
    margin: "0 2px",
    borderRadius: "50%",
    display: "inline-block",
    transition: "background-color 0.6s ease",
  },
};

export default Carousel;
