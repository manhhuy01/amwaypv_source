import React from 'react'

const IconSelectionCart = ({ number, onClick }) => <button onClick={onClick} className ="icon-selection">
    <div>
        {number}
    </div>
</button>

export default IconSelectionCart