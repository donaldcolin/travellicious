import React from 'react';


const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Main spinning loader */}
          <div className="loader"></div>
          
          {/* Centered plane icon */}
      
        </div>
        
        {/* Brand Name */}
        <div className="text-2xl font-bold text-gray-300">
          Travellicious
        </div>
      </div>
    </div>
  );
};

// Add custom styles
const style = document.createElement('style');
style.textContent = `
  .loader {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #FFF;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

export default Preloader;