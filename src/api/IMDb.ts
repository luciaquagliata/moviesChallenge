import axios, { AxiosInstance } from "axios";

const imdbApi: AxiosInstance = axios.create({
  baseURL: "https://imdb236.p.rapidapi.com/api/imdb/autocomplete",
  headers: {
    "x-rapidapi-host": "imdb236.p.rapidapi.com",
    "x-rapidapi-key": "9ed75d026dmsh93c82a74fdc114ap1851f3jsndd9dd4697f0e",
  },
});

export default imdbApi;
