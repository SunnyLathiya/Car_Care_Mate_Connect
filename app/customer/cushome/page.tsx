import React, { useEffect } from "react";
import Brands from "@/components/customer/Brands";
import CarSlides from "@/components/customer/CarSlides";
import Notification from "@/components/Notification";

const Demo: React.FC = () => {
  return (
    <div style={{backgroundColor:"white"}}>
    <CarSlides/>
    <Notification/>
      <Brands />
    </div>
  );
}

export default Demo;
