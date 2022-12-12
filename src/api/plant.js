import axios from 'axios';

export default axios.create({
  baseURL: 'https://house-plants.p.rapidapi.com/common/',
  headers: {
    'X-RapidAPI-Key': '21842dc8fbmshe153a61d95670e9p1e0fbfjsndb55deaa47fc',
    'X-RapidAPI-Host': 'house-plants.p.rapidapi.com',
  },
});
