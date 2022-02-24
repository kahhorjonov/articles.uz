import React from "react";
import book from "routes/books.png";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const CarouselTest = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container" style={{ widows: "100vw", height: "100vh" }}>
      <div className="card">
        <div className="cardbody">
          <Carousel responsive={responsive}>
            <div>
              <img src={book} alt="rasm" />
              <img src={book} alt="rasm" />
              <img src={book} alt="rasm" />
              <img src={book} alt="rasm" />
              <img src={book} alt="rasm" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CarouselTest;
