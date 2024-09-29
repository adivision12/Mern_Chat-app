// src/TypingAnimation.js
import React from 'react';

const Typing = () => {
  const dotStyle = {
    width: '10px',
    height: '10px',
    backgroundColor: 'black',
    borderRadius: '50%',
    margin: '0 3px',
    opacity: 0.7,
    animation: 'animDots 1.8s ease-in-out infinite'
  };

  return (
    <div style={{
        // margin:'10px',
        // marginBottom:'100px',
      display: 'inline-flex',
    //   background: 'rgb(15, 143, 194)',
    background:"rgb(52, 233, 194)",
    //   border:'2px solid accent',
      padding: '10px 13px',
      borderRadius: '50px',
    }}>
      <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
      <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
      <div style={{ ...dotStyle, animationDelay: '0.4s' }}></div>

      <style>
        {`
          @keyframes animDots {
            0%, 44% {
              transform: translateY(0);
              opacity: 0.7;
            }
            28% {
              transform: translateY(-10px);
              opacity: 0.4;
            }
            44% {
              opacity: 0.2;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Typing;
