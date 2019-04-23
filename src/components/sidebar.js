import React from 'react'


class Sidebar extends React.Component {

  componentDidMount() {
    let element = document.getElementById('sidebar-container')
    element.addEventListener('click', this.close)
  }
  open = () => {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("sidebar-container").style.display = "unset";
  }
  close = () => {
    document.getElementById("sidebar").style.left = "-250px";
    document.getElementById("sidebar-container").style.display = "none";
  }
  render() {
    return (
      <>
        <div id="sidebar-container" className="sidebar-container" />
        <div id="sidebar" className="sidebar">
          <div className="sidebar-close" onClick={this.close}>X</div>
          <div className="sidebar-user"></div>
          {
            this.props.children
          }
        </div>
      </>
    )
  }

}

export default Sidebar;
