import React from "react"
import { navigate } from "gatsby"

import debounce from 'lodash.debounce'

// import lozad from 'lozad'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toggleDarkMode } from '../containers/products/actions'

import Layout from "../components/layout"
import SEO from "../components/seo"
// import Card from '../components/card'
import IconSelectionCart from '../components/iconSelectionCart'

import { getProducts } from '../containers/products/actions'
import { switchDisplay } from '../containers/layout/actions'

import { parseParams } from '../services/commonFuncs'


class OrderPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    /*
    {
      customerPrice: 200000,
      count: 3,
      cartDetail: '1-234323|2-234324' number-sku|
    }
    */
    console.log(parseParams());

  }

  validateParams = (params) => {
    let rs = true;




    return rs;
  }

  back = () => {
    if(this.props.isPageProductLoaded){
      window.history.back();
    }else{
      navigate('/')
    }
  }

  render() {
    const headerChildren = (
      <>
        <button className="icon-back" onClick={this.back}>
          🡐
          </button>
        <div>
          <h1>
            Giỏ hàng
          </h1>

        </div>
        <div className="header-right">
          <IconSelectionCart />
        </div>
      </>
    )

    return (
      <Layout
        headerChildren={headerChildren}
      >
        <SEO title="Đơn hàng Amway" keywords={[`Amway`, `Sản phẩm`]} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.productReducer.isDarkMode,
  isPageProductLoaded: state.layoutReducer.isPageProductLoaded,
});

const mapDispatchToProps = dispatch => ({
  toggleDarkMode: bindActionCreators(toggleDarkMode, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
