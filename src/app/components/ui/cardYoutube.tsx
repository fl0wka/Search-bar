import React from 'react';
import { ICardYoutubeProps } from '../../../types/types';

const CardYoutube: React.FC<ICardYoutubeProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div key={item.id.videoId} className="m-3 bg-white drop-shadow-xl w-96">
          <iframe
            width="100%"
            height="315"
            src={`http://www.youtube.com/embed/${item.id.videoId}`}
            // frameBorder="0"
            allowFullScreen
            title={item.snippet.title}
          ></iframe>
          <div className="flex flex-col justify-between text-left mb-1 mx-4">
            {item.snippet.description ? (
              <>
                <p className="mt-3">Описание:</p>
                <p className="mt-2">{item.snippet.description}</p>
              </>
            ) : null}
            <p className="mt-5 mb-3 text-right">
              Автор: "{item.snippet.channelTitle}"
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardYoutube;
