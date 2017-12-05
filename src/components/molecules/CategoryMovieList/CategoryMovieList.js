import React from 'react';
import { Grid, Menu } from 'semantic-ui-react';

import PrintCateMovieList from './PrintCateMovieList';

const CategoryMenu = ({ getCateMovieList, menu }) => {
    return (
      <Grid.Column width={3}>
        <Menu pointing vertical>
          <Menu.Item name='역대 100만 관객돌파 영화'    active={menu === 'millionMoive'}          onClick={() => getCateMovieList('millionMoive')}/>
          <Menu.Item name='평균평점 높은 영화'          active={menu === 'highRatingMovie'}       onClick={() => getCateMovieList('highRatingMovie')}/>
          <Menu.Item name='전문가 고평점 영화'          active={menu === 'expertRecommendMovie'}  onClick={() => getCateMovieList('expertRecommendMovie')}/>
          <Menu.Item name='전세계 흥행 TOP 영화'        active={menu === 'popularWordMoive'}      onClick={() => getCateMovieList('popularWordMoive')}/>
          <Menu.Item name='국내 누적관객수 TOP 영화'    active={menu === 'popularKoreaMoive'}     onClick={() => getCateMovieList('popularKoreaMoive')}/>
          <Menu.Item name='느와르 영화'                active={menu === 'noirMoive'}             onClick={() => getCateMovieList('noirMoive')}/>
          <Menu.Item name='스포츠 영화'                active={menu === 'sportsMoive'}           onClick={() => getCateMovieList('sportsMoive')}/>
          <Menu.Item name='애니메이션 영화'            active={menu === 'animationMoive'}        onClick={() => getCateMovieList('animationMoive')}/>
          <Menu.Item name='슈퍼 히어로 영화'           active={menu === 'superHeroMovie'}        onClick={() => getCateMovieList('superHeroMovie')}/>
          <Menu.Item name='코미디 영화'               active={menu === 'comedyMoive'}            onClick={() => getCateMovieList('comedyMoive')}/>
          <Menu.Item name='스릴러 영화'               active={menu === 'thrillerMovie'}          onClick={() => getCateMovieList('thrillerMovie')}/>
          <Menu.Item name='범죄 영화'                active={menu === 'criminalMoive'}           onClick={() => getCateMovieList('criminalMoive')}/>
          <Menu.Item name='판타지 영화'                active={menu === 'fantasyMovie'}           onClick={() => getCateMovieList('fantasyMovie')}/>
          <Menu.Item name='액션 영화'                active={menu === 'actionMoive'}           onClick={() => getCateMovieList('actionMoive')}/>
          <Menu.Item name='전쟁 영화'                active={menu === 'warMovie'}           onClick={() => getCateMovieList('warMovie')}/>
          <Menu.Item name='로맨틱 영화'                active={menu === 'romanticMoive'}           onClick={() => getCateMovieList('romanticMoive')}/>
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
