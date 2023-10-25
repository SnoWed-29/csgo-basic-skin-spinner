const express = require('express');
const app = express();
const PORT = 5000;
const axios = require('axios');

const url = 'https://bymykel.github.io/CSGO-API/api/en/skins.json';

const rarityPercentages = {
  'Consumer Grade': 40,
  'Industrial Grade': 20,
  'Mil-Spec Grade': 15,
  'Classified': 10,
  'Covert': 5,
  'Rare Special': 5,
  'Contraband': 5,
  'Extraordinary': 5,
};

const selectRandomRarity = () => {
  let randomRarity = Math.random() * 100;
  let selectedRarity;

  for (const rarity in rarityPercentages) {
    if (randomRarity <= rarityPercentages[rarity]) {
      selectedRarity = rarity;
      break;
    } else {
      randomRarity -= rarityPercentages[rarity];
    }
  }

  return selectedRarity;
};

const getDesertEagleSkin = async () => {
  try {
    const response = await axios.get(url);
    const allSkins = response.data;

    while (true) {
      const selectedRarity = selectRandomRarity();

      // Filter the skins based on the selected rarity
      const filteredSkins = allSkins.filter(skin => skin.rarity.name === selectedRarity);

      // Filter the skins based on the weapon "Desert Eagle"
      const filteredDesertEagleSkins = filteredSkins.filter(skin => skin.weapon.name === 'Desert Eagle');

      if (filteredDesertEagleSkins.length > 0) {
        // Select a random skin from the filtered Desert Eagle skins
        const randomIndex = Math.floor(Math.random() * filteredDesertEagleSkins.length);
        const randomSkin = filteredDesertEagleSkins[randomIndex];

        // Log the random Desert Eagle skin with selected fields
        console.log({
          id: randomSkin.id,
          name: randomSkin.name,
          rarity: randomSkin.rarity.name,
          image: randomSkin.image,
          weapon: randomSkin.weapon.name
        });

        break; // Exit the loop when a match is found
      }
    }
  } catch (error) {
    console.error(error);
  }
};

app.listen(PORT, () => {
  console.log("Application is listening on PORT " + PORT);
});

getDesertEagleSkin();
