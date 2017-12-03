import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieInfo from '../../templates/MovieInfo';

const PrintCateMovieList = ({ cateMovieList, handleOpen }) => {
    const movieList = cateMovieList.map((movie, i) => {
      const { code, title, title_url
        , filmrate, poster, main_genre
        , running_time_str, year, d_day
        , watcha_rating} = movie.items[0].item;
      return (
          <MovieInfo
              key={i}
              code={code}
              title={title}
              title_url={title_url}
              filmrate={filmrate}
              poster={poster}
              main_genre={main_genre}
              running_time_str={running_time_str}
              year={year}
              d_day={d_day}
              watcha_rating={watcha_rating}
              handleOpen={handleOpen}
          />
      );
    }
  )

  return (
    <div>
      <Card.Group itemsPerRow={4}>
          {movieList}
      </Card.Group>
    </div>
  );
}

export default PrintCateMovieList;
