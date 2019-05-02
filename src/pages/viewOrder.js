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


import { getFullInfoReadOnlyCart } from '../containers/products/actions'
import { pageProductLoaded } from '../containers/layout/actions'

import { parseParams, formatNumber } from '../services/commonFuncs'


class OrderPage extends React.Component {

  componentWillMount() {
    if (this.props.isPageProductLoaded) {

    } else {
      this.props.pageProductLoaded();
    }
    /*
    {
      customerPrice: 200000,
      count: 3,
      cartDetail: '1-234323~2-234324' number-sku|
    }
    */
    let params = parseParams(this.props.location.search);
    if (params) {
      if (this.validateParams(params)) {
        this.props.getFullInfoReadOnlyCart(params)
        this.description = `Đơn hàng trị giá: ${formatNumber(Number(params.customerPrice))} VND gồm ${params.count} món`
      }
    } else {

    }

  }

  validateParams = (params) => {
    let rs = true;




    return rs;
  }

  back = () => {
    navigate('/')
  }

  render() {
    const { readOnlyCart: { products, totalPv, totalCp, totalDp }, isLoading, authentication } = this.props
    const headerChildren = (
      <div className="header-menu">
        <IconBack onClick={this.back} />
        <div>
          <h1>
            Đơn hàng
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
        <SEO title="Đơn hàng Amway" keywords={[`Amway`, `Sản phẩm`]} description={this.description} />
        {
          isLoading ? <div> Đang tải sản phẩm...</div> :
            <div className="cart-body">
              <div className="cart-container">
                {
                  !!products && products.map((item, index) => <CartItem
                    key={index}
                    data={item}
                    isSimpleDisplay={false}
                    authentication={authentication}
                    readOnly
                  />)
                }
              </div>
              <div className="cart-total-container">
                <div className="cart-total">
                  <div className="cart-total-body">
                    <label className="title">Tổng Tiền</label>
                    {!!authentication && <label className="total-pv">{`${totalPv.toFixed(2)}`}</label>}
                    {!!authentication && <label className="total-dp">{formatNumber(totalDp)}</label>}
                    <label className="total-price">{formatNumber(totalCp)}</label>
                  </div>
                </div>
              </div>

            </div>
        }
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  isPageProductLoaded: state.layoutReducer.isPageProductLoaded,
  isLoading: state.productReducer.isLoading,
  authentication: state.userReducer.authentication,
  readOnlyCart: state.productReducer.readOnlyCart,
});

const mapDispatchToProps = dispatch => ({
  pageProductLoaded: bindActionCreators(pageProductLoaded, dispatch),
  getFullInfoReadOnlyCart: bindActionCreators(getFullInfoReadOnlyCart, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
