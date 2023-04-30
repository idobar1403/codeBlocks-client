import React from "react";
import "../assets/styles/Card_styles.css";


const Card = ({ name, description, handleClick }) => {
  return (
    <div className="term">
      <button className="button" onClick={handleClick}>
        <h3>{name}</h3>
        <p>{description}</p>
      </button>
    </div>
  );
};

export default Card;