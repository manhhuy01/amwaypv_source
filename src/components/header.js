import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import IconCart from './iconCart'
import IconDisplay from './iconDisplay'

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <h1>
        <Link
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <input className="input-search" placeholder="Bạn tìm sản phẩm gì" />
    <div className="header-right">
      <IconDisplay />
      <IconCart href="/" />
    </div>

  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
