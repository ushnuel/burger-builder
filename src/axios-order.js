import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-b717c.firebaseio.com/',
});

export default instance;
