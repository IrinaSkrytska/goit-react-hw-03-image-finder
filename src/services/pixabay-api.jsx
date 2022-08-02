export default async function fetchImages(searchKey, page) {
  const axios = require('axios');

  const API_KEY = '27726986-1b2491f220453818d3229fc31';

  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchKey}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`;

  const images = await axios.get(URL);

  const returnedImages = images.data.hits.map(
    ({ id, largeImageURL, tags, webFormatURL }) => {
      return {
        id,
        largeImageURL,
        tags,
        webFormatURL,
      };
    }
  );
  return returnedImages;
}
