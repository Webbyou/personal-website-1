import styled from 'styled-components';
import React, { useCallback } from 'react';
import { media, textSize, textColor, colors } from '../styles/common';
import { Title } from './Typography';
import { ButtonStyles } from './Common';

const NewsletterForm = styled.form`
    width: 100%;
    text-align: center;
`;

const NewsletterTitle = styled(Title)`
    margin-bottom: 20px;
`;

const EmailWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    ${media.small`
        flex-direction: column;
    `};
`;

const SubscribeButton = styled.input`
    ${ButtonStyles};
`;

const EmailInput = styled.input`
    ${textSize.normal};
    ${textColor.body};
    width: 400px;
    max-width: 100%;
    margin-right: 20px;
    border-style: solid;
    border-width: 2px;
    border-color: ${({ theme }) => (theme.color === 'light' ? colors.inputBorderLight : colors.inputBorderDark)};
    background: none;
    padding: 5px 10px;

    ${media.small`
        margin-bottom: 20px;
    `};
`;

const NewsletterDescription = styled.p`
    ${media.small`
        margin-bottom: 10px;
    `};
`;

const Newsletter = () => {
    const handleSubmit = useCallback(() => {
        window.open('https://tinyletter.com/ivapmi', 'popupwindow', 'scrollbars=yes,width=800,height=600');
        return true;
    }, []);
    return (
        <NewsletterForm
            action="https://tinyletter.com/ivapmi"
            method="post"
            target="popupwindow"
            onSubmit={handleSubmit}
        >
            <NewsletterTitle as="h2">Iscriviti alla Newsletter</NewsletterTitle>
            <NewsletterDescription>
                Iscriviti alla newsletter per rimanere aggiornato con gli ultimi articoli e le notizie.
            </NewsletterDescription>
            <EmailWrapper>
                <EmailInput type="text" name="email" id="newsletterEmail" placeholder="Email address" />
                <SubscribeButton type="submit" value="Subscribe" />
            </EmailWrapper>
            <input type="hidden" value="1" name="embed" />
        </NewsletterForm>
    );
};

export default Newsletter;
