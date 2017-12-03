import React from 'react';
import { Modal, Header, Image, Embed, Segment, Grid, Item, Card, Rating } from 'semantic-ui-react';

import MovieInfo from '../../templates/MovieInfo';
import * as utils from '../../../lib/utils';

import { Carousel } from 'react-responsive-carousel';
import '../../../css/carousel.css';

const SimilarMovieList = ({similarMovies, handleOpen}) => {
    const movieList = similarMovies.map((movie, i) => {
        const { code,
                title,
                title_url,
                filmrate,
                poster,
                nation,
                main_genre,
                year,
                d_day,
                running_time,
                watcha_rating
        } = movie.items[0].item;

        let running_time_str = `${running_time}분`;

        return(
            <MovieInfo
                key={i}
                code={code}
                title={title}
                title_eng={title_url}
                filmrate={filmrate}
                poster={poster}
                main_genre={main_genre}
                running_time_str={running_time_str}
                year={year}
                d_day={year}
                watcha_rating={watcha_rating}
                handleOpen={handleOpen}
                gubun={'movieDetail'}
            />
        );
    });
    
    return(
      <Segment>
        <Header>비슷한 영화 추천</Header>
        <Modal.Description>
          <Card.Group itemsPerRow={4}>
              {movieList}
          </Card.Group>
        </Modal.Description>
      </Segment>
    );
};

const PeopleInfo = ({items, gubun}) => {
    const itemsInfo = items.map((item, i) => {
        return (
          <Card key={i}>
            <Card.Content>
              <Image floated='left' size='mini' src={`${item.photo.medium.url}`} />
              <Card.Header>
                {item.name}
              </Card.Header>
              <Card.Meta>
                {item.role}
              </Card.Meta>
            </Card.Content>
          </Card>
        );
    });

    return (
        <div>
          <Header>{gubun}</Header>
          <Card.Group itemsPerRow={1}>
              {itemsInfo}
          </Card.Group>
        </div>

    );
};

const PrintMovieInfo = ({ movieInfo, similarMovies, open, handleHide, handleOpen }) => {
    const {
      title,
      title_eng,
      poster,
      audience_count,
      main_genre,
      year,
      running_time_str,
      nation,
      story,
      directors,
      actors,
      filmrate,
      youtube_id,
      stillcut,
      d_day,
      watcha_rating,
      media
    } = movieInfo;

    let {largePoster, releaseDay, audienceCnt} = '';
    releaseDay = utils.getOpenDate(d_day);
    audienceCnt = utils.getAudience(audience_count);

    if(!utils.isEmpty(poster)) {
        largePoster = poster.original;
    }

    const stillCutList = utils.getStillCutList(media);
    const stillCutDiv = stillCutList.map((item, i) => {
        return (
            <div key={i}>
                <img src={`${item.fullhd.url}`} alt='' />
            </div>
        );
    });

    return(
        <Modal size='large' open={open} onClose={() => handleHide()}>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column>
                <Modal.Content>
                  <Carousel emulateTouch showThumbs={false} autoPlay interval={3000} infiniteLoop>
                      {stillCutDiv}
                  </Carousel>
                </Modal.Content>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={10}>
                <Segment>
                  <Header>영화정보</Header>
                    <Item.Group>
                      <Item>
                        <Item.Image size='medium' src={`${largePoster}`} />

                        <Item.Content verticalAlign='middle'>
                          <Item.Header as='a'>{title} ({title_eng})</Item.Header>
                          <Item.Description>
                            장르 : {main_genre}<br/>
                            국가 : {nation}<br/>
                            개봉일 : {releaseDay}<br/>
                            관람등급 : {filmrate}<br/>
                            누적 관객수 : {audienceCnt}명<br/>
                            러닝타임 : {running_time_str}<br/>
                          </Item.Description><br/>

                          <Item.Header>줄거리</Item.Header>
                          <Item.Description>{story}</Item.Description><br/>

                          <Item.Header>평점</Item.Header>
                          <Item.Extra><Rating icon='star' defaultRating={watcha_rating} maxRating={5} disabled/></Item.Extra>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Segment>

                  <SimilarMovieList
                      similarMovies={similarMovies}
                      handleOpen={handleOpen}
                  />
              </Grid.Column>

              <Grid.Column width={6}>
                <Header>예고편</Header>
                <Embed
                    id={youtube_id}
                    placeholder={stillcut}
                    source='youtube'
                />
                <br/>
                <PeopleInfo
                    items={directors}
                    gubun='감독'
                />
                <br/>
                <PeopleInfo
                    items={actors}
                    gubun='출연'
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal>
    );
}

const MovieDetail = ({ open, movieInfo, similarMovies, handleHide, handleOpen }) => {
  return(
      <PrintMovieInfo
          movieInfo={movieInfo}
          open={open}
          similarMovies={similarMovies}
          handleHide={handleHide}
          handleOpen={handleOpen}
      />
  );
}

export default MovieDetail;
