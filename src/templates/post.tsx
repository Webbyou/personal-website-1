import Img from 'gatsby-image';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Link from '../components/Link';
import ScrollProgress from '../utils/scrollProgress';
import { Divider, PageWrapper } from '../components/Common';
import { Title } from '../components/Typography';
import { colors, media } from '../styles/common';
import { PageContext } from '../types/PageContext';

const ModifiedPageWrapper = styled(PageWrapper)`
    width: 800px;
    padding: 80px 20px;

    ${media.small`
        padding: 40px 20px;
    `};
`;

const PostTitle = styled(Title)`
    text-align: left;
    margin: 0;
    margin-bottom: 10px;

    ${media.small`
        text-align: center;
        margin-bottom: 5px;
    `};
`;

const Date = styled.time`
    display: block;
    margin-bottom: 40px;

    ${media.small`
        text-align: center;
    `};
`;

// const FeaturedImage = styled(Img)`
//     margin-bottom: 40px;

//     img {
//         margin: unset;
//     }
// `;

const MDXContent = styled.div`
    .caption {
        font-weight: 400;
        font-style: italic;
        text-align: center;
        display: block;
        margin-top: -25px;
        margin-bottom: 40px;
        line-height: 1.4;

        + h2,
        + h3,
        + h4,
        + h5 {
            margin-top: 0;
        }
    }

    hr {
        + h2,
        + h3,
        + h4,
        + h5 {
            margin-top: 0px;
        }
    }

    h2,
    h3,
    h4,
    h5 {
        + iframe {
            margin-top: 20px;
        }
    }

    img {
        max-width: 100%;
    }

    iframe {
        margin: 40px 0;
    }

    code {
        font-family: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;
        font-size: 14px;
        border-radius: 0.3em;
        background: ${props => (props.theme.color === 'light' ? 'rgba(255, 229, 100, 0.2)' : '#142b44')};
        padding: 0.15em 0.2em 0.05em;
        white-space: normal;
    }

    .gatsby-highlight {
        margin-top: 40px;
        margin-bottom: 40px;
        ${props => props.theme.color === 'dark' && `border: 2px solid ${colors.border_dark}`};
    }

    .gatsby-resp-image-wrapper {
        margin: 40px 0;
    }

    img {
        display: block;
        margin: 40px 0;
    }

    ul {
        list-style: none;
        line-height: 2;
        padding-left: 30px;
    }

    li {
        position: relative;

        &::before {
            content: '-';
            position: absolute;
            left: -20px;
        }
    }
`;

const CategoriesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const CategoriesLabel = styled.span`
    font-weight: 600;
    margin-bottom: 10px;
`;

const CategoryList = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const CategoryListItem = styled.li`
    padding: 0 10px;
`;

const CategoryLink = styled(Link)``;

const NextPostWrapper = styled.span`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    line-height: 1.5;
    max-width: 50%;
`;

const PreviousPostWrapper = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    line-height: 1.5;
    max-width: 50%;
`;

const PreviousPostLink = styled(Link)`
    text-align: right;
`;

const OtherPostsWrapper = styled.div`
    display: flex;
`;

const CategoryListComponent = ({ list = [] }: { list?: string[] }) => (
    <CategoriesWrapper>
        <CategoriesLabel>Categories:</CategoriesLabel>
        <CategoryList>
            {list.map(category => (
                <CategoryListItem key={category}>
                    <CategoryLink to={`/categories/${category}`}>{category}</CategoryLink>
                </CategoryListItem>
            ))}
        </CategoryList>
    </CategoriesWrapper>
);

const ProgressContainer = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    width: 100%;
    height: 10px;
`;

const ProgressBar = styled.div`
    height: 10px;
    background: ${props => (props.theme.color === 'light' ? colors.text_title_light : colors.text_title_dark)};
    width: 10%;
`;

const CommentsSection = styled.div`
    margin-top: 40px;
`;

interface PostProps {
    data: {
        site: any;
        mdx: any;
    };
    pageContext: PageContext;
}

const Post = (props: PostProps) => {
    const {
        data: { site, mdx },
        pageContext: { next, prev },
    } = props;

    const disqusShortname = 'robertcoopercode';
    const disqusConfig = {
        identifier: mdx.id,
        title: mdx.frontmatter.title,
    };

    const progressBar = useRef({ current: { style: { width: 0 } } } as any);

    useEffect(() => {
        const progressObserver = new ScrollProgress((x, y) => {
            progressBar.current.style.width = y * 100 + '%';
        });

        return () => progressObserver.destroy();
    });

    return (
        <Layout site={site} frontmatter={mdx.frontmatter}>
            <ProgressContainer>
                <ProgressBar ref={progressBar} />
            </ProgressContainer>
            <ModifiedPageWrapper>
                <PostTitle>{mdx.frontmatter.title}</PostTitle>
                <Date dateTime={mdx.frontmatter.dateTimeString}>{mdx.frontmatter.formattedDate}</Date>

                {/* {mdx.frontmatter.banner && <FeaturedImage fluid={mdx.frontmatter.banner.childImageSharp.fluid} />} */}

                <MDXContent>
                    <MDXRenderer>{mdx.code.body}</MDXRenderer>
                </MDXContent>

                <Divider />

                <CategoryListComponent list={mdx.frontmatter.categories} />

                {(next || prev) && (
                    <OtherPostsWrapper>
                        {prev && (
                            <NextPostWrapper>
                                Next: <Link to={prev.fields.slug}>{prev.fields.title}</Link>
                            </NextPostWrapper>
                        )}
                        {next && (
                            <PreviousPostWrapper>
                                Previous: <PreviousPostLink to={next.fields.slug}>{next.fields.title}</PreviousPostLink>
                            </PreviousPostWrapper>
                        )}
                    </OtherPostsWrapper>
                )}
                <CommentsSection>
                    <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                </CommentsSection>
            </ModifiedPageWrapper>
        </Layout>
    );
};

export default Post;

export const pageQuery = graphql`
    query($id: String!) {
        site {
            siteMetadata {
                title
                description
                author
                siteUrl
            }
        }
        mdx(fields: { id: { eq: $id } }) {
            id
            frontmatter {
                title
                description
                formattedDate: date(formatString: "MMMM DD, YYYY")
                dateTimeString: date(formatString: "YYYY-MM-DD")
                banner {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                slug
                categories
            }
            code {
                body
            }
        }
    }
`;
