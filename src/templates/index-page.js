import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import WorkCard from "../components/workCard";
import { getImage } from "gatsby-plugin-image";

const WorkPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const social = data.site.siteMetadata.social;
  const posts = data.allMarkdownRemark.edges;
  let postCounter = 0;

  return (
    <Layout title={siteTitle} social={social}>
      <SEO
        keywords={[`Conversational AI`, `User Experience Design`, `Voice User Interface`]}
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || ''}
        image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.gatsbyImageData.images.fallback.src}
      />

      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}

{/* 자기소개 섹션 추가 */}
      <div className="intro-section">
        <h1>Hi! I am Mansiksohn.<br />I’m a <b className='coloredpen'>Conversational Product Designer</b> based in Korea.</h1>
      <p>안녕하세요! 저는 한국에서 활동하고 있는 대화형 프로덕트 디자이너입니다.<br />
      <a href="#work">아래에서 포트폴리오</a>를 확인해 주세요.</p>
      </div>

      <div id="work" className="work-feed">
        {posts.map(({ node }) => {
          postCounter++;
          const image = getImage(node.frontmatter.thumbnail);
          return (
            <WorkCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
              image={image}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default WorkPage;

export const WorkPageQuery = graphql`
  query WorkPageAndWorkPosts {
    site {
      siteMetadata {
        title
        author
        social {
          twitter
          facebook
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "work-page"}}) {
      frontmatter {
        title
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 1360, layout: CONSTRAINED)
          }
        }
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {templateKey: {eq: "work-post"}}}
      limit: 30
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 1360, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;