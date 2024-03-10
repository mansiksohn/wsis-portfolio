const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
    {
      allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              date(formatString: "DD:MM:YYYY hh:mm")

            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    // Template For blog-post
    const blogPost = posts.filter(item => item.node.frontmatter.templateKey === 'blog-post')
    blogPost.forEach((post, index) => {
      const previous = index === blogPost.length - 1 ? null : blogPost[index + 1].node
      const next = index === 0 ? null : blogPost[index - 1].node
      // 새 경로 생성 로직
      const slug = post.node.fields.slug.replace('/content/blog/', '/blog/');

      createPage({
        path: slug,
        component: path.resolve(`src/templates/blog-post.js`),
        context: {
          slug: slug,
          previous,
          next,
        },
      });
    });
    // Template For work-post
    const workPage = posts.filter(item => item.node.frontmatter.templateKey === 'work-post')
    workPage.forEach((post, index) => {
      const previous = index === workPage.length - 1 ? null : workPage[index + 1].node
      const next = index === 0 ? null : workPage[index - 1].node
      // 새 경로 생성 로직
      const slug = post.node.fields.slug.replace('/content/work/', '/work/');

      createPage({
        path: slug,
        component: path.resolve(`src/templates/work-post.js`),
        context: {
          slug: slug,
          previous,
          next,
        },
      });
    });
/*
    // Template For exhibitions-sub-page
    const exhibitionsPage = posts.filter(item => item.node.frontmatter.templateKey === 'exhibitions-sub-page')
    exhibitionsPage.forEach((post, index) => {
      const previous = index === exhibitionsPage.length - 1 ? null : exhibitionsPage[index + 1].node
      const next = index === 0 ? null : exhibitionsPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/exhibitions-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
*/
    // 모든 마크다운 포스트 중 'blog-post'와 'work-post'가 아닌 나머지 템플릿 키를 가진 페이지 필터링
    const allPage = posts.filter(item =>
      item.node.frontmatter.templateKey !== 'blog-post' &&
      item.node.frontmatter.templateKey !== 'work-post')
    allPage.forEach((post, index) => {
      const previous = index === allPage.length - 1 ? null : allPage[index + 1].node
      const next = index === 0 ? null : allPage[index - 1].node

      // Gatsby의 createPage 함수를 사용하여 실제 페이지 생성
      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        context: {
          slug: post.node.fields.slug,
          // previous,
          // next,
        },
      })
    })
    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // 새 폴더 구조에 맞는 slug 생성 로직
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};