import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_TwsPnWVWgRd7Je8KwFxuzAGnQywMPFuZYtMA8QXjIsdil17ShXwDaD7XZtCENu2s";
// const API_KEY = "live_TwsPnWVWgRd7Je8KwFxuzAGnQywMPFuZYtMA8QXjIsdil17ShXwDaD7XZtCENu2s";
const url = 'https://api.thecatapi.com/v1';

export async function fetchBreeds() {
    const breeds_url = `${url}/breeds`;
    const response = await axios.get(breeds_url);
    return response.data;
    // return fetch(`${url}/breeds?api_key=${API_KEY}`)
    //     .then(response => {
    //         console.log(response);
    //         if (!response.ok) {
    //             throw new Error('Ooops, try more, maybe something will work!');
    //         }
    //         return response.json();
    //     });
};

export async function fetchCatByBreeds(breedId){
    const cat_url = `${url}/images/search?breed_id=${breedId}`;
    const response = await axios.get(cat_url);
    return response.data;
    // return fetch(`${url}/images/search?api_key=${API_KEY}&breed_id=${breedId}`)
    // .then(response =>{
    //     if(!response.ok) {
    //         throw new Error('Ooops, try more, maybe something will work!');
    //     }
    //     return response.json();
    // });
};