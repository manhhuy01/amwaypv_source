import PropTypes from "prop-types"
import React from "react"

import { formatNumber } from '../services/commonFuncs'

const Card = ({ product, isSimpleDisplay }) => (
  <div className={isSimpleDisplay ? "card-container--simple" : "card-container"}  style={{ background: product.style.background }}>
    <div className="img-container"><img src={product.imageLink} alt={product.name} /></div>
    <div className="card-right-panel" style={{ background: product.style.background }}>
      <div className="card-info">
        <div className="product-info">
          <div className="product-name">{product.name}</div>
          <div className="product-description"> {product.description}</div>
        </div>
        <div className="product-detail">

          <div className="product-sku">SKU: {product.sku}</div>
          <div className="product-pv">{product.pv} PV</div>
          <div className="product-price">

            <div className="product-dp">{formatNumber(Number(product.dp))}</div>
            <div className="product-cp">{formatNumber(Number(product.cp))}</div>
          </div>
        </div>
      </div>
      <button className="card-button">{isSimpleDisplay ? 'Thêm' : 'Thêm vào giỏ hàng'}</button>
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
