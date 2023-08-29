import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import '../styles/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
.then(data => {
    data.forEach(element => {
        arrBreedsId.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selector,
        data: arrBreedsId
    });
    })
.catch(onFetchError);

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
    loader.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        selector.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    selector.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 3000,
        width: '250px',
        fontSize: '14px'
    });
};
   






    
// import axios from 'axios';
// import {fetchBreeds, fetchCatByBreeds} from './cat-api';
// import '../styles/style.css';

// document.addEventListener('DOMContentLoaded', async () => {
//   const selectBreeds = document.querySelector('.breed-select');
//   const catInfo = document.querySelector('.cat-info');
//   const loader = document.querySelector('.loader');
//   const errorErr = document.querySelector('.error');

//   loader.classList.replace('loader', 'is-hidden');
//   errorErr.classList.add('is-hidden');
//   catInfo.classList.add('is-hidden');

//   // async function fetchBreeds() {
//   //   try {
//   //     data.forEach(breed => {
//   //       const option = document.createElement('option');
//   //       option.value = breed.id;
//   //       option.text = breed.name;
//   //       selectBreeds.appendChild(option);
//   //     });
//   //   } catch (error) {
//   //     console.log(error);
//   //     errorErr.style.display = 'block';
//   //     loader.classList.replace('is-hidden', 'loader');
//   //   };
//   fetchBreeds().then(data => {
//     data.forEach(breed => {
//       const option = document.createElement('option');
//       option.value = breed.id;
//       option.text = breed.name;
//       selectBreeds.appendChild(option);
//     });
//     selectBreeds.style.display = 'block';
//     loader.classList.replace('is-hidden', 'loader');
//   }).catch(error => {
//     console.error('Error: it is not work');
//     errorErr.style.display = 'block';
//     loader.classList.replace('is-hidden', 'loader');
//   });

//   selectBreeds.addEventListener('change', async () => {
//     const onSelectBreed = selectBreeds.options[selectBreeds.selectedIndex];
//     const breedId = onSelectBreed.value;

//     catInfo.classList.add('is-hidden');
//     loader.classList.replace('loader', 'is-hidden');

//     try {
//       const catData = await fetchCatByBreeds(breedId);
//       catInfo.innerHTML = `
//             <img src="${catData.url}" alt="cat image" width="400"/>
//             <h1>${catData.breeds[0].name}</h1>
//             <p>${catData.breeds[0].description}</p>
//             <p><b>Temperament:</b> ${catData.breeds[0].temperament}</p>`;

//       catInfo.classList.replace('is-hidden');
//       loader.classList.replace('is-hidden', 'loader');
//       errorErr.style.display = 'none';
//     } catch (error) {
//       errorErr.style.display = 'block';
//       loader.classList.replace('is-hidden', 'loader');
//     }
//   });
// });