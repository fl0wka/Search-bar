import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './createStore';
import { IYoutubeItemResponse } from '../../types/types';
import { isYoutubeData } from '../../guards/guards';
import youtubeService from '../service/youtube.service';

interface YoutubeState {
  entities: IYoutubeItemResponse[];
  isLoading: boolean;
  error: string | null;
  totalCountResults: number | null;
}

interface IActionType {
  entities: IYoutubeItemResponse[];
  totalCountResults: number | null;
}

const initialState: YoutubeState = {
  entities: [],
  isLoading: false,
  error: '',
  totalCountResults: null,
};

export const youtubeSearchSlice = createSlice({
  name: 'youtubeSearch',
  initialState,
  reducers: {
    youtubeSearchRequested: (state) => {
      state.entities = [];
      state.isLoading = true;
      state.totalCountResults = null;
    },
    youtubeSearchReceived: (state, action: PayloadAction<IActionType>) => {
      state.isLoading = false;
      state.error = null;
      state.entities = action.payload.entities;
      state.totalCountResults = action.payload.totalCountResults;
    },
    youtubeSearchRequestFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: youtubeSearchReducer, actions } = youtubeSearchSlice;
const {
  youtubeSearchRequested,
  youtubeSearchReceived,
  youtubeSearchRequestFailed,
} = actions;

export const youtubeSearch =
  (searchValue: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(youtubeSearchRequested());
      const youtubeData = await youtubeService.get(searchValue);
      // Проверка Type Guard
      if (isYoutubeData(youtubeData)) {
        const totalCountResults = youtubeData.pageInfo.totalResults;
        if (totalCountResults > 0) {
          dispatch(
            youtubeSearchReceived({
              entities: youtubeData.items,
              totalCountResults,
            })
          );
        } else {
          throw new Error('Ничего не найдено');
        }
      } else {
        throw new Error('Ошибка type YoutubeData');
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(youtubeSearchRequestFailed(error.message));
      }
    }
  };

export const getYoutubeData = () => (state: RootState) =>
  state.youtubeSearch.entities;
export const getYoutubeSearchStatus = () => (state: RootState) =>
  state.youtubeSearch.isLoading;
export const getYoutubeTotalCountResults = () => (state: RootState) =>
  state.youtubeSearch.totalCountResults;
export const getYoutubeSearchErr = () => (state: RootState) =>
  state.youtubeSearch.error;

export default youtubeSearchReducer;
