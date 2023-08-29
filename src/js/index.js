import axios from 'axios';
import {fetchBreeds, fetchCatByBreeds} from './cat-api';
import '../styles/style.css';

document.addEventListener('DOMContentLoaded', () => {
  const selectBreeds = document.querySelector('.breed-select');
  const catInfo = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorErr = document.querySelector('.error');

  loader.classList.replace('loader', 'is-hidden');
  errorErr.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const data = async function fetchBreeds() {
    try {
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        selectBreeds.appendChild(option);
      });
    } catch (error) {
      console.log(error);
      errorErr.style.display = 'block';
      loader.classList.replace('is-hidden', 'loader');
    };
    // function fetchBreeds().then(data => {
    //     data.forEach(breed => {
    //         const option = document.createElement('option');
    //         option.value = breed.id;
    //         option.text = breed.name;
    //         selectBreeds.appendChild(option);
    //     });
    //     selectBreeds.style.display = 'block';
    //     loader.classList.replace('is-hidden', 'loader');
    // }).catch(error => {
    //     console.error('Error: it is not work');
    //     errorErr.style.display = 'block';
    //     loader.classList.replace('is-hidden', 'loader');
    // });

    selectBreeds.addEventListener('change', async () => {
      const onSelectBreed = selectBreeds.options[selectBreeds.selectedIndex];
      const breedId = onSelectBreed.value;

      catInfo.classList.add('is-hidden');
      loader.classList.replace('loader', 'is-hidden');

      try {
        const catData = await fetchCatByBreeds(breedId);
        catInfo.innerHTML = `
            <img src="${catData.url}" alt="cat image" width="400"/>
            <h1>${catData.breeds[0].name}</h1>
            <p>${catData.breeds[0].description}</p>
            <p><b>Temperament:</b> ${catData.breeds[0].temperament}</p>`;

        catInfo.classList.replace('is-hidden');
        loader.classList.replace('is-hidden', 'loader');
        errorErr.style.display = 'none';
      } catch (error) {
        errorErr.style.display = 'block';
        loader.classList.replace('is-hidden', 'loader');
      }
    });

  }
});