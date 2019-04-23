/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { StaticQuery, graphql } from "gatsby"
// import lozad from 'lozad'
import Header from "./header"
import "./layout.css"
import "./layout-mobile.css"

class Layout extends React.Component {
  render() {
    const { headerChildren } = this.props
    return (
      <>
        <Header>
          {headerChildren}
        </Header>

        <main>{this.props.children}</main>
        <footer>

        </footer>
      </>
    )
  }

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}



export default Layout
