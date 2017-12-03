import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieInfo from '../../templates/MovieInfo';
import * as utils from '../../../lib/utils';

import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

const WrapperCnt = styled.div`
    margin-top: 5rem;
`;

const PrintMovieList = ({ movieList, handleOpen }) => {
    if(!utils.isEmpty(movieList)) {
        const movieInfoList = movieList.map((movie, i) => {
            const { code,
                    title,
                    title_eng,
                    title_url,
                    filmrate,
                    poster,
                    main_genre,
                    year,
                    d_day,
                    running_time_str,
                    watcha_rating
                  } = movie.item;
            return (
                <MovieInfo
                    key={i}
                    code={code}
                    title={title}
                    title_eng={title_eng}
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
        });

        return (
            <Card.Group itemsPerRow={4}>
              {movieInfoList}
            </Card.Group>
        );
    } else {
        return (
            <div>검색어를 입력해주세요.</div>
        )
    }
}

const SearchResult = ({ movieList, handleOpen }) => {
  return(
    <div>
        <WrapperCnt>

        </WrapperCnt>
        <Wrapper>
          <PrintMovieList
              movieList={movieList}
              handleOpen={handleOpen}
          />
        </Wrapper>
    </div>
  );
}

export default SearchResult;
