import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu, Segment, Input, Icon } from 'semantic-ui-react'

import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 2rem;
`;

class SearchBar extends Component {
    static propTypes = {
        searchMovie: PropTypes.func, // 검색 메소드
        onSelect: PropTypes.func // view selector
    }

    handleKeyPress = (e) => {
        const { searchMovie } = this.props;
        // console.log(e.target.value);
        // console.log(e.charCode);

        if(e.charCode === 13) {
            searchMovie(e.target.value);
        }
    }

    // class네임을 가져가기 위해서 함수를 한번더 감싸서 class 접근
    selectMenu = (e) => {
        const { onSelect } = this.props;
        onSelect(e.target.id);
    };


    render() {
        const { activeMenu } = this.props;
        const { handleKeyPress, selectMenu } = this;

        return(
            <Wrapper>
              <Segment inverted>
                <Menu inverted pointing secondary>
                  <Menu.Item name='box office' className='box office' id='box office' active={activeMenu === 'box office'}  onClick={selectMenu} />
                  <Menu.Item name='search' className='search' id='search' active={activeMenu === 'search'} onClick={selectMenu} />
                  <Menu.Item name='category' className='category' id='category' active={activeMenu === 'category'} onClick={selectMenu} />
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
}

export default SearchBar;
