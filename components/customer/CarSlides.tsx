"use client";
import React from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import Img1 from "../../public/images/carslide/Untitled design (3).png";
import Img2 from "../../public/images/carslide/Untitled design (4).png";
import Img3 from "../../public/images/carslide/Untitled design (5).png";
import Img4 from "../../public/images/carslide/Untitled design (6).png";
import Img5 from "../../public/images/carslide/Untitled design (7).png";

const CarSlides: React.FC = () => {
  return (
    <div style={{ marginTop: "80px", marginBottom: "20px" }}>
      <Carousel>
        <Carousel.Item>
          <Image
            style={{ height: "350px", width: "100%" }}
            src={Img1}
            alt="Slider 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ height: "350px", width: "100%" }}
            src={Img2}
            alt="Slider 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ height: "350px", width: "100%" }}
            src={Img3}
            alt="Slider 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ height: "350px", width: "100%" }}
            src={Img4}
            alt="Slider 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ height: "350px", width: "100%" }}
            src={Img5}
            alt="Slider 1"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarSlides;
