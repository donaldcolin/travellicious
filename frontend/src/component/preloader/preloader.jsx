import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Plane } from 'lucide-react';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
`;

const Loader = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  animation: ${rotation} 1s linear infinite;
`;

const BrandName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ddd;
  margin-top: 1rem;
`;

const Preloader = () => {
  return (
    <LoaderWrapper>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Main spinning loader */}
          <Loader />
          
          {/* Centered plane icon */}
        
        </div>
        
        {/* Brand Name */}
        <BrandName>
          Travellicious
        </BrandName>
      </div>
    </LoaderWrapper>
  );
};

export default Preloader;