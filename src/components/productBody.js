import PropTypes from "prop-types"
import React from "react"
import Card from './card'


const ProductBody = ({ products, isGrid }) => (
  <div className={isGrid ? "product-container" : "product-container--simple"}>
    {
      products.map((product, index) => <Card key={index} product={product} isSimpleDisplay={!isGrid} />)
    }
  </div>
)

ProductBody.propTypes = {
  product: PropTypes.object,
}

ProductBody.defaultProps = {
  products: [],
}

export default ProductBody
