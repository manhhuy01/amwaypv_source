import React from "react"
import { Link } from "gatsby"

// import lozad from 'lozad'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toggleDarkMode } from '../containers/products/actions'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from '../components/card'
import { getProducts } from '../containers/products/actions'
import { switchDisplay } from '../containers/layout/actions'


class IndexPage extends React.Component {

  componentWillMount() {
    if (!this.props.products.length) {
      this.props.getProducts();
    }
  }
  render() {
    const { products, isLoading, isGrid } = this.props
    return (
      <Layout
        onDisplayClick={this.props.switchDisplay}
        isGrid={isGrid}>
        {/* <button onClick={toggleDarkMode}>Click me</button> */}
        <SEO title="Sản phẩm Amway" keywords={[`Amway`, `Sản phẩm`]} products={products} />
        <div className={isGrid ? "product-container" : "product-container--simple"}>
          {
            isLoading ? <div>Đang tải sản phẩm...</div> :
              products.map((product, index) => <Card key={index} product={product} isSimpleDisplay={!isGrid} />)
          }
        </div>

        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.productReducer.isDarkMode,
  products: state.productReducer.products,
  isLoading: state.productReducer.isLoading,
  isGrid: state.layoutReducer.isGrid,
});

const mapDispatchToProps = dispatch => ({
  toggleDarkMode: bindActionCreators(toggleDarkMode, dispatch),
  getProducts: bindActionCreators(getProducts, dispatch),
  switchDisplay: bindActionCreators(switchDisplay, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
