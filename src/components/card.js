import PropTypes from "prop-types"
import React from "react"

import { formatNumber } from '../services/commonFuncs'

const Card = ({ product }) => (
  <div className="card-container">
    <div className="img-container"><img className="lozad" data-src={product.imageLink} alt={product.name} /></div>
    <div className="card-right-panel">
      <div className="card-info">
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-description"> {product.description}</div>
        </div>
        <div className="product-sku">SKU: {product.sku}</div>
        <div className="product-pv">{product.pv} PV</div>
        <div className="product-price">

          <div className="product-dp">{formatNumber(Number(product.dp))}</div>
          <div className="product-cp">{formatNumber(Number(product.cp))}</div>
        </div>
      </div>
      <button className="card-button">Thêm vào giỏ hàng</button>

    </div>
  </div>
)

Card.propTypes = {
  product: PropTypes.object,
}

Card.defaultProps = {
  product: {},
}

export default Card
