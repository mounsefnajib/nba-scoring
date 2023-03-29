

import axios from 'axios';

 let axiosInstance = axios.create({
  baseURL: "https://free-nba.p.rapidapi.com",
  headers: {
    'Content-type': 'application/json',
    'X-RapidAPI-Key':'2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
  }
});
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

