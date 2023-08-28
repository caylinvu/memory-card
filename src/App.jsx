import { useState, useEffect, useCallback } from 'react';
import './styles/App.css';
import Header from './components/Header';
import ScoreContainer from './components/ScoreContainer';
import CardContainer from './components/CardContainer';
import StartScreen from './components/StartScreen';
import EndPopup from './components/EndPopup';
import LoadingScreen from './components/LoadingScreen';
import ShowHelp from './components/ShowHelp';

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
  // console.log(randomArr);
  return randomArr;
};

function App() {
  const [allVillagers, setAllVillagers] = useState([]);
  const [currentVillagers, setCurrentVillagers] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('start');
  const [cardQuantity, setCardQuantity] = useState(null);
  const [cardsShowing, setCardsShowing] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const getAllVillagers = () => {
    fetchVillagers()
      .then((response) => {
        setAllVillagers(response);
        // console.log(response);
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
      setCardsShowing(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('highScore', JSON.stringify(score));
      }
    },
    [highScore, score],
  );

  async function playGame(n) {
    setGameStatus('loading');
    setCardQuantity(n);
    setScore(0);
    getRandomVillagers(allVillagers, n);

    setTimeout(() => {
      setGameStatus('playing');
    }, 800);

    setTimeout(() => {
      setCardsShowing(true);
    }, 800);
  }

  const quit = () => {
    setGameStatus('start');
    setShowHelp(false);
  };

  const clickHelp = () => {
    setShowHelp(!showHelp);
  };

  // run API call once on initial component mount
  useEffect(() => {
    getAllVillagers();
    if (!localStorage.getItem('highScore')) {
      return;
    } else {
      setHighScore(JSON.parse(localStorage.getItem('highScore')));
    }
  }, []);

  // check if game is over by comparing score to totalRounds
  useEffect(() => {
    if (score == cardQuantity) {
      endGame('win');
    }
  }, [score, cardQuantity, endGame]);

  return (
    <>
      {gameStatus == 'start' ? (
        <StartScreen playGame={playGame} />
      ) : gameStatus == 'loading' ? (
        <LoadingScreen />
      ) : (
        <>
          <Header quit={quit} clickHelp={clickHelp} />
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
            cardsShowing={cardsShowing}
            setCardsShowing={setCardsShowing}
            score={score}
            cardQuantity={cardQuantity}
            setShowHelp={setShowHelp}
          />
        </>
      )}
      {gameStatus == 'win' && (
        <EndPopup
          text="You win!"
          score={score}
          playAgain={playGame}
          quit={quit}
          cardQuantity={cardQuantity}
          gifUrl="/win.gif"
          gifClass="win-gif"
        />
      )}
      {gameStatus == 'lose' && (
        <EndPopup
          text="Game over!"
          score={score}
          playAgain={playGame}
          quit={quit}
          cardQuantity={cardQuantity}
          gifUrl="/lose.gif"
          gifClass="lose-gif"
        />
      )}
      {showHelp && <ShowHelp />}
    </>
  );
}

export default App;

// TO DO

// possibly move api logic around (to card container component???)

// figure out why some images don't load immediately

// maybe remove loading screen???

//

// NOTES

// ***** for now, leave API fetch in App component and pass currentVillager state down to CardContainer component
// if end up not using currentVillager state anywhere else, can move to CardContainer component

// random villager useEffect should only run on mount and each time a new game starts

// add animal crossing logo to start up screen and have shrink to left side during game

// TO DO LATER

// if user wins, add ability to "keep playing" to add two additional cards and continue run of game with current high score
