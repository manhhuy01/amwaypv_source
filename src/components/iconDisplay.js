import React from 'react'
const IconDisplay = ({ isGrid, onClick }) => isGrid ? 
<button onClick={onClick}><svg fill="white" x="0px" y="0px" viewBox="0 0 28.617 28.617" size="20" height="20">
    <g>
    <rect x="0" y="1.645" width="28.617" height="6.402"/>
    <rect x="0" y="11.247" width="28.617" height="6.398"/>
    <rect x="0" y="20.572" width="28.617" height="6.4"/>
    </g>
</svg></button> : 
<button onClick={onClick} ><svg x="0px" y="0px" size="20" height="20" viewBox="0 0 27.709 27.709">
<g>
	<path fill = "white" d="M9.84,0.078h7.655V7.73H9.84V0.078z M9.84,9.918h7.655v7.652H9.84V9.918z M0,9.918h7.652v7.652H0
		V9.918z M0,0.078h7.652V7.73H0V0.078z M0.003,19.978h7.649v7.654H0.003V19.978z M9.843,19.978h7.652v7.654H9.843V19.978z
		 M20.054,0.078h7.655V7.73h-7.655V0.078z M20.054,9.918h7.655v7.652h-7.655V9.918z M20.054,19.978h7.655v7.654h-7.655V19.978z"/>
</g>
</svg></button>

export default IconDisplay;