import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import * as utils from '../../lib/utils';

const MovieInfo = ({code, title, title_url
    , filmrate, poster, main_genre
    , running_time_str, year, d_day
    , watcha_rating, handleOpen, gubun}) => {

    const releasDay = utils.getOpenDate(d_day, gubun);

    return (
      <Card link={true} onClick={() => handleOpen(title, code)} size='tiny'>
        <Image src={`${poster.large}`} />
        <Card.Content>
          <Card.Header>
            {title}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {releasDay} 개봉
            </span>
          </Card.Meta>
          <Card.Description>
            {main_genre}<br/> {running_time_str}<br/> {filmrate}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Rating icon='star' defaultRating={watcha_rating} maxRating={5} disabled/>
        </Card.Content>
      </Card>
    )
}

export default MovieInfo;
