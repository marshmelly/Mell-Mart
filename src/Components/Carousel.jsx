import React, { useEffect, useState } from "react";
import pic1 from "./Carousel Images/image1.jpg";
import pic2 from "./Carousel Images/image2.jpg";
import pic3 from "./Carousel Images/image3.jpg";
import pic5 from "./Carousel Images/image5.jpg";
import pic4 from "./Carousel Images/image6.jpg";
import pic6 from "./Carousel Images/image4.jpg";

const images = [pic1, pic2, pic3, pic4, pic5,pic6];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);
 
  return (
    <div style={styles.carouselContainer}>
      
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={styles.image}
      />
      
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
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: "99vw",
    height: "400px",
    borderRadius: "8px",
  },
  navButton: {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    padding: "16px",
    transform: "translateY(-50%)",
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
   // Left button specific style
  prevButton: {
    left: "0",
    borderRadius: "0 3px 3px 0" // Rounded right side only
  },
  
  // Right button specific style
  nextButton: {
    right: "0",
    borderRadius: "3px 0 0 3px" // Rounded left side only
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
