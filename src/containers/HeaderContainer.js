import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as searchMovieActions from '../modules/searchMovie';
import * as viewSelectorActions from '../modules/viewSelector';

import Header from '../components/molecules/Header/Header';

class HeaderContainer extends Component {
    searchMovie = async (query) => {
        const { searchMovieActions } = this.props;
        const { viewSelectorActions } = this.props;

        viewSelectorActions.setView('search');
        searchMovieActions.setQuery(query);

        try {
            await searchMovieActions.searchMovie(query);
        } catch(e) {
            console.log(e);
        }
    }

    handleSelect = (name) => {
        const view = name;
        const { viewSelectorActions } = this.props;
        viewSelectorActions.setView(view);
    }

    render() {
        const { view } = this.props;
        const { handleSelect, searchMovie } = this;

        return (
            <Header
                searchMovie={searchMovie}
                activeMenu={view}
                handleSelect={handleSelect}
            />
        );
    }
}

export default connect(
    (state) => ({
        items: state.searchMovie.items,
        query: state.searchMovie.query,
        view: state.viewSelector.get('view')
    }),
    (dispatch) => ({
        searchMovieActions: bindActionCreators(searchMovieActions, dispatch),
        viewSelectorActions: bindActionCreators(viewSelectorActions, dispatch)
    })
)(HeaderContainer);
