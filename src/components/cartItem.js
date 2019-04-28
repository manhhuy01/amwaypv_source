import PropTypes from "prop-types"
import React from "react"

import Card from './card'
import NumberSpin from './numberSpin'
import { formatNumber } from '../services/commonFuncs'

const CartItem = ({ data, isSimpleDisplay, onChangeQuantity, onRemove, authentication, readOnly }) => (
  <div className="cartItem-container">
  {
    !!data.product && <Card product={data.product} isSimpleDisplay={isSimpleDisplay} />
  } 
  {
    data.product ?
    <div className="cartItem-action">
      <div className="cartItem-quantity">
        {readOnly? <div className="product-amount"> {data.amount}</div> : <div><NumberSpin min={0} max={999} number={data.amount} onChange={onChangeQuantity} /></div> }
        {!!authentication && <div className="product-pv">{`${(data.product.pv * data.amount).toFixed(2)} PV`}</div>}
        {!!authentication && <div className="product-dp">{formatNumber(data.product.dp * data.amount)}</div>}
        <div className="product-cp">{formatNumber(data.product.cp * data.amount)}</div>

      </div>
      {!readOnly && <div className="cartItem-remove">
        <label onClick={onRemove}>xóa</label>
      </div>
      }
    </div> : <div className="product-not-found"> Có {data.amount} Sản phẩm không tìm thấy ở danh sách hiện tại hoặc link tạo ra đã cũ, vui lòng cập nhật sản phẩm ở app hoặc web </div>
  }
    

  </div>
)

CartItem.propTypes = {
  product: PropTypes.object,
}

CartItem.defaultProps = {
  product: {},
}

export default CartItem
