import React from "react"


class NumberSpin extends React.Component {
  render() {
    const { number, min, max, onChange } = this.props
    return (
      <div className="input-group">
        <span className="input-group-btn input-group-btn--down"><button>-</button></span>
        <div className="input-group-number">{number}</div>
        <span className="input-group-btn input-group-btn--up"><button>+</button></span>
      </div>
    )
  }
}

export default NumberSpin
