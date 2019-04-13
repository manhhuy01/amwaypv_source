import React from "react"
import { navigate } from "gatsby"

// import debounce from 'lodash.debounce'

// import lozad from 'lozad'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Layout from "../components/layout"
import SEO from "../components/seo"
// import Card from '../components/card'
import IconSelectionCart from '../components/iconSelectionCart'
import IconBack from '../components/iconBack'
import CartItem from '../components/cartItem'


import { addProductToCart, subProductFromCart, removeProductFromCart } from '../containers/products/actions'
import { pageProductLoaded } from '../containers/layout/actions'

import { parseParams, formatNumber } from '../services/commonFuncs'


class OrderPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    if (this.props.isPageProductLoaded) {

    }else{
      this.props.pageProductLoaded();
    }
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
    if (this.props.isPageProductLoaded) {
      window.history.back();
    } else {
      navigate('/')
    }
  }

  onChangeQuantity(product, delta){
    if(delta > 0) {
      this.props.addProductToCart({product})
    }
    if(delta < 0) {
      this.props.subProductFromCart({product})
    }
  }

  onRemove(product) {
    this.props.removeProductFromCart({product})
  }

  render() {
    const { cartSelected: { products, totalPv, totalCp, totalDp }, isLoading } = this.props
    const headerChildren = (
      <>
        <IconBack onClick={this.back} />
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
        {
          isLoading ? <div> Đang tải sản phẩm...</div> :
            <div className="cart-body">
              <div className="cart-container">
                {
                  !!products && products.map((item, index) => <CartItem 
                  key={index} 
                  data={item} 
                  isSimpleDisplay={false} 
                  onChangeQuantity = {this.onChangeQuantity.bind(this, item.product)}
                  onRemove = {this.onRemove.bind(this, item.product)}
                  />)
                }
              </div>
              <div className="cart-total-container">
                <div className="cart-total">
                  <label className="title">Thành Tiền</label>
                  <label className="total-pv">{`${totalPv.toFixed(2)} PV`}</label>
                  <label className="total-dp">{formatNumber(totalDp)}</label>
                  <label className="total-price">{formatNumber(totalCp)}</label>
                </div>
              </div>
            </div>

        }
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.productReducer.isDarkMode,
  isPageProductLoaded: state.layoutReducer.isPageProductLoaded,
  cartSelected: state.productReducer.cartSelected,
  isLoading: state.productReducer.isLoading,
});

const mapDispatchToProps = dispatch => ({
  addProductToCart: bindActionCreators(addProductToCart, dispatch),
  subProductFromCart: bindActionCreators(subProductFromCart, dispatch),
  removeProductFromCart: bindActionCreators(removeProductFromCart, dispatch),
  pageProductLoaded: bindActionCreators(pageProductLoaded, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
