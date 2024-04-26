"use client"
import React from "react";
import { Carousel } from "react-bootstrap";
// import Carousel  from "react-bootstrap/Carousel";
// import "./CSS/CarouselComp.css";
import Image from "next/image";
import  Ima1 from "../../public/images/carslide/Untitled design (3).png";
import  Ima2 from "../../public/images/carslide/Untitled design (4).png";
import  Ima3 from "../../public/images/carslide/Untitled design (5).png";
import  Ima4 from "../../public/images/carslide/Untitled design (6).png";
import  Ima5 from "../../public/images/carslide/Untitled design (7).png";


const CarSlides: React.FC = () => {
  return (
        <div style={{ marginTop:"90px", marginBottom:"20px"}}>
       <Carousel>
        <Carousel.Item>
          <Image style={{ height:"350px", width:"100%"}} src={Ima1} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Image style={{ height:"350px", width:"100%"}} src={Ima2} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Image style={{ height:"350px", width:"100%"}} src={Ima3} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Image style={{ height:"350px", width:"100%"}} src={Ima4} alt="Slider 1" />
        </Carousel.Item>
        <Carousel.Item>
          <Image style={{ height:"350px", width:"100%"}} src={Ima5} alt="Slider 1" />
        </Carousel.Item>
      </Carousel>   
    </div>
  )
}

export default CarSlides

