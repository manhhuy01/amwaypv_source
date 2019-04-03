import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import IconCart from './iconCart'
import IconDisplay from './iconDisplay'
import IconHamburger from './iconHamburger'

const Header = ({ siteTitle, onDisplayClick, isGrid, onChangeInput }) => (
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
    <div className="hamburger-menu">
      <IconHamburger />
    </div>
    <input
      className="input-search"
      placeholder="Tìm sản phẩm"
      onChange={onChangeInput}
      onFocus={(e) => { e.target.value = ''; onChangeInput({ target: { value: '' } }) }}
    />
    <div className="header-right">
      <IconDisplay onClick={onDisplayClick} isGrid={!isGrid} />
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
