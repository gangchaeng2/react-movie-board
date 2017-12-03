import React from 'react';

import PropTypes from 'prop-types';

// visible 이 false 면 null 반환
const Container = ({visible, children}) => visible ? (
    <div>
        {children}
    </div>
) : null;

// propTypes 설정
Container.propTypes = {
    visible: PropTypes.bool
};

export default Container;
