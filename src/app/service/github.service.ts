import {
  IGithubLoginResponse,
  IGithubSearchUsersResponse,
} from '../../types/types';
import { apiGithub } from './http.service';

const githubService = {
  getUsers: async (searchValue: string) => {
    const { data } = await apiGithub.get<IGithubSearchUsersResponse>(
      `search/users?q=${searchValue}`
    );
    return data;
  },
  getInfoUser: async (login: string) => {
    const { data } = await apiGithub.get<IGithubLoginResponse>(
      `users/${login}`
    );
    return data;
  },
};

export default githubService;
