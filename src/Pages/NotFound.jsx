import styled, { keyframes } from "styled-components";
import { Container } from "../components/CustomFormStyled";
import { AnimatedContainer } from "../components/Animations";

const opacityAnimation = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Container2 = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  z-index: 4;
`;

const Message = styled.div`
  color: ${({ theme }) => theme.hover};
  font-size: 24px;
  padding-bottom: 20px;
  background-color: #000;
  padding: 10px;
  // box-shadow: 0 2px 6px 0 ${({ theme }) => theme.boxShadow2};
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease-in-out;
  &:before,
  &:after {
    content: "[";
    color: ${({ theme }) => theme.hover};
    font-size: 20px;
    animation: ${opacityAnimation} 2s infinite;
    margin: 0 10px;
  }
  &:after {
    content: "]";
  }
  &:hover {
    box-shadow: 0 4px 6px 0 ${({ theme }) => theme.boxShadow2};
  }

  @media (max-width: 920px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Svg = styled.svg`
  width: 80vw;
  min-width: 100vw;
  height: auto;
  fill: ${({ theme }) => theme.hover};
  text {
    fill: ${({ theme }) => theme.hover};
    font-size: 83px;
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out forwards;
    animation: ${opacityAnimation} 5s infinite;
  }

  text:nth-child(1) {
    animation-delay: 0.3s;
  }
  text:nth-child(2) {
    animation-delay: 0.6s;
  }
  text:nth-child(3) {
    animation-delay: 0.9s;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <Container2>
        <Svg viewBox="0 0 200 100">
          <text x="20" y="85" fill="#ff5757">
            4
          </text>
          <text x="80" y="85" fill="#ff5757">
            0
          </text>
          <text x="140" y="85" fill="#ff5757">
            4
          </text>
        </Svg>
        <AnimatedContainer>
          <Message>¡Oops! Página no encontrada</Message>
          <Message>La página que buscas no existe o fue eliminada.</Message>
        </AnimatedContainer>
      </Container2>
    </Container>
  );
}