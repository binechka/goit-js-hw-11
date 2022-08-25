import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector(".search-form")
const galleryEl = document.querySelector(".gallery")
const loadingBtn = document.querySelector(".load-more")
const BASE_URL = "https://pixabay.com/api/"
const KEY = "29484830-76fccc07f1533db157d533c94"

let formSearch = "";
let currentPage = 1;


async function getGallery(formSearch) {
  const options = {
    params: {
        key: `${KEY}`,
        q: formSearch,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: currentPage,
        per_page: 3,
    },
}
      try {
            const response = await axios.get(BASE_URL, options); 
           return response.data;
        } catch (error) {
            console.log(error);
        } 
    };

form.addEventListener("submit",searchPhoto)

async function searchPhoto(e) {
  e.preventDefault();
  currentPage = 1;
  formSearch = form.elements.searchQuery.value;
  try {
const response = await getGallery(formSearch)
  galleryEl.innerHTML = addPhoto(response.hits);
    currentPage += 1;
     if (response.hits.length == 0)
            return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  } catch (error){
console.log(error);
  } 
  const SimpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 150,
       captionPosition: 'bottom',
    
}).refresh();
}
function addPhoto(data) {
    return data.map(({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) => {
        return` <a href="${largeImageURL}"> <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
</a>`
    }).join("")
   
}


loadingBtn.addEventListener("click", clickPhoto)

async function clickPhoto() {
    
    try {
      const response = await getGallery(formSearch)
    galleryEl.innerHTML += addPhoto(response.hits);
      currentPage += 1;
     const SimpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 150,
       captionPosition: 'bottom',
    
}).refresh();
        
        return response.data;
 
        } catch (error) {
            console.error(error);
  }
 

}


