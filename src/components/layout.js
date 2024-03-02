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

          {/*
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          */}
          
          <nav id="swup" className="site-head-left">
            {/* 왼쪽에 로고 이미지 커스텀 */}
            <Link className="site-head-logo" to={`/`}>
              <img src="/img/wsis-logo.png" alt="Logo" /> {/* 로고 이미지 */}
            </Link>
          </nav>
          <div className="site-head-center">

          </div>
          <div className="site-head-right">
            <ul className="nav">
                <li className={`nav-home  ${data.pathname === '/' ? 'nav-current' : ""} `}>
                  <Link to={`/`}>Home</Link>
                </li>
                <li className={`nav-home  ${data.pathname.includes('/work') ? 'nav-current' : ""} `}>
                  <Link to={`/work`}>Work</Link>
                </li>
                <li className={`nav-home  ${data.pathname.includes('/news') ? 'nav-current' : ""} `}>
                  <Link to={`/news`}>Blog</Link>
                </li>
                <li className={`nav-home  ${data.pathname.includes('/bio') ? 'nav-current' : ""} `}>
                  <Link to={`/bio`}>About</Link>
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
