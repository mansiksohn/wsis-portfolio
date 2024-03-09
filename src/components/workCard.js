import React from "react"
import { Link } from "gatsby"

const WorkCard = props => {
  return (
    <article
      className={`work-card ${props.postClass} ${props.node.frontmatter.thumbnail ? 'with-image' : 'no-image'}`}
    >
      {props.node.frontmatter.thumbnail && (
        <img
          src={props.node.frontmatter.thumbnail.childImageSharp.fluid.src}
          alt={`${props.node.frontmatter.title} Thumbnail`} // 제목을 포함한 alt 텍스트
          className="work-card-image"
        />
      )}
      <Link to={props.node.fields.slug} className="work-card-link">
        <div className="work-card-content">
          <h2 className="work-card-title">{props.node.frontmatter.title}</h2>
          {/* 여기에 메타 정보를 추가할 수 있습니다 */}
        </div>
      </Link>
    </article>
  );
};

export default WorkCard;