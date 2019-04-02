import React from "react"
import { Link } from "gatsby"

import debounce from 'lodash.debounce'

// import lozad from 'lozad'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toggleDarkMode } from '../containers/products/actions'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from '../components/card'
import { getProducts } from '../containers/products/actions'
import { switchDisplay } from '../containers/layout/actions'

import { searchString } from '../services/commonFuncs'


class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.onSearch = debounce(this.search, 300)
    this.state = {
      products: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products.length !== this.props.products.length) {
      this.setState({
        products: [...nextProps.products]
      })
    }
  }

  componentWillMount() {
    if (!this.props.products.length) {
      this.props.getProducts();
    }
  }

  search = () => {
    let value = this.value.trim()
    if (!value) {
      this.setState({
        products: [...this.props.products]
      })
      return;
    };

    let products = this.props.products.filter(product => searchString(value, product.name))
    this.setState({
      products: [...products]
    })
  }

  onChangeInput = (e) => {
    this.value = e.target.value;
    this.onSearch();
  }

  render() {
    const { isLoading, isGrid } = this.props;
    const { products } = this.state;
    return (
      <Layout
        onDisplayClick={this.props.switchDisplay}
        isGrid={isGrid}
        onChangeInput={this.onChangeInput}
      >
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
