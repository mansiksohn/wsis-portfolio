import React from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"

// eslint-disable-next-line
const WorkPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0

  return (
    <Layout title={siteTitle} social={social}>
      <Seo keywords={[`Gatsby Theme`, `Free Gatsby Template`, `Clay Gatsby Theme`]}
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.frontmatter.description || ''}
        image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.fluid.src}

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
      <h1>Hi! I am Mansiksohn.<br />I’m a <b class='coloredpen'>Conversational Product Designer</b> based in Korea.</h1>
      <p>안녕하세요! 저는 한국에서 활동하고 있는 대화형 프로덕트 디자이너입니다. 주로 음성을 사용하는 대화 인터페이스 분야에서 9년 이상의 경험을 바탕으로 제품 기획부터 사용성 평가에 이르기까지 다양한 프로젝트에 참여해 사용자 중심의 매력적인 대화경험을 만들어왔습니다.</p>
      <p>새로운 기술을 발견과 무엇이든 만들어 내는 것에 관심이 있습니다.<br />현재는 <u class='highlighter'>음성 인공지능 기술을 활용한 교육서비스</u>를 만드는데 참여하고 있습니다. 제 작업에 대해 더 깊이 알고 싶으시다면, <a href="#work">아래</a>에서 포트폴리오를 확인해 주세요.</p>
    </div>

    <div id="work" className="post-feed">
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
export default WorkPage
export const WorkPageQuery = graphql`
query IndexPage {
  site {
    siteMetadata {
      title
      author
      social{
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
          fluid(maxWidth: 1360) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    
  }
  allMarkdownRemark(
    filter: {frontmatter: {templateKey: {eq: "work-sub-page"}}}
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
              fluid(maxWidth: 1360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`;