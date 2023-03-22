import React, { useState } from "react";
import "./APIform.css";

const Apiform = () => {
  const [dogData, setDogData] = useState(null);
  const [banList, setBanList] = useState([]);

  const handleFetchDogs = async () => {
    try {
      const response = await fetch(
        `https://api.thedogapi.com/v1/images/search?size=small&mime_types=jpg,png&limit=1`,
        {
          headers: {
            "x-api-key":
              "live_wUpePoaEMmLyl2vuYa9Vq78ISz7vWUyRMTDIke3d2g3XnIY9RQDOUKGlmdrWxwpm",
          },
        }
      );
      const data = await response.json();
      const imageUrls = data.map((item) => item.url);

      const breedResponse = await fetch(`https://api.thedogapi.com/v1/breeds`, {
        headers: {
          "x-api-key":
            "live_wUpePoaEMmLyl2vuYa9Vq78ISz7vWUyRMTDIke3d2g3XnIY9RQDOUKGlmdrWxwpm",
        },
      });
      const breedData = await breedResponse.json();
      const randomBreed = breedData[Math.floor(Math.random() * breedData.length)];

      const filteredData = randomBreed.temperament
        ? breedData.filter(
            (breed) =>
              !banList.includes(breed.name) &&
              breed.temperament === randomBreed.temperament
          )
        : breedData.filter((breed) => !banList.includes(breed.name));
      const randomDog = filteredData[Math.floor(Math.random() * filteredData.length)];

      setDogData({
        name: randomDog.name,
        origin: randomDog.origin,
        temperament: randomDog.temperament,
        lifeSpan: randomDog.life_span,
        imageUrl: imageUrls[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBanDog = (dogUrl) => {
    setBanList((prevBanList) => [...prevBanList, dogUrl]);
    handleFetchDogs();
  };

  return (
    <div className="container">
      <div className="left-column">
        <button onClick={handleFetchDogs}>Fetch Dogs</button>
        {dogData && (
          <div className="card">
            <img src={dogData.imageUrl} alt={`Dog 1`} />
            <div className="dog-info">
              <h3>{dogData.name}</h3>
              <p>Origin: {dogData.origin}</p>
              <p>Temperament: {dogData.temperament}</p>
              <p>Lifespan: {dogData.lifeSpan}</p>
              <button
                className="ban-button"
                onClick={() => handleBanDog(dogData.imageUrl)}
              >
                Ban Dog
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="right-column">
        <h2>Banned Dogs:</h2>
        {banList.map((dogUrl, index) => (
          <img src= {dogUrl} />
          
        ))}
      </div>
    </div>
  );
};

export default Apiform;
``
