import React from 'react'


const Loading = () => (
    <div id="loading" className="loading-container">
        <div className="loading-body">
            <svg
                width="50px"
                height="50px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <rect x="17.5" y="30" width="15" height="40" fill="#2a850d">
                    <animate attributeName="y" calcMode="spline" values="18;30;30" keyTimes="0;0.5;1" dur="1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s" repeatCount="indefinite"></animate>
                    <animate attributeName="height" calcMode="spline" values="64;40;40" keyTimes="0;0.5;1" dur="1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s" repeatCount="indefinite"></animate>
                </rect>
                <rect x="42.5" y="30" width="15" height="40" fill="#53bb29">
                    <animate attributeName="y" calcMode="spline" values="20.999999999999996;30;30" keyTimes="0;0.5;1" dur="1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s" repeatCount="indefinite"></animate>
                    <animate attributeName="height" calcMode="spline" values="58.00000000000001;40;40" keyTimes="0;0.5;1" dur="1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s" repeatCount="indefinite"></animate>
                </rect>
                <rect x="67.5" y="30" width="15" height="40" fill="#bbdfbd">
                    <animate attributeName="y" calcMode="spline" values="24;30;30" keyTimes="0;0.5;1" dur="1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" repeatCount="indefinite"></animate>
                    <animate attributeName="height" calcMode="spline" values="52;40;40" keyTimes="0;0.5;1" dur="1" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="0s" repeatCount="indefinite"></animate>
                </rect>
            </svg>
        </div>
    </div>
)

export default Loading;