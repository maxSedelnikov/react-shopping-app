import axios from 'axios';

const { REACT_APP_FIREBASE_DB_URL } = process.env;

// basic setup for working with cart API

export default axios.create({
  baseURL: REACT_APP_FIREBASE_DB_URL,
});
