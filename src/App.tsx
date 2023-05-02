import "./App.css";
import React, { useState, useEffect } from "react";
import { images } from "./images";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

interface images {
  images: string;
  id: number
}

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [play, setPlay] = useState(true)

  useEffect(() => {
    if(play){
        var interval = setInterval(() => {
        const currentIndex = images.findIndex((image) => image.id === currentImage.id);
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentImage(images[nextIndex]);
    }, 3000);
  }

    return () => clearInterval(interval);
  }, [currentImage, images.length, play]);

  const goToNextSlide = () => {
    const currentIndex = images.findIndex((image) => image.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  const goToPreviousSlide = () => {
    const currentIndex = images.findIndex((image) => image.id === currentImage.id);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentImage(images[previousIndex]);
  };

  return (
    <div className="App">
           <div className="carousel-info">
            <div className="img-container">
           <img src ={currentImage.img} className="carousel-image"/>
           </div>
           <p className="carousel-text">{currentImage.text}</p>
         </div>
      <div className="carousel">
        <span onClick={goToPreviousSlide} style={{ cursor: "pointer" }}>
          <ArrowBackIosIcon />
        </span>
        {images.map(({img,id})=>(
          <img className={`img ${id===currentImage.id?"active":"inactive"}`} src={img} alt={`Slide ${currentImage}`} />
        ))}
        <span onClick={goToNextSlide} style={{ cursor: "pointer" }}>
          <ArrowForwardIosIcon />
        </span>
      <span style={{marginLeft:"80px", cursor:"pointer"}} onClick={()=>setPlay(!play)}>{play?<PauseCircleFilledIcon fontSize="large"/>:<PlayCircleFilledWhiteIcon fontSize="large"/>}</span>
      </div>
    </div>
  );
};

export default ImageCarousel;
