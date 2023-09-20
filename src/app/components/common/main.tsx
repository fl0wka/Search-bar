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
import { paginate } from '../../utils';
import {
  IGithubLoginResponse,
  IYoutubeItemResponse,
} from '../../../types/types';
import Pagination from './pagination';

const Main = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeButton, setActiveButton] = useState<string>('github');
  const [githubCurrentPage, setGithubCurrentPage] = useState<number>(1);
  const [githubPerPage] = useState<number>(3);
  const [youtubeCurrentPage, setYoutubeCurrentPage] = useState<number>(1);
  const [youtubePerPage] = useState<number>(3);

  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveButton(event.currentTarget.innerText.toLowerCase());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleClick = (pageNumber: number): void => {
    if (activeButton === 'github') {
      setGithubCurrentPage(pageNumber);
    } else {
      setYoutubeCurrentPage(pageNumber);
    }
  };

  const clearSearchInput = (): void => {
    setSearchValue('');
  };

  const pageReset = () => {
    setGithubCurrentPage(1);
    setYoutubeCurrentPage(1);
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

  const isGithubButton = activeButton === 'github';
  const isYoutubeButton = activeButton === 'youtube';

  async function getData(searchValue: string) {
    if (isGithubButton) {
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
    pageReset();
  };

  const githubPaginate = paginate<IGithubLoginResponse>(
    githubCurrentPage,
    githubPerPage,
    githubData
  );

  const youtubePaginate = paginate<IYoutubeItemResponse>(
    youtubeCurrentPage,
    youtubePerPage,
    youtubeData
  );

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
          isGithubButton
            ? 'Искать на GitHub (по логину)'
            : 'Искать на YouTube (по названию видео)'
        }
        styleButton={
          isGithubButton
            ? 'bg-black hover:bg-slate-500'
            : 'bg-red-600 hover:bg-red-400'
        }
      />

      <div className="flex flex-wrap justify-center">
        {((githubLoadingStatus && isGithubButton) ||
          (youtubeLoadingStatus && isYoutubeButton)) && <Loader />}

        {((isGithubButton &&
          !githubTotalCountResults &&
          !githubLoadingStatus &&
          !githubSearchErr) ||
          (isYoutubeButton &&
            !youtubeTotalCountResults &&
            !youtubeLoadingStatus &&
            !youtubeSearchErr)) &&
          'Начните Ваш поиск'}

        {((isGithubButton &&
          !githubTotalCountResults &&
          !githubLoadingStatus &&
          githubSearchErr) ||
          (isYoutubeButton &&
            !youtubeTotalCountResults &&
            !youtubeLoadingStatus &&
            youtubeSearchErr)) &&
          'Ничего не найдено'}

        {isGithubButton && !githubSearchErr && (
          <CardGit data={githubPaginate} />
        )}
        {isYoutubeButton && !youtubeSearchErr && (
          <CardYoutube data={youtubePaginate} />
        )}
      </div>

      <Pagination
        onClick={handleClick}
        currentPage={isGithubButton ? githubCurrentPage : youtubeCurrentPage}
        perPage={isGithubButton ? githubPerPage : youtubePerPage}
        totalItems={isGithubButton ? githubData.length : youtubeData.length}
      />
    </>
  );
};

export default Main;
