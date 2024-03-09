import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const social = data.site.siteMetadata.social

    return (
      <Layout location={this.props.location} title={siteTitle} social={social}>
        <SEO title="404: Not Found" />
        <div className="good-bye-page">
         <h1>Not Found</h1>
         <p>404: You're in the 'In Progress' zone. <br />But don't worry, a safe path back home is provided for you.</p>
         <p><a href="/">Return Home</a>
         </p>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social{
          twitter
          facebook
        }
      }
    }
  }
`
