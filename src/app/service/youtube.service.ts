import { IYoutubeSearchResponse } from '../../types/types';
import { apiYoutube } from './http.service';

const youtubeService = {
  get: async (searchValue: string) => {
    const { data } = await apiYoutube.get<IYoutubeSearchResponse>(
      `search?type=video&part=snippet&maxResults=12&q=${searchValue}&key=AIzaSyASvchktU9Qx6SjXbWupVLtW8WgYpBBfSw`
    );
    return data;
  },
};

export default youtubeService;
