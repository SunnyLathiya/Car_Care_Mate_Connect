import React from "react";
import styled from "styled-components";
import Image from "next/image";
import load from "../../public/loaderCar.gif";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  height: 100vh;
`;

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Image src={load} alt={""} />
    </LoaderContainer>
  );
};

export default Loader;
