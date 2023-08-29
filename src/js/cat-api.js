import axios from "axios";

const api_key = "live_TwsPnWVWgRd7Je8KwFxuzAGnQywMPFuZYtMA8QXjIsdil17ShXwDaD7XZtCENu2s";
export async function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';
    try {
        const response = await axios.get(url, {
            headers: {
                'x-api-key': api_key
            }
        });
        console.log(response.data);
        return response.data[0];
    } catch (err) {
        throw new Error ('FetchBreeds Error!')
    }
};


export async function fetchCatByBreeds(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    try {
        const response = await axios.get(url, {
            headers: {
                'x-api-key': api_key
            }
        });
        // console.log(response.data);
        return response.data[0];
    } catch (err) {
        throw new Error('FetchCatByBreeds Error!')
    }
};