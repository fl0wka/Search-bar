import axios from 'axios';
import configFile from '../config.json';

export const apiGithub = axios.create({
  baseURL: configFile.apiEndpoitGithub,
  // headers: {
  //   Authorization: `Bearer ${process.env.REACT_APP_SECRET_KEY_GITHUB}`,
  // },
  headers: {
    Authorization: `Bearer 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`,
  },
});
export const apiYoutube = axios.create({
  baseURL: configFile.apiEndpoitYoutube,
});
