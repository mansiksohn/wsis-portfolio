import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import WorkCard from "../components/workCard";
import { getImage } from "gatsby-plugin-image"

// eslint-disable-next-line
const WorkPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const social = data.site.siteMetadata.social;
  const posts = data.allMarkdownRemark.edges;
  let postCounter = 0
  
  // 이미지 데이터 추출 및 최적화
  const image = getImage(data.markdownRemark.frontmatter.thumbnail);

  return (
    <Layout title={siteTitle} social={social}>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || ''}
        image={image}
      />

      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}

      <div className="work-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <WorkCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
    </Layout>
  )
}
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
            gatsbyImageData(width: 1024, layout: CONSTRAINED)
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
                gatsbyImageData(width: 960, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;