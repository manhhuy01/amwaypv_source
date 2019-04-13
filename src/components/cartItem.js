import PropTypes from "prop-types"
import React from "react"

import Card from './card'
import NumberSpin from './numberSpin'
import { formatNumber } from '../services/commonFuncs'

const CartItem = ({ data, isSimpleDisplay, onChangeQuantity, onRemove }) => (
  <div className="cartItem-container">
    <Card product={data.product} isSimpleDisplay={isSimpleDisplay} />
    <div className="cartItem-action">
      <div className="cartItem-quantity">
        <div><NumberSpin min={0} max={999} number={data.amount} onChange={onChangeQuantity} /></div>
        <div className="product-pv">{`${(data.product.pv * data.amount).toFixed(2)} PV`}</div>
        <div className="product-dp">{formatNumber(data.product.dp * data.amount)}</div>
        <div className="product-cp">{formatNumber(data.product.cp * data.amount)}</div>

      </div>
      <div className="cartItem-remove">
        <label onClick={onRemove}>xóa</label>
      </div>
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
