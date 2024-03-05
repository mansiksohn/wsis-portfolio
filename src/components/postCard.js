import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PostCard = ({ node, count }) => {
  const image = getImage(node.frontmatter.thumbnail)

  return (
    <article className={`post-card ${!image ? "no-image" : ""}`}>
      <Link to={node.fields.slug} className="post-card-link">
        {image && (
          <GatsbyImage
            image={image}
            alt={node.frontmatter.title}
            className="post-card-image"
          />
        )}
        <div className="post-card-content">
          <h2 className="post-card-title">{node.frontmatter.title}</h2>
          <p className="post-card-meta">
            {node.frontmatter.date} &middot; {node.timeToRead} posted
            {/* 태그가 있다면 태그를 표시 */}
            {node.frontmatter.tags && (
              <div className="post-card-tags">
                {node.frontmatter.tags.map(tag => (
                  <span key={tag} className="post-card-tag">#{tag}</span>
                ))}
              </div>
            )}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default PostCard