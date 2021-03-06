/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import DataStructure from './dataStructure'
import { generateDataStructure } from '../services/commonFuncs'

function SEO({ description, lang, meta, keywords, title, products }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const data = generateDataStructure(products)
  return (
    <>
      <DataStructure data={data} />
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        meta={[
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.author,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `full-screen`,
            content: 'yes',
          },
          {
            name: `apple-mobile-web-app-capable`,
            content: 'yes',
          },
          {
            name: `mobile-web-app-capable`,
            content: 'yes',
          },
          {
            name: `apple-mobile-web-app-title`,
            content: '',
          },
          
        ]
          .concat(
            keywords.length > 0
              ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
              : []
          )
          .concat(meta)}
      />

    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
