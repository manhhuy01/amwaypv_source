import React from "react"
import { Link } from "gatsby"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toggleDarkMode } from '../containers/products/actions'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from '../components/card'

const IndexPage = ({ isDarkMode, toggleDarkMode, products }) => (
  <Layout>
    {/* <button onClick={toggleDarkMode}>Click me</button> */}
    <SEO title="Sản phẩm Amway" keywords={[`Amway`, `Sản phẩm`]} products={products} />
    <div className="product-container">
      {
        products.map((product, index) => <Card key={index} product={product} />)
      }
    </div>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

const mapStateToProps = state => ({
  isDarkMode: state.productReducer.isDarkMode,
  products: state.productReducer.products
});

const mapDispatchToProps = dispatch => ({
  toggleDarkMode: bindActionCreators(toggleDarkMode, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
