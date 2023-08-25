const API_KEY = "live_TwsPnWVWgRd7Je8KwFxuzAGnQywMPFuZYtMA8QXjIsdil17ShXwDaD7XZtCENu2s";
const url = 'https://api.thecatapi.com/v1';
// SEARCH_BREEDS_URL = 'https://api.thecatapi.com/v1/images';

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${API_KEY}`)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Ooops, try more, maybe something will work!');
            }
            return response.json();
        });
};

export function fetchCatByBreeds(breedId){
    return fetch(`${url}/images/search?api_key=${API_KEY}&breed_id=${breedId}`)
    .then(response =>{
        if(!response.ok) {
            throw new Error('Ooops, try more, maybe something will work!');
        }
        return response.json();
    });
};