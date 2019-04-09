import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Children } from "react"


const Header = ({ children }) => (
  <header>
  {
    children
  }
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header