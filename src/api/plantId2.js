import axios from 'axios';

export default axios.create({
  baseURL: 'https://my-api.plantnet.org/v2/identify',
  headers: {
    'Authorization': 'Bearer 2b10RKUihAOQyqjtdIlcLGJWe',
    'Content-Type': 'multipart/form-data',
  },
});
