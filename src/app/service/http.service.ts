import axios from 'axios';
import configFile from '../config.json';

export const apiGithub = axios.create({
  baseURL: configFile.apiEndpoitGithub,
  headers: {
    Authorization: process.env.REACT_APP_SECRET_KEY_GITHUB,
  },
});
export const apiYoutube = axios.create({
  baseURL: configFile.apiEndpoitYoutube,
});
