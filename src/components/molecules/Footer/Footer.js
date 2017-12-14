import React from 'react';
import $ from 'jquery';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const FooterDiv = styled.div`
    margin-left: 3%;
    position: fixed;
    bottom: 50px;
    display: none;
}
`;

const scrollUp = () => {
    $('html, body').animate({
        scrollTop : 0
    }, 500);
    return false;
}

const Footer = () => {
    return(
        <FooterDiv className='footer-main'>
          <Button icon onClick={scrollUp} size='big'>
            <Icon name='arrow up' color='black'/>
          </Button>
        </FooterDiv>
    );
}

export default Footer;
