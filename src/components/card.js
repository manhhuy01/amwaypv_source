import PropTypes from "prop-types"
import React from "react"

const Card = ({ product }) => (
  <div className="card-container">
    <div className="img-container"><img className="lozad" data-src={product.imageLink} alt={product.name} /></div>
    <div className="card-right-panel">
      <div className="card-info">
        <div> {product.sku}</div>
        <div className="product-name">{product.name}</div>
        <div> {product.description}</div>
        <div>
          <div>{product.pv}</div>
          <div>{product.dp}</div>
          <div>{product.cp}</div>
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
