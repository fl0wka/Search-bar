import React, { useState } from 'react';
import CardGit from '../ui/cardGit';
import CardYoutube from '../ui/cardYoutube';
import SearchField from './form/searchField';
import Button from './button';
import Loader from './loader';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  getGithubData,
  getGithubSearchErr,
  getGithubSearchStatus,
  getGithubTotalCountResults,
  githubSearch,
} from '../../store/githubSearch';
import {
  getYoutubeData,
  getYoutubeSearchErr,
  getYoutubeSearchStatus,
  getYoutubeTotalCountResults,
  youtubeSearch,
} from '../../store/youtubeSearch';

const Main = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string>('github');

  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const [perPage, setPerPage] = useState<number>(3)

  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton(event.currentTarget.innerText.toLowerCase());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const clearSearchInput = (): void => {
    setSearchValue('');
  };

  const dispatch = useAppDispatch();

  const githubData = useAppSelector(getGithubData());
  const githubLoadingStatus = useAppSelector(getGithubSearchStatus());
  const githubSearchErr = useAppSelector(getGithubSearchErr());
  const githubTotalCountResults = useAppSelector(getGithubTotalCountResults());

  const youtubeData = useAppSelector(getYoutubeData());
  const youtubeLoadingStatus = useAppSelector(getYoutubeSearchStatus());
  const youtubeSearchErr = useAppSelector(getYoutubeSearchErr());
  const youtubeTotalCountResults = useAppSelector(
    getYoutubeTotalCountResults()
  );

  async function getData(searchValue: string) {
    if (activeButton === 'github') {
      dispatch(githubSearch(searchValue));
    } else {
      dispatch(youtubeSearch(searchValue));
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue === '') return null;
    getData(searchValue);
    clearSearchInput();
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Поисковик</h1>
      <div className="flex justify-center mb-5">
        <Button
          onClick={handleButton}
          styleButton="bg-black hover:bg-slate-500"
        >
          GitHub
        </Button>
        <Button
          onClick={handleButton}
          styleButton="bg-red-600 hover:bg-red-400"
        >
          YouTube
        </Button>
      </div>
      <SearchField
        type="text"
        name="search"
        value={searchValue}
        onChange={handleChange}
        onSubmit={handleSubmit}
        placeholder={
          activeButton === 'github'
            ? 'Искать на GitHub (по логину)'
            : 'Искать на YouTube (по названию видео)'
        }
        styleButton={
          activeButton === 'github'
            ? 'bg-black hover:bg-slate-500'
            : 'bg-red-600 hover:bg-red-400'
        }
      />

      <div className="flex flex-wrap justify-center">
        {((githubLoadingStatus && activeButton === 'github') ||
          (youtubeLoadingStatus && activeButton === 'youtube')) && <Loader />}

        {((activeButton === 'github' &&
          !githubTotalCountResults &&
          !githubLoadingStatus &&
          !githubSearchErr) ||
          (activeButton === 'youtube' &&
            !youtubeTotalCountResults &&
            !youtubeLoadingStatus &&
            !youtubeSearchErr)) &&
          'Начните Ваш поиск'}

        {((activeButton === 'github' &&
          !githubTotalCountResults &&
          !githubLoadingStatus &&
          githubSearchErr) ||
          (activeButton === 'youtube' &&
            !youtubeTotalCountResults &&
            !youtubeLoadingStatus &&
            youtubeSearchErr)) &&
          'Ничего не найдено'}

        {activeButton === 'github' &&
          githubData.length > 0 &&
          !githubLoadingStatus &&
          !githubSearchErr && <CardGit data={githubData} />}
        {activeButton === 'youtube' &&
          youtubeData.length > 0 &&
          !youtubeLoadingStatus &&
          !youtubeSearchErr && <CardYoutube data={youtubeData} />}
      </div>
    </>
  );
};

export default Main;
