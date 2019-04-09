import PropTypes from "prop-types"
import React from "react"

import Card from './card'
import NumberSpin from './numberSpin'
import { COLORS } from '../containers/products/constants'
import { formatNumber } from '../services/commonFuncs'

const CartItem = ({ product, isSimpleDisplay }) => (
  <div className="cartItem-container">
    <Card product={product} isSimpleDisplay={isSimpleDisplay} />
    <div className="cartItem-action">
      <div className="cartItem-quantity">
        <span><NumberSpin min={0} max={999} number={2} /></span>
        <span>Tổng tiền</span>
      </div>
      <div className="cartItem-remove">Xóa</div>
    </div>

  </div>
)

CartItem.propTypes = {
  product: PropTypes.object,
}

CartItem.defaultProps = {
  product: {},
}

export default CartItem
