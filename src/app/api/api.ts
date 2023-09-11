/****** NOT USED ******/

const BASE_URL_GITHUB = 'https://api.github.com/';
const BASE_URL_YOUTUBE = 'https://www.googleapis.com/youtube/v3/';

export function resolveUsers(searchValue: string): string {
  return `${BASE_URL_GITHUB}search/users?q=${searchValue}`;
}

export function resolveInfoUsers(login: string): string {
  return `${BASE_URL_GITHUB}users/${login}`;
}

export function resolveVideos(searchValue: string): string {
  return `${BASE_URL_YOUTUBE}search?type=video&part=snippet&maxResults=12&q=${searchValue}&key=AIzaSyASvchktU9Qx6SjXbWupVLtW8WgYpBBfSw`;
}
