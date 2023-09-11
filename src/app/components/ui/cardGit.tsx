import React from 'react';
import { ICardGitProps } from '../../../types/types';

const CardGit: React.FC<ICardGitProps> = ({ data }) => {
  if (data) {
    return (
      <>
        {data.map((i) => (
          <div key={i.id} className="m-3 p-2 bg-white drop-shadow-xl">
            <div>
              <img className="w-72 mb-2" src={`${i.avatar_url}`} alt="avatar" />
            </div>
            <div>
              <div className="mb-8">
                {i.name ? (
                  <p className="text-2xl font-semibold">{i.name}</p>
                ) : (
                  <p className="text-lg">(Имя не указано)</p>
                )}
                <p className="text-lg">({i.login})</p>
              </div>
              <div className="flex justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {i.location ? <p>{i.location}</p> : <p>(не указано)</p>}
              </div>
              <div className="flex justify-between items-center mb-1 mx-4">
                <div className="flex flex-col text-left text-sm">
                  <p>
                    followers: <b>{i.followers}</b>
                  </p>
                  <p>
                    following: <b>{i.following}</b>
                  </p>
                </div>
                <a href={i.html_url} type="button">
                  <img
                    className="w-8 rounded-sm"
                    src="img/logoGithub.png"
                    alt="logo"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
  return <div>'loading...'</div>;
};

export default CardGit;
