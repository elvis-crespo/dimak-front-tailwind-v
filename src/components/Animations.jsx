// animations.js
import styled, { keyframes } from "styled-components";

export const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const AnimatedContainer = styled.div`
  animation: ${fadeInScale} 1s ease forwards;
  z-index: 4;
`;

export const fadeInSlight = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const AnimatedContainerSlight = styled.div`
  animation: ${fadeInSlight} 1.5s ease forwards;
  z-index: 4;
`;