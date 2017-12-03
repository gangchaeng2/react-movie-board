import React from 'react';
import { Grid, Feed, Card, Item, Label, Segment, Rating } from 'semantic-ui-react'

import MovieCarousel from './MovieCarousel';

import * as utils from '../../../lib/utils';

import styled from 'styled-components';

const Wrapper = styled.div`
    margin-top: 5rem;
`;

const showLabel = (data) => {
    let show = data;
    if(!utils.isEmpty(show)) {
      return (
        <Label>{show}</Label>
      );
    }
}

const BoxOfficeDetailItem = ({ releaseInfo, title, code, audience, actors, directors, poster, nation, main_genre, filmrate, watcha_rating, interesting_comment, handleOpen }) => {
    return (
        <Item>
          <Item.Image as='a' src={`${poster.original}`} onClick={() => handleOpen(title, code)}/>
          <Item.Content verticalAlign='middle'>
            <Item.Header as='a' onClick={() => handleOpen(title, code)}>{title}</Item.Header><br/><br/>
            <Item.Meta>
              <span className='cinema'>{releaseInfo}</span> | <span className='cinema'>누적 관객수 {audience}명</span>
            </Item.Meta>
            <Item.Description>
              평점 : <Rating defaultRating={watcha_rating} maxRating={5} disabled icon='star'/><br/>
              감독 : {directors} <br/>
              출연 : {actors}
            </Item.Description>
            <Item.Extra>
                {showLabel(nation)}
                {showLabel(main_genre)}
                {showLabel(filmrate)}
            </Item.Extra>
            <Segment>
              <Feed>
                <Feed.Event
                  icon='pencil'
                  summary={interesting_comment.text}
                />
              </Feed>
            </Segment>
          </Item.Content>
        </Item>
    );
}

const PrintBoxOfficeDetail = ({boxOfficeList, handleOpen}) => {
    const detailMovieList = boxOfficeList.map((movie, i) => {
        const { code, title, d_day, audience_count, main_casts, directors, poster, nation, main_genre, filmrate, watcha_rating, interesting_comment } = movie.items[0].item;
        const releaseInfo = utils.getRelaseInfo(d_day);
        const audience = utils.getAudience(audience_count);
        const actors = utils.getPeopleList(main_casts);
        let director = utils.getPeopleList(directors);

        return (
            <BoxOfficeDetailItem
                key={i}
                code={code}
                title={title}
                releaseInfo={releaseInfo}
                audience={audience}
                actors={actors}
                directors={director}
                poster={poster}
                nation={nation}
                main_genre={main_genre}
                filmrate={filmrate}
                watcha_rating={watcha_rating}
                interesting_comment={interesting_comment}
                handleOpen={handleOpen}
            />
        );
    });

    return (
          <Grid.Column width={12}>
            <Segment>
              <Item.Group divided>
                  {detailMovieList}
              </Item.Group>
            </Segment>
          </Grid.Column>
    );
}

const BoxOfficeItem = ({ title, poster, releaseDay, code, handleOpen }) => {
    return (
      <Feed.Event as='a' onClick={() => handleOpen(title, code)}>
        <Feed.Label image={`${poster.small}`} />
        <Feed.Content>
          <Feed.Date content={`${releaseDay} 개봉`} />
          <Feed.Summary>
            {title}<br/>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
}

const PrintBoxOfficeList = ({ boxOfficeList, handleOpen }) => {
    const movieList = boxOfficeList.map((movie, i) => {
        const { code, title, poster, d_day } = movie.items[0].item;
        const releaseDay = utils.getOpenDate(d_day);

        return (
            <Feed key={i}>
                <BoxOfficeItem
                    code={code}
                    title={title}
                    poster={poster}
                    releaseDay={releaseDay}
                    handleOpen={handleOpen}
                />
            </Feed>
        );
    });

    return (
      <Grid.Column width={3}>
          <Card>
            <Card.Content>
              <Card.Header>
                박스 오피스
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                  {movieList}
              </Feed>
            </Card.Content>
          </Card>
      </Grid.Column>
    );
}

const BoxOfficeList = ({ boxOfficeList, handleOpen }) => {
  return(
      <div>
        <MovieCarousel
            boxOfficeList={boxOfficeList}
        />
        <Wrapper>
          <Grid columns={2}>
            <PrintBoxOfficeList
                boxOfficeList={boxOfficeList}
                handleOpen={handleOpen}
            />
            <PrintBoxOfficeDetail
                boxOfficeList={boxOfficeList}
                handleOpen={handleOpen}
            />
          </Grid>
        </Wrapper>
      </div>
  );
}

export default BoxOfficeList;
