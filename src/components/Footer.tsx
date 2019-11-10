import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/common';
import Link from './Link';
import { PageWrapper } from './Common';

export const footerHeight = 120;

const Footer = styled.footer`
    background-color: ${props =>
        props.theme.color === 'light' ? colors.backgroundSecondaryLight : colors.backgroundSecondaryDark};
    border-top: 2px solid ${colors.borderLight};
    border-color: ${props => (props.theme.color === 'light' ? colors.borderLight : colors.borderDark)};
    height: ${footerHeight}px;
`;

const ModifiedPageWrapper = styled(PageWrapper)`
    justify-content: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SocialMediaList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const SocialMediaListItem = styled.li`
    padding: 0 7px;
    margin: 0;

    &::before {
        content: '';
    }
`;

const SocialMediaLink = styled(Link)``;

type FooterProps = {};

const FooterComponent = ({  }: FooterProps) => {
    return (
        <Footer>
            <ModifiedPageWrapper>
                <SocialMediaList>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://twitter.com/sdgp">Twitter</SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="mailto:info@sdgp.it">Email</SocialMediaLink>
                    </SocialMediaListItem>
                    <SocialMediaListItem>
                        <SocialMediaLink to="https://sdgp.it">SDG&P</SocialMediaLink>
                    </SocialMediaListItem>
                </SocialMediaList>
            </ModifiedPageWrapper>
        </Footer>
    );
};

export default FooterComponent;
