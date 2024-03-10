import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"
import { getImage } from "gatsby-plugin-image";

const BlogPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const posts = data.allMarkdownRemark.edges || [];
  
  let postCounter = 0

  return (
    <Layout title={siteTitle} social={social}>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || ''}
        image={getImage(data.markdownRemark.frontmatter.thumbnail)}
      />

      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
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
export default BlogPage
export const BlogPageQuery = graphql`
  query BlogPage {
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "blog-page"}}) {
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
      filter: {frontmatter: {templateKey: {eq: "blog-post"}}}
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
`