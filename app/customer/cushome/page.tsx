import React, { useEffect } from "react";
import Brands from "@/components/customer/Brands";
import CarSlides from "@/components/customer/CarSlides";

const Demo: React.FC = () => {
  return (
    <div>
    <CarSlides/>
      <Brands />
    </div>
  );
}

export default Demo;