import React, { useState, useEffect } from "react";
import "./MemoryGame.scss";
import MemoryItems from "../../components/MemoryItems/MemoryItems";
import hood from "../../assets/hood.jpg";
import bachelor from "../../assets/bachelor.jpg";
import laxx from "../../assets/laxx.jpg";
import matterhorn from "../../assets/matterhorn.jpg";
import yosemite from "../../assets/yosemite.jpg";
import mountain from "../../assets/mountain.jpg";
import everest from "../../assets/everest.jpg";
import white from "../../assets/white.jpg";

const MemoryGame = () => {
  const [shuffled, setShuffled] = useState(false);
  const [prevCard, setPrevCard] = useState(null);
  const [matches, setMatches] = useState([]);
  const [intervalTimer, setIntervalTimer] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [cards, setCards] = useState([
    { id: 1, img: hood },
    { id: 1, img: hood, duplicate: true },
    { id: 2, img: laxx },
    { id: 2, img: laxx, duplicate: true },
    { id: 3, img: bachelor },
    { id: 3, img: bachelor, duplicate: true },
    { id: 4, img: matterhorn },
    { id: 4, img: matterhorn, duplicate: true },
    { id: 5, img: yosemite },
    { id: 5, img: yosemite, duplicate: true },
    { id: 6, img: mountain },
    { id: 6, img: mountain, duplicate: true },
    { id: 7, img: everest },
    { id: 7, img: everest, duplicate: true },
    { id: 8, img: white },
    { id: 8, img: white, duplicate: true },
  ]);

  useEffect(() => {
    if (!shuffled) shuffleCards(cards);

    if (matches.length === 8) {
      stopTimer();
    }
  }, [matches]);

  const shuffleCards = (array) => {
    let currentIndex = cards.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    setCards(array);
    setShuffled(true);
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeElapsed((time) => time + 0.1);
    }, 100);

    setIntervalTimer(timer);
  };

  const stopTimer = () => {
    clearInterval(intervalTimer);
  };

  const handleClick = (card) => {
    if (!timeElapsed) {
      startTimer();
    }

    if (prevCard) {
      if (
        prevCard.id === card.id &&
        card !== prevCard &&
        !matches.includes(card.id)
      ) {
        setMatches((matches) => [...matches, card.id]);
      } else {
        setPrevCard(card);
      }
    } else {
      setPrevCard(card);
    }
  };

  return (
    <div className="MemoryGame">
      <h1>Mountain Memory Game</h1>
      <h2>How fast can you find all the matches?</h2>
      <h2> Click a card to start!</h2>
      <h3>{timeElapsed.toFixed(1)} seconds</h3>
      <MemoryItems
        handleClick={handleClick}
        cards={cards}
        matches={matches}
        prevCard={prevCard}
      />
    </div>
  );
};

export default MemoryGame;
