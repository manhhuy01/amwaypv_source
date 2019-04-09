import React from "react"
import { Link } from "gatsby"

import debounce from 'lodash.debounce'

// import lozad from 'lozad'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toggleDarkMode } from '../containers/products/actions'

import Layout from "../components/layout"
import SEO from "../components/seo"
import IconCart from '../components/iconCart'
import IconDisplay from '../components/iconDisplay'
import IconHamburger from '../components/iconHamburger'
import Card from '../components/card'


import { getProducts, addProductToCart } from '../containers/products/actions'
import { switchDisplay, pageProductLoaded } from '../containers/layout/actions'

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
    this.props.pageProductLoaded();
    // if (!this.props.products.length) {
    //   this.props.getProducts();
    // }
    if (this.props.products.length && !this.state.products.length) {
      this.setState({
        products: [...this.props.products]
      })
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

  onItemProductCicked = (product) => {
    this.props.addProductToCart({ product })
  }

  render() {
    const { isLoading, isGrid } = this.props;
    const { products } = this.state;


    const headerChildren = (<>
      <div style={{ display: 'none' }}>
        <h1>
          Sản phẩm Amway
        </h1>

      </div>
      <div className="hamburger-menu">
        <IconHamburger />
      </div>
      <input
        type="text"
        className="input-search"
        placeholder="Tìm sản phẩm"
        onChange={this.onChangeInput}
        onFocus={(e) => { e.target.value = ''; this.onChangeInput({ target: { value: '' } }) }}
      />
      <div className="header-right">
        <IconDisplay onClick={this.props.switchDisplay} isGrid={!isGrid} />
        <Link to="/order"><IconCart amount={this.props.cartSelected.totalItem} /></Link>
      </div>
    </>)
    return (
      <Layout
        isGrid={isGrid}
        onChangeInput={this.onChangeInput}
        headerChildren={headerChildren}
      >
        {/* <button onClick={toggleDarkMode}>Click me</button> */}
        <SEO title="Sản phẩm Amway" keywords={[`Amway`, `Sản phẩm`]} products={products} />
        {
          isLoading ? <div> Đang tải sản phẩm...</div> :
            <div className={isGrid ? "product-container" : "product-container--simple"}>
              {
                products.map((product, index) =>
                  <Card
                    key={index}
                    product={product}
                    isSimpleDisplay={!isGrid}
                    onAddItemToCart={this.onItemProductCicked.bind(this, product)}

                  />)
              }
            </div>
        }
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.productReducer.isDarkMode,
  products: state.productReducer.products,
  isLoading: state.productReducer.isLoading,
  isGrid: state.layoutReducer.isGrid,
  cartSelected: state.productReducer.cartSelected,
});

const mapDispatchToProps = dispatch => ({
  toggleDarkMode: bindActionCreators(toggleDarkMode, dispatch),
  getProducts: bindActionCreators(getProducts, dispatch),
  switchDisplay: bindActionCreators(switchDisplay, dispatch),
  pageProductLoaded: bindActionCreators(pageProductLoaded, dispatch),
  addProductToCart: bindActionCreators(addProductToCart, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
