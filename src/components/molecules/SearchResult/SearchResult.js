import React from 'react';
import { Card, Loader, Dimmer, Button, Grid, Icon } from 'semantic-ui-react';

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
              입력하신 {query}에 대한 검색결과 {totalCnt}건 입니다.
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

const SearchResult = ({ movieList, handleOpen, query, loadingStatus, doPaging, page, totalCnt, infoLoadingStatus }) => {
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
        <Grid centered={true}>
          <Grid.Row centered={true}>
            <Grid.Column width={13}>
              <PrintMovieList
                  movieList={movieList}
                  handleOpen={handleOpen}
                  query={query}
                  totalCnt={totalCnt}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Wrapper>
    </div>
  );
}

export default SearchResult;
