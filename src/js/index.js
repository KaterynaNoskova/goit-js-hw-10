import axios from 'axios';
import { Notify } from 'notiflix';
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

    fetchBreeds().then(data => {
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            selectBreeds.appendChild(option);
        });
        selectBreeds.style.display = 'block';
        loader.classList.replace('is-hidden', 'loader');
    }).catch(error => {
        console.error('Error: it is not work((');

        errorErr.style.display = 'block';
        loader.classList.replace('is-hidden', 'loader');
    });

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

});



// const data = async function fetchBreed(){
//     data.forEach(el => {
//         arrayBreedId.push({ text: el.name, value: el.id });
//         // console.log(data);
//     });
//     selectBreeds.insertAdjacentHTML("beforeend", arrayBreedId);
//     new SlimSelect({
//         select: selectBreeds,
//         data: arrayBreedId,
//     });
// };

// selectBreeds.addEventListener('change', onSelectBreed);

// function onSelectBreed(e){
//     loader.classList.replace('is-hidden', 'loader');
//     selectBreeds.classList.add('is-hidden');
//     catInfo.classList.add('is-hidden');

//     const breedId = e.currentTarget.value;
//     fetchCatByBreeds(breedId).then(data=>{
//         loader.classList.replace('loader', 'is-hidden');
//         selectBreeds.classList.remove('is-hidden');

//         const {URL, breeds} = data[0];

//         catInfo.innerHTML = `<div class="box-img"><img src="${URL}" alt="${breeds[0].name}" width="400"/></div><div class="box">
//         <h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
//         catInfo.classList.replace('is-hidden');
//     }).catch(errorFail);
// };

// function errorFail(err){
//     selectBreeds.classList.remove('is-hidden');
//     loader.classList.replace('loader', 'is-hidden');

//     Notify.failure('Oops! Something went wrong! Try reloading the page!',
//     {
//         position:'center-center',
//         timeout: 10000,
//         width: '250px',
//         fontSize: '14px'
//     });
// };