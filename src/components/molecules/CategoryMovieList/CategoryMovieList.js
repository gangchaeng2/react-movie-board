import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';

import PrintCateMovieList from './PrintCateMovieList';

const CategoryMenu = ({ getCateMovieList, menu }) => {
    return (
      <Grid.Column width={3}>
        <Menu vertical>
          <Menu.Item name='popularKoreaMoive'  active={menu === 'popularKoreaMoive'} onClick={() => getCateMovieList('popularKoreaMoive')}>
            국내 누적 관객수 TOP 12
          </Menu.Item>
          <Menu.Item name='popularWordMoive' active={menu === 'popularWordMoive'} onClick={() => getCateMovieList('popularWordMoive')}>
            전세계 흥행 TOP 12
          </Menu.Item>
          <Menu.Item name='expertRecommendMovie' active={menu === 'expertRecommendMovie'} onClick={() => getCateMovieList('expertRecommendMovie')}>
            전문가 추천영화
          </Menu.Item>
          <Menu.Item name='expertRecommendMovie' active={menu === 'highRatingMovie'} onClick={() => getCateMovieList('highRatingMovie')}>
            평균 평점 TOP 12
          </Menu.Item>
        </Menu>
      </Grid.Column>
    )
}

const CategoryMoiveList = ({ cateMovieList, handleOpen, getCateMovieList, menu}) => {
    return (
      <Grid>
        <CategoryMenu
            getCateMovieList={getCateMovieList}
            menu={menu}
        />

      <Grid.Column width={12}>
          <PrintCateMovieList
            handleOpen={handleOpen}
            cateMovieList={cateMovieList}
          />
        </Grid.Column>
      </Grid>
    );
}

export default CategoryMoiveList;
