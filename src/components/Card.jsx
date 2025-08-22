/* eslint-disable react/prop-types */
import "./card.css";

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
