/* eslint-disable react/prop-types */
import styled from "styled-components";
import { themeTypography } from "../utils/themes";

const StyledButton = styled.button`
  font-family: ${themeTypography.fontFamily};
  font-size: 20px;
  background:rgb(108, 186, 255);
  height: 50px;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;

  span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  &:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  &:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  &:hover span {
    transform: translateX(5em);
  }

  &:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }
    to {
      transform: translateY(-0.1em);
    }
  }
`;

const SvgWrapper = styled.div`
  display: flex;
`;

const AnimatedButton = ({ text }) => {
  return (
    <StyledButton>
      <SvgWrapper className="svg-wrapper-1">
        <SvgWrapper className="svg-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg>
        </SvgWrapper>
      </SvgWrapper>
      <span>{text}</span>
    </StyledButton>
  );
};

export default AnimatedButton;
