import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieInfo from '../../templates/MovieInfo';
import * as utils from '../../../lib/utils';

import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 1rem;
`;

const WrapperCnt = styled.div`
    margin-bottom: 5rem;
    font-size: 2rem;
`;

const SearchQuery = styled.span`
  color: #79b3d4;
`;

const PrintMovieList = ({ movieList, handleOpen, query }) => {
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
            <div>
              <WrapperCnt>입력하신 <SearchQuery>{query}</SearchQuery>에 대한 검색결과 입니다.</WrapperCnt>
              <Card.Group itemsPerRow={4}>
                {movieInfoList}
              </Card.Group>
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}

const SearchResult = ({ movieList, handleOpen, query }) => {
  return(
    <div>
        <WrapperCnt>

        </WrapperCnt>
        <Wrapper>
          <PrintMovieList
              movieList={movieList}
              handleOpen={handleOpen}
              query={query}
          />
        </Wrapper>
    </div>
  );
}

export default SearchResult;
