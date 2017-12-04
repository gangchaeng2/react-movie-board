import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../../css/carousel.css';
import styled from 'styled-components';

const CarouselDiv = styled.div`
    cursor: pointer;
`;

const getCarouselList = (list, handleOpen) => {
    return list.map((info, i) => {
        return (
            <CarouselDiv key={i} onClick={() => handleOpen(info.items[0].item.title, info.items[0].item.code)}>
              <img src={info.items[0].item.poster.original} alt=''/>
            </CarouselDiv>
        );
    });
}

const BoxOfficeCarousel = ({boxOfficeList, handleOpen}) => {
    return(
      <Carousel centerMode centerSlidePercentage={40} showStatus={false} showThumbs={false} showIndicators={false} autoPlay interval={5000} infiniteLoop>
          {getCarouselList(boxOfficeList, handleOpen)}
      </Carousel>
    );
}

export default BoxOfficeCarousel;
