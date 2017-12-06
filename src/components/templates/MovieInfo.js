import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import * as utils from '../../lib/utils';

const showLabel = (data) => {
    let show = data;
    if(!utils.isEmpty(show)) {
      return (
        <Label>{show}</Label>
      );
    }
}

const MovieInfo = ({code, title, title_url
    , filmrate, poster, main_genre
    , running_time_str, year, d_day
    , watcha_rating, handleOpen, gubun, page}) => {

    const releasDay = utils.getOpenDate(d_day, gubun);
    const rating = utils.getRating(watcha_rating);

    return (
      <Card link={true} onClick={() => handleOpen(title, code)} size='tiny'>
        <Image src={`${poster.large}`}
            label={{ color: 'black', content: `${rating}`, icon: 'thumbs outline up', ribbon: true }}
        />
        {gubun !== 'simillarMoive' &&
            <Card.Content>
              <Card.Header>
                {title}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {releasDay} 개봉
                </span>
              </Card.Meta>
            </Card.Content>
        }
      </Card>
    )
}

export default MovieInfo;
