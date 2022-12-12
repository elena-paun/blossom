import axios from 'axios';

export default axios.create({
  baseURL: 'https://open.plantbook.io/api/v1/plant/detail',
  headers: {
    'Content-type': 'application/json',
    'Authorization':
      'Bearer ecWdNPewdxzdzslhXaSbx2a2ukMfsLlo09Rk43tbbaVhawV7MxeiuGCiaHXlpXxNkNYNkfLfAiDSi2XPFGfbsOtscWwO1VWlypq1NYMBIo9VSEUHzRgWjIZ6AVZRstdp',
  },
});
