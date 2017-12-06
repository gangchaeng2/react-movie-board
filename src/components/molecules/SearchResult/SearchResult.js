import React from 'react';
import { Card, Loader, Dimmer } from 'semantic-ui-react';

import MovieInfo from '../../templates/MovieInfo';
import * as utils from '../../../lib/utils';

import './SearchResult.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 1rem;
    margin: 0 auto;
`;

const PrintMovieList = ({ movieList, handleOpen, query, totalCnt }) => {
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
              <div className='search-result'>입력하신 <span className='result-count'>{query}</span>에 대한 검색결과 {totalCnt}건 입니다.</div>
              <Card.Group itemsPerRow={5}>
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

const SearchResult = ({ movieList, handleOpen, query, loadingStatus, doPaging, totalCnt, infoLoadingStatus }) => {
  return (
    <div>
      <Wrapper>
        <Dimmer
          active={loadingStatus}
          content={<Loader indeterminate size="massive">Searching MovieList</Loader>}
          page
        />
        <Dimmer
          active={infoLoadingStatus}
          content={<Loader indeterminate size="massive">Loading MovieInfo</Loader>}
          page
        />
        <PrintMovieList
            movieList={movieList}
            handleOpen={handleOpen}
            query={query}
            totalCnt={totalCnt}
        />
      </Wrapper>
    </div>
  );
}

export default SearchResult;
