import { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import Header from './components/Header';
import ScoreContainer from './components/ScoreContainer';
import CardContainer from './components/CardContainer';
import EndPopup from './components/EndPopup';

const fetchVillagers = async () => {
  try {
    const response = await fetch(
      'https://amiiboapi.com/api/amiibo/?amiiboSeries=Animal Crossing&type=card',
    );
    const villagerData = await response.json();
    const uniqueVillagers = villagerData.amiibo
      .filter((obj) => {
        if (
          obj.release.jp == '2015-07-30' ||
          obj.release.jp == '2015-10-29' ||
          obj.release.jp == '2016-01-14' ||
          obj.release.jp == '2016-03-24' ||
          obj.release.jp == '2021-11-05'
        )
          return obj;
      })
      .reverse()
      .reduce((unique, current) => {
        if (!unique.find((obj) => obj.character === current.character)) {
          unique.push(current);
        }
        return unique;
      }, [])
      .map((obj) => {
        return {
          name: obj.character,
          image_url: obj.image,
          id: obj.head,
        };
      });
    return uniqueVillagers;
  } catch (error) {
    console.log(error);
  }
};

const randomVillagers = (arr, n) => {
  let randomArr = [];
  let usedValues = [];
  for (let i = 0; i < n; i++) {
    let randomValue = Math.floor(Math.random() * arr.length);
    while (usedValues.includes(randomValue)) {
      randomValue = Math.floor(Math.random() * arr.length);
    }
    randomArr.push(arr[randomValue]);
    usedValues.push(randomValue);
  }
  console.log(randomArr);
  return randomArr;
};

function App() {
  const [allVillagers, setAllVillagers] = useState([]);
  const [currentVillagers, setCurrentVillagers] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [cardQuantity, setCardQuantity] = useState(5);

  const getAllVillagers = () => {
    fetchVillagers()
      .then((response) => {
        setAllVillagers(response);
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRandomVillagers = (arr, n) => {
    setCurrentVillagers(randomVillagers(arr, n));
  };

  const shuffleCards = () => {
    let shuffled = currentVillagers
      .map((obj) => ({ obj, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ obj }) => obj);
    setCurrentVillagers(shuffled);
  };

  const increaseScore = () => {
    setScore(score + 1);
  };

  const endGame = useCallback(
    (status) => {
      setGameStatus(status);
      if (score > highScore) {
        setHighScore(score);
      }
    },
    [highScore, score],
  );

  const playAgain = () => {
    setGameStatus('playing');
    getRandomVillagers(allVillagers, cardQuantity);
    setScore(0);
  };

  // run API call once on initial component mount
  useEffect(() => {
    getAllVillagers();
  }, []);

  // get a random villager set depending on totalRounds and ***game status***
  useEffect(() => {
    if (allVillagers.length > 0) {
      getRandomVillagers(allVillagers, cardQuantity);
    }
  }, [allVillagers, cardQuantity]);

  // check if game is over by comparing score to totalRounds
  useEffect(() => {
    if (score == cardQuantity) {
      endGame('win');
    }
  }, [score, cardQuantity, endGame]);

  return (
    <div>
      <Header />
      <ScoreContainer
        score={score}
        highScore={highScore}
        totalRounds={cardQuantity}
        endGame={endGame}
      />
      <CardContainer
        villagers={currentVillagers}
        increaseScore={increaseScore}
        endGame={endGame}
        shuffleCards={shuffleCards}
      />
      {gameStatus == 'win' && <EndPopup text="You win!" score={score} playAgain={playAgain} />}
      {gameStatus == 'lose' && <EndPopup text="Game over!" score={score} playAgain={playAgain} />}
    </div>
  );
}

export default App;

// TO DO

// add start popup

// add quit button to end game popup

// add ability to choose easy, medium, or hard (5, 8, or 12 cards)

// maybe add a button you can click on to display pop up with instructions

// add clicking on logo to go home OR maybe get rid of logo on game screen

// add loading screen while waiting for initial fetch

// remove extra font

// maybe move score to top right corner

// add effect for mouseover on card

// possibly move api logic around (to card container component???)

// find game over images (happy / sad) OR GIFS

// maybe add local storage for high score?????

// maybe add ability to continue playing with same score???

//

// NOTES

// ***** for now, leave API fetch in App component and pass currentVillager state down to CardContainer component
// if end up not using currentVillager state anywhere else, can move to CardContainer component

// random villager useEffect should only run on mount and each time a new game starts

// add animal crossing logo to start up screen and have shrink to left side during game
