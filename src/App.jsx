import { useState, useEffect } from 'react';
import './styles/App.css';

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
      {currentVillagers.map((obj) => {
        return <img src={obj.image_url} key={obj.id}></img>;
      })}
    </div>
  );
}

export default App;

// TO DO

// add function to randomize order of current villagers when displayed (should happen on mount and each time a card is clicked)

//

//

//

// NOTES

// random villager useEffect should only run on mount and each time a new game starts
