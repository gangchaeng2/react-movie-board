import React from 'react';
import { Menu, Segment, Input, Icon } from 'semantic-ui-react'

import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 2rem;
`;

const Header = ({searchMovie, handleSelect, activeMenu}) => {
    const handleKeyPress = (e) => {
        // console.log(e.target.value);
        // console.log(e.charCode);

        if(e.charCode === 13) {
            searchMovie(e.target.value);
        }
    };

    const selectMenu = (e) => {
        handleSelect(e.target.id);
    };

    return (
      <Wrapper>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item name='box office' className='box office' id='box office' active={activeMenu === 'box office'}  onClick={selectMenu} />
            <Menu.Item name='category' className='category' id='category' active={activeMenu === 'category'} onClick={selectMenu} />
            <Menu.Item name='search' className='search' id='search' active={activeMenu === 'search'} onClick={selectMenu} />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon placeholder='Search...' size='big' onKeyPress={handleKeyPress}>
                  <input id='movieNm' />
                  <Icon name='search' />
                </Input>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      </Wrapper>
    );
}

export default Header;
