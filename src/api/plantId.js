import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.plant.id/v2/identify',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Api-Key': 'RwhzVgXE7cbbAQkUmtRhaTskUOtOJaejAWYjRkpUnejgyEsRcp',
  },
});
