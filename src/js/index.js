import SlimSelect from 'slim-select';
import {fetchBreeds, fetchCatByBreeds} from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../styles/style.css';
// import 'slim-select/dist/slimselect.css';


const selectBreeds = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const err = document.querySelector('.error');

loader.classList.replace('loader', 'is-hidden');
err.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrayBreedId = [];

fetchBreeds().then(data=>{
    data.forEach(el => {
        arrayBreedId.push({text: el.name, value: el.id});
        console.log(data);
    });
    
    new SlimSelect({
        select: selectBreeds,
        data: arrayBreedId,
    });
}).catch(errorFail);

selectBreeds.addEventListener('change', onSelectBreed);

function onSelectBreed(e){
    loader.classList.replace('is-hidden', 'loader');
    selectBreeds.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = e.currentTarget.value;
    fetchCatByBreeds(breedId).then(data=>{
        loader.classList.replace('loader', 'is-hidden');
        selectBreeds.classList.remove('is-hidden');

        const {url, breeds} = data[0];

        catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box">
        <h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
        catInfo.classList.replace('is-hidden');
    }).catch(errorFail);
};

function errorFail(err){
    selectBreeds.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page!',
    {
        position:'center-center',
        timeout: 10000,
        width: '250px',
        fontSize: '14px'
    });
};