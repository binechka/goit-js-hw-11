
import axios from 'axios'
const form = docuent.querySelector(".search-form")
const BASE_URL = "https://pixabay.com/api/"
const KEY = "29484830-76fccc07f1533db157d533c94"
let url =  `${BASE_URL}users`

    const options = {
        method: "GET",

        params: {
            key: `${KEY}`,
            q: value,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        },
    };


    async function getUser() {
        try {
            const response = await axios.get(url, options);
           return response;
        } catch (error) {
            console.error(error);
        }
    }


form.addEventListener("submit", (e => {
    e.preventDefault();
    getUser()
}))