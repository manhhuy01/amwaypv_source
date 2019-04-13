import React from "react"


class NumberSpin extends React.Component {
  onChange = (delta) => {
    const { number, min, max, onChange } = this.props
    let newNumber = number + delta
    if (newNumber >= min && newNumber <= max) {
      onChange(delta)
    }
  }
  render() {
    const { number } = this.props
    return (
      <div className="input-group">
        <span className="input-group-btn input-group-btn--down"><button onClick={this.onChange.bind(this, -1)}>-</button></span>
        <div className="input-group-number">{number}</div>
        <span className="input-group-btn input-group-btn--up"><button onClick={this.onChange.bind(this, 1)}>+</button></span>
      </div>
    )
  }
}

export default NumberSpin
