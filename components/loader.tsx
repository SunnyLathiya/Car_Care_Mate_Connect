// components/Loader.tsx

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import load from './../public/loaderCar.gif';

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

// const LoaderSpinner = styled.div`
//   border: 8px solid #f3f3f3; /* Light grey */
//   border-top: 8px solid #3498db; /* Blue */
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   animation: spin 1s linear infinite;
  
//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;

const Loader: React.FC = () => {
  return (
    <LoaderContainer >

      <Image src={load} alt={''}/>
    
    </LoaderContainer>
  );
};

export default Loader;
