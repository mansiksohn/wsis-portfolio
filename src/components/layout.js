import React from "react"
import { Link } from "gatsby"
import { useLocation } from '@reach/router';

const Layout = props => {
  const data = useLocation()
  const { title, children } = props
  // const path = props&&props.location&&props.location

  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          
        <button
          className="nav-burger"
          onClick={() => setToggleNav(!toggleNav)}
          aria-label="Menu"
        >
          <div className="hamburger hamburger--collapse">
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
        </button>

          <nav id="swup" className="site-head-left">
            {/* 왼쪽에 로고 이미지 커스텀 */}
            <Link className="site-head-logo" to={`/`}>
              <img src="/img/wsis-logo.svg" alt="Logo" /> {/* 로고 이미지 */}
            </Link>
          </nav>
          <div className="site-head-center">

          </div>
          <div className="site-head-right">
            <ul className="nav">

                <li className={`nav-home  ${data.pathname.includes('/work') ? 'nav-current' : ""} `}>
                  <Link to={`/work`}>Work</Link>
                </li>
                <li className={`nav-home  ${data.pathname.includes('/blog') ? 'nav-current' : ""} `}>
                  <Link to={`/blog`}>Blog</Link>
                </li>
                <li className={`nav-home  ${data.pathname.includes('/about') ? 'nav-current' : ""} `}>
                  <Link to={`/about`}>About</Link>
                </li>
              </ul>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link> &mdash;
        Built with {""}
        <a
          href="https://gatsbyjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
        Gatsby
        </a>
         
      </footer>
    </div>
  )
}

export default Layout
