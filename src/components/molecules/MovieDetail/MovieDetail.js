import React, { Component } from 'react';
import { Modal, Icon, Header, Image, Segment, Grid, Item, Card, Rating, Button } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

import MovieInfo from '../../templates/MovieInfo';
import * as utils from '../../../lib/utils';

import './MovieDetail.css';
import styled from 'styled-components';

const PeopleName = styled.span`
    font-size: 0.8rem;
`;
const PeopleRole = styled.span`
    margin-top: -0.5px;
    font-size: 0.7rem;
    color: grey;
`;

class MovieDetail extends Component {
    state = { open : false };

    onOpen = () => {
        this.setState({
            open2: true
        });
    }

    onClose = () => {
        this.setState({
          open2: false
        });
    }

    PlayTrailer = ({ youtubeId, stillCut }) => {
        const modalStyle = {
            height: "600px",
            background: "black"
        };
        const buttonStyle = {
            background: "black",
            margin: '5px 5px',
        }
        const videoSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;
        const { open2 } = this.state;

        if(!utils.isEmpty(youtubeId)) {
            return(
                <Modal size='small' open={open2} onOpen={this.onOpen}
                    dimmer={false} trigger={<div className='trailer'><Header>예고편</Header><Image src={stillCut} label={{ as: 'a', color: 'red', content: 'Play', icon: 'video play outline', ribbon: true, size: 'big' }}/></div>} style={modalStyle}>
                    <Button icon circular={true} style={buttonStyle} onClick={this.onClose} floated='right'><Icon name='close' color='grey'/></Button>
                    <Modal.Content style={modalStyle}>
                      <iframe className="player" title="trailer" type="text/html" src={videoSrc} frameBorder="0" width="100%" height="550px"/>
                    </Modal.Content>
                </Modal>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    SimilarMovieList = ({similarMovies, handleOpen}) => {
        const movieList = similarMovies.map((movie, i) => {
            const { code,
                    title,
                    title_url,
                    filmrate,
                    poster,
                    main_genre,
                    year,
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
                    gubun={'simillarMoive'}
                />
            );
        });

        return(
          <div>
            <Header>비슷한 영화 추천</Header>
              <Card.Group itemsPerRow={4}>
                  {movieList}
              </Card.Group>
          </div>
        );
    };

    PeopleInfo = ({items, gubun}) => {
        const itemsInfo = items.map((item, i) => {
            return (
                <Card key={i}>
                  <Card.Content>
                    <Image floated='left' size='mini' src={`${item.photo.medium.url}`} />
                    <Card.Header>
                      <PeopleName>{item.name}</PeopleName>
                    </Card.Header>
                    <Card.Meta>
                      <PeopleRole>{item.role}</PeopleRole>
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

    PrintMovieInfo = ({ movieInfo, similarMovies, open, handleHide, handleOpen }) => {
        const {
          title,
          title_eng,
          poster,
          audience_count,
          main_genre,
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
          eval_count,
          media
        } = movieInfo;

        const { PlayTrailer, SimilarMovieList, PeopleInfo } = this;

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
              <Modal.Content image scrolling>
                <Grid>
                  <Grid.Row centered>
                    <Grid.Column>
                      <Carousel emulateTouch showThumbs={false} autoPlay interval={5000} infiniteLoop>
                          {stillCutDiv}
                      </Carousel>
                    </Grid.Column>
                  </Grid.Row>


                  <Grid.Row className='info-row' centered>
                    <Grid.Column width={12}>
                      <Segment>
                        <Header>영화정보</Header>
                        <Item.Group>
                          <Item>
                            <Item.Image size='medium' src={`${largePoster}`} />

                            <Item.Content verticalAlign='middle'>
                              <Item.Header>{title} ({title_eng})</Item.Header>
                              <Item.Description>
                                <ul>
                                  <li>장르 : {main_genre}</li>
                                  <li>국가 : {nation}</li>
                                  <li>개봉일 : {releaseDay}</li>
                                  <li>관람등급 : {filmrate}</li>
                                  <li>러닝타임 : {running_time_str}</li>
                                  <li>누적 관객수 : {audienceCnt}명</li>
                                </ul>
                              </Item.Description><br/>

                              <Item.Header>줄거리</Item.Header>
                              <Item.Description>{utils.cutStory(story, 'detail')}</Item.Description><br/>

                              <Item.Header>평점</Item.Header>
                              <Item.Description><Rating icon='star' defaultRating={watcha_rating} maxRating={5} disabled/> <b>({utils.getAudience(eval_count)}명 참여)</b></Item.Description>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Segment>

                      <Segment>
                        <SimilarMovieList
                            similarMovies={similarMovies}
                            handleOpen={handleOpen}
                        />
                    </Segment>
                    </Grid.Column>

                    <Grid.Column width={4}>
                      <PlayTrailer
                          youtubeId={youtube_id}
                          stillCut={stillcut}
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
              </Modal.Content>
            </Modal>
        );
    }

    render() {
        const { movieInfo, open, similarMovies, handleHide, handleOpen } = this.props;
        const { PrintMovieInfo } = this;

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
}

export default MovieDetail;
