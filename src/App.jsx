import { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import ScoreContainer from './components/ScoreContainer';
import CardContainer from './components/CardContainer';

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
  const [isGameOver, setIsGameOver] = useState(false);

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

  const endGame = () => {
    setIsGameOver(true);
    console.log('game is over');
    // implement end game logic
    // will be a game over pop up where you can choose to play again or quit
  };

  useEffect(() => {
    getAllVillagers();
  }, []);

  useEffect(() => {
    if (allVillagers.length > 0) {
      getRandomVillagers(allVillagers, 5);
    }
  }, [allVillagers]);

  return (
    <div>
      <Header />
      <ScoreContainer score={score} highScore={highScore} />
      <CardContainer
        villagers={currentVillagers}
        increaseScore={increaseScore}
        endGame={endGame}
        shuffleCards={shuffleCards}
      />
    </div>
  );
}

export default App;

// TO DO

// add function to randomize order of current villagers when displayed (should happen on mount and each time a card is clicked)

// create a game over pop up

// add a way to keep track of and display the score

// add a way to update the high score when game ends

// maybe add local storage for high score?????

// add current round display (ex: 1/5)

// add ability to play again or quit

// maybe add ability to continue playing with same score???

// add ability to choose easy, medium, or hard (5, 8, or 12 cards)

// maybe add a button you can click on to display pop up with instructions

// add clicking on logo to go home OR maybe get rid of logo on game screen

// maybe change background

// add loading screen while waiting for initial fetch

// remove extra font

// maybe move score to top right corner

// add effect for mouseover on card

// possibly move api logic around (to card container component???)

//

// NOTES

// ***** for now, leave API fetch in App component and pass currentVillager state down to CardContainer component
// if end up not using currentVillager state anywhere else, can move to CardContainer component

// random villager useEffect should only run on mount and each time a new game starts

// add animal crossing logo to start up screen and have shrink to left side during game
