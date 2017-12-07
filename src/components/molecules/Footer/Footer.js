import React from 'react';
import $ from 'jquery';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const FooterDiv = styled.div`
    height: 5rem;
    margin-top: 1%;
    margin-left: 5%;
}
`;

const scrollUp = () => {
    $(window).scrollTop(0);
}

const Footer = () => {
    return(
        <FooterDiv>
          <Button icon onClick={scrollUp} size='big'>
            <Icon name='arrow up' color='black'/>
          </Button>
        </FooterDiv>
    );
}

export default Footer;
