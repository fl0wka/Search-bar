import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './createStore';
import { IGithubLoginResponse } from '../../types/types';
import { sortBySearch } from '../utils';
import { isGithubData, isGithubLoginData } from '../../guards/guards';
import githubService from '../service/github.service';

interface IGithubState {
  entities: IGithubLoginResponse[];
  totalCountResults: number | null;
  isLoading: boolean;
  error: null | string;
}

interface IActionType {
  entities: IGithubLoginResponse[];
  totalCountResults: number | null;
}

const initialState: IGithubState = {
  entities: [],
  totalCountResults: null,
  isLoading: false,
  error: null,
};

export const githubSearchSlice = createSlice({
  name: 'githubSearch',
  initialState,
  reducers: {
    githubSearchRequested: (state) => {
      state.isLoading = true;
      state.entities = [];
      state.totalCountResults = null;
    },
    githubSearchReceived: (state, action: PayloadAction<IActionType>) => {
      state.isLoading = false;
      state.error = null;
      state.entities = action.payload.entities;
      state.totalCountResults = action.payload.totalCountResults;
    },
    githubSearchRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: githubSearchReducer, actions } = githubSearchSlice;
const {
  githubSearchRequested,
  githubSearchReceived,
  githubSearchRequestFailed,
} = actions;

export const githubSearch =
  (searchValue: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(githubSearchRequested());
      // получаем массив с результатами поиска
      const usersData = await githubService.getUsers(searchValue);
      // Проверка Type Guard
      if (isGithubData(usersData)) {
        // Вытаскиваем в массив логины
        const usersLogin = usersData.items.map((user) => user.login);
        // сортировка по логину
        const sortUsersData = sortBySearch(usersLogin, searchValue);
        const totalCountResults = usersData.total_count;
        if (totalCountResults > 0 && sortUsersData.length > 0) {
          const usersInfoData: IGithubLoginResponse[] = [];
          // запрос по логину на подробную инфу каждого элемента массива
          await Promise.all(
            sortUsersData.map((item) => githubService.getInfoUser(item))
          ).then((res) => {
            for (let user of res) {
              // Проверка Type Guard
              if (isGithubLoginData(user)) {
                usersInfoData.push(user);
              } else {
                throw new Error('login DATA type Error');
              }
            }
          });
          dispatch(
            githubSearchReceived({ entities: usersInfoData, totalCountResults })
          );
        } else {
          throw new Error('Ничего не найдено');
        }
      } else {
        throw new Error('search DATA type error');
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(githubSearchRequestFailed(error.message));
      }
    }
  };

export const getGithubData = () => (state: RootState) =>
  state.githubSearch.entities;
export const getGithubSearchStatus = () => (state: RootState) =>
  state.githubSearch.isLoading;
export const getGithubTotalCountResults = () => (state: RootState) =>
  state.githubSearch.totalCountResults;
export const getGithubSearchErr = () => (state: RootState) =>
  state.githubSearch.error;

export default githubSearchReducer;
