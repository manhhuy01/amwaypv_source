/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import lozad from 'lozad'
import Header from "./header"
import "./layout.css"

class Layout extends React.Component {
  componentDidMount() {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  }
  render() {
    return (
      <StaticQuery
        query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
        render={data => (
          <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <main>{this.props.children}</main>
            <footer>
              Đây là footer
            </footer>
          </>
        )}
      />
    )
  }

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
