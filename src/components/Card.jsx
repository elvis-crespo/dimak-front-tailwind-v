/* eslint-disable react/prop-types */
import "./card.css";

// const waveAnimation = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// const CardContainer = styled.div`
//   //   margin: 100px auto;
//   background: transparent;
//   box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
//   position: relative;
//   width: 240px;
//   height: 330px;
//   border-radius: 16px;
//   overflow: hidden;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const Wave = styled.div`
//   cursor: pointer;
//   position: absolute;
//   width: 540px;
//   height: 700px;
//   opacity: 0.6;
//   left: 0;
//   top: 0;
//   margin-left: -50%;
//   margin-top: -70%;
//   background: ${({ theme }) => theme.backgroundGradient};
//   border-radius: 40%;
//   animation: ${waveAnimation} 5000ms infinite linear;

//   &:nth-child(2) {
//     top: 210px;
//     animation-duration: 4000ms;
//   }

//   &:nth-child(3) {
//     top: 210px;
//     animation-duration: 5000ms;
//   }

//   &.playing {
//     &:nth-child(1) {
//       animation-duration: 1000ms;
//     }
//     &:nth-child(2) {
//       animation-duration: 4000ms;
//     }
//     &:nth-child(3) {
//       animation-duration: 5000ms;
//     }
//   }
// `;

// const InfoTop = styled.div`
//   text-align: center;
//   font-size: 20px;
//   position: absolute;
//   top: 5.6em;
//   left: 0;
//   right: 0;
//   color: rgb(255, 255, 255);
//   font-weight: 600;
//   p {
//     font-size: 2rem;
//     font-weight: 600;
//     font-family: ${themeTypography.fontFamily};
//   }
// `;

// const Name = styled.div`
//   font-size: 14px;
//   font-weight: 100;
//   position: relative;
//   top: 1em;
//   font-family: ${themeTypography.fontFamily};
// `;

export const Card = ({ title, subtitle, children }) => {
  return (
    <>
      <div className="e-card playing">
        
        <div className="image"></div>

        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>

        <div className="infotop">
          {children}
          <br />
          {title}
          <br />
          <div className="name">{subtitle}</div>
        </div>
      </div>
    </>
  );
};
