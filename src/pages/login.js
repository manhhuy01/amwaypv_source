import React from "react"
import { navigate } from "gatsby"

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Modal from '../components/modal'
import Loading from '../components/loading'

import { login } from '../containers/user/actions'

class Login extends React.Component {
  

  componentWillMount(){
    if(this.props.authentication){
      navigate('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading && this.props.loading){
      this.stopLoading()
      if(nextProps.authentication){
        navigate('/')
      }else{
        alert("Đăng nhập thất bại")
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress)
  }

  loading() {
    document.getElementById("loading").style.visibility = "unset";
  }

  stopLoading() {
    document.getElementById("loading").style.visibility = "hidden";
  }

  login = () => {
    if (this.validated()) {
      this.loading()
      this.props.login({ ada: this.ada, pass: this.password })
    }
  }

  validated = () => {
    let rs = true;
    if(!this.ada){
      alert('ADA không được bỏ trống')
      return false;
    }
    if(this.ada.length !== 7){
      alert('ADA định dạng sai')
      return false;
    }
    if(!this.password){
      alert('Password không được bỏ trống')
      return false;
    }
    if(this.password.length !== 8){
      alert('Password định dạng sai')
      return false;
    }
    return rs;
  }

  onKeyPress = (e) => {
    if(e.keyCode === 13){
      this.login()
    }
  }

  render() {
    if(this.props.authentication) return <div></div>
    return (
      <div>
        <Modal isOpen={true} onClose={() => this.setState({ isOpenModal: false })} title="Đăng nhập">
          <div className="form-input">
            <label>ADA:</label>
            <input type="text" name="username" onChange={(e) => this.ada = e.target.value.trim()} />
          </div>
          <div className="form-input">
            <label>Password: </label>
            <input type="password" onChange={(e) => this.password = e.target.value.trim()} />
          </div>
          <div className="form-action">
            <button onClick={this.login}>Đăng nhập</button>
          </div>
        </Modal>
        <Loading />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.userReducer.loading,
  authentication: state.userReducer.authentication,
});

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
