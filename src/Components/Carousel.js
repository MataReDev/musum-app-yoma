import Slider from "react-slick";
import { useState, useEffect } from "react";
import "../Style/App.css";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SearchResult from "./SearchResult";

function Carousel(props) {
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);
  const [objectIDs, setObjectIDs] = useState([]);

  useEffect(() => {
    const fetchObjectIDs = async () => {
      const response = await fetch(props.apiGet);
      const data = await response.json();
      if (data && data.objectIDs) {
        const randomObjectIDs = data.objectIDs
          .sort(() => 0.5 - Math.random())
          .slice(0, 20);
        
          console.group("Carousel")
          console.log(randomObjectIDs);
        setObjectIDs(randomObjectIDs);
      }
    };

    fetchObjectIDs();
  }, [props.apiGet]);


  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = objectIDs.map(async (objectID) => {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
        const data = await response.json();
        console.log(data);
        console.groupEnd()
        return data.primaryImageSmall;
      });
      let images = await Promise.all(imagePromises);
      images = images.filter((image) => image !== "");
      setImages(images);
    };
    fetchImages();
  }, [objectIDs, props.prefix]);

  const settings = {
    infinite: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };

  return (
    <div className="Carousel">
      {props.title}
      <Slider {...settings}>
        {images.map((img, idx) => {
          return (
            <div
            key={`${props.title}-${idx}`} 
              className={idx === imageIndex ? "slide activeSlide" : "slide"}
            >
              <img src={img} alt={img} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Carousel;
