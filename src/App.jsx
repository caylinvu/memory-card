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
  let arrLength = arr.length;
  let usedValues = [];
  for (let i = 0; i < n; i++) {
    let randomValue = Math.floor(Math.random() * arrLength);
    while (usedValues.includes(randomValue)) {
      randomValue = Math.floor(Math.random() * arrLength);
    }
    randomArr.push(arr[randomValue]);
    usedValues.push(randomValue);
  }
  // console.log(randomArr);
  return randomArr;
};

function App() {
  const [villagers, setVillagers] = useState([]);

  const getVillagers = () => {
    fetchVillagers()
      .then((response) => {
        const currentVillagers = randomVillagers(response, 5);
        setVillagers(currentVillagers);
        return currentVillagers;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVillagers();
  }, []);

  return (
    <div>
      {villagers.map((obj) => {
        return <img src={obj.image_url} key={obj.id}></img>;
      })}
    </div>
  );
}

export default App;

// TO DO

// find card back and maybe card backgrounds????

// figure out how to hide api key
