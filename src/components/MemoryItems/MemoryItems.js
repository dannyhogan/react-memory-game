import React from "react";
import "./MemoryItems.scss";

const MemoryItems = ({ handleClick, cards, matches, prevCard }) => {
  const cardItems = cards.map((card, i) => {
    return (
      <li
        key={i}
        className={`card ${
          matches.includes(card.id) || prevCard === card ? "visible" : "hidden"
        }`}
        onClick={() => handleClick(card)}
      >
        <p>?</p>
        <img src={card.img} />
      </li>
    );
  });

  return (
    <div className="MemoryItems">
      <ul className="MemoryItems-container">{cardItems}</ul>
    </div>
  );
};

export default MemoryItems;
