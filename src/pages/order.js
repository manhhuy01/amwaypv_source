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

import { formatNumber, cartToParams } from '../services/commonFuncs'


class OrderPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    if (this.props.isPageProductLoaded) {

    } else {
      this.props.pageProductLoaded();
    }
  }
  componentDidMount() {
    this.setUrl();
  }
  componentDidUpdate() {
    this.setUrl();
  }

  setUrl=() => {
    let input = document.getElementById('input-url')
    if(input){
      const params = cartToParams(this.props.cartSelected)
      console.log(params)
      input.value = `${window.location.origin}/viewOrder?${params}`
    }
  }

  back = () => {
    if (this.props.isPageProductLoaded) {
      window.history.back();
    } else {
      navigate('/')
    }
  }

  onChangeQuantity(product, delta) {
    if (delta > 0) {
      this.props.addProductToCart({ product })
    }
    if (delta < 0) {
      this.props.subProductFromCart({ product })
    }
  }

  onRemove(product) {
    this.props.removeProductFromCart({ product })
  }

  copyUrl = () => {
    let input = document.getElementById('input-url')
    if(input){
      input.select();
      document.execCommand("copy")
    }
  }

  openCartTotal = () => {
    if(window.innerWidth < 500){
      document.getElementById("cart-total-outside").style.display = 'unset';
      document.getElementById("cart-total-container").style.bottom = '120px';
    }
  }

  closeCartTotal = () => {
    if(window.innerWidth < 500){
      document.getElementById("cart-total-outside").style.display = 'none';
      document.getElementById("cart-total-container").style.bottom = '10px';
    }
  }

  render() {
    const { cartSelected: { products, totalPv, totalCp, totalDp }, isLoading, authentication } = this.props
    const headerChildren = (
      <div className="header-menu">
        <IconBack onClick={this.back} />
        <div>
          <h1>
            Giỏ hàng
          </h1>

        </div>
        <div className="header-right">
          <IconSelectionCart />
        </div>
      </div>
    )

    return (
      <Layout
        headerChildren={headerChildren}
      >
        <SEO title="Giỏ hàng Amway" keywords={[`Amway`, `Sản phẩm`]}/>
        {
          isLoading ? <div> Đang tải sản phẩm...</div> :
            <div className="cart-body">
              <div className="cart-container">
                {
                  !!products && products.map((item, index) => <CartItem
                    key={index}
                    data={item}
                    isSimpleDisplay={false}
                    onChangeQuantity={this.onChangeQuantity.bind(this, item.product)}
                    onRemove={this.onRemove.bind(this, item.product)}
                    authentication={authentication}
                  />)
                }
              </div>
              <div id="cart-total-outside" className="cart-total-outside" onClick={this.closeCartTotal} />
              <div id="cart-total-container" className="cart-total-container">
                <div className="cart-total" onClick={this.openCartTotal}>
                  <div className="cart-total-body">
                    <label className="title">Tổng Tiền</label>
                    {!!authentication && <label className="total-pv">{`${totalPv.toFixed(2)}`}</label>}
                    {!!authentication && <label className="total-dp">{formatNumber(totalDp)}</label>}
                    <label className="total-price">{formatNumber(totalCp)}</label>
                  </div>
                  <p>Link đơn hàng</p>
                  <textarea id="input-url" rows="4" readOnly onClick={this.copyUrl}/>

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
  authentication: state.userReducer.authentication,
});

const mapDispatchToProps = dispatch => ({
  addProductToCart: bindActionCreators(addProductToCart, dispatch),
  subProductFromCart: bindActionCreators(subProductFromCart, dispatch),
  removeProductFromCart: bindActionCreators(removeProductFromCart, dispatch),
  pageProductLoaded: bindActionCreators(pageProductLoaded, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
