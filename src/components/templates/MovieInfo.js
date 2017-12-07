import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import * as utils from '../../lib/utils';

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
                {releasDay} 개봉
              </Card.Header>
            </Card.Content>
        }
      </Card>
    )
}

export default MovieInfo;
