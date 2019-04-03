import React from "react"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { updateProducts } from '../containers/products/actions'

const ManhhuyPage = ({ updateProducts, isUpdateSuccess, isUpdating }) => (
    <div>
        <button onClick={() => updateProducts()}>Update Product</button>
        {
            !!isUpdateSuccess && <div>Update successful</div>
        }
        {
            !!isUpdating && <div>Updating...</div>
        }
    </div>
)

const mapStateToProps = state => ({
    isUpdating: state.productReducer.isUpdating,
    isUpdateSuccess: state.productReducer.isUpdateSuccess,

});

const mapDispatchToProps = dispatch => ({
    updateProducts: bindActionCreators(updateProducts, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ManhhuyPage)
