import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/carousel.css';

class BoxOfficeCarousel extends Component {
    getCarouselList = (list) => {
        return list.map((info, i) => {
            return (
                <div key={i}>
                  <img src={info.items[0].item.poster.original} alt='' />
                </div>
            );
        });
    }

    render() {
      const { boxOfficeList } = this.props;
      const { getCarouselList } = this;

      return (
          <Carousel centerMode emulateTouch showStatus={false} showThumbs={false} showIndicators={false} showArrows={false} autoPlay interval={3000} infiniteLoop>
              {getCarouselList(boxOfficeList)}
          </Carousel>
      );
    }
}

export default BoxOfficeCarousel;
