import React from "react"
import { navigate } from "gatsby"

import debounce from 'lodash.debounce'

// import lozad from 'lozad'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toggleDarkMode } from '../containers/products/actions'

import Layout from "../components/layout"
import SEO from "../components/seo"
import IconCart from '../components/iconCart'
import IconDisplay from '../components/iconDisplay'
import IconHamburger from '../components/iconHamburger'
import Card from '../components/card'
import Sidebar from '../components/sidebar'
import Modal from '../components/modal'
import Loading from '../components/loading'

import { getProducts, addProductToCart } from '../containers/products/actions'
import { switchDisplay, pageProductLoaded, updateCategory } from '../containers/layout/actions'
import { logout } from '../containers/user/actions'

import { searchString } from '../services/commonFuncs'

import { CATEGORIES } from '../containers/products/constants'


class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.onSearch = debounce(this.search, 300)
    this.state = {
      products: [],
      isOpenModal: false,
      isHidden: false,
      category: props.category,
    }
    this.value = ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products.length !== this.props.products.length) {
      this.setState({
        products: [...nextProps.products]
      })
    }
    if(nextProps.category !== this.props.category){
      this.setState({category: nextProps.category}, this.search)
    }
  }

  componentWillMount() {
    this.props.pageProductLoaded();
    // if (!this.props.products.length) {
    //   this.props.getProducts();
    // }
    if (this.props.products.length && !this.state.products.length) {
      this.setState({
        products: [...this.props.products]
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const currentScrollY = window.scrollY;
    const { isHidden } = this
    if (currentScrollY > this.lastScrollY && this.lastScrollY > 0 && currentScrollY > 0) {
      document.getElementById('category').style.opacity = '0'
      this.isHidden = true
    } else if (isHidden) {
      this.isHidden = false
      document.getElementById('category').style.opacity = '1'
    }
    this.lastScrollY = currentScrollY;
  }

  search = () => {
    let value = this.value.trim()
    if (!value) {
      this.setState({
        products: [...this.props.products]
      })
      return;
    };

    let products = this.props.products.filter(product => searchString(value, product.name))
    this.setState({
      products: [...products]
    })
  }

  onChangeInput = (e) => {
    this.value = e.target.value;
    this.onSearch();
  }

  onItemProductCicked = (product) => {
    this.props.addProductToCart({ product })
  }

  openSidebar() {
    document.getElementById("sidebar").style.left = "0px";
    document.getElementById("sidebar-container").style.display = "unset";
  }

  closeSidebar() {
    document.getElementById("sidebar").style.left = "-250px";
    document.getElementById("sidebar-container").style.display = "none";
  }

  navigateToLogin = () => {
    navigate('/login')
  }

  logout = () => {
    this.props.logout();
  }

  onChangeCategory = (category) => {
    this.props.updateCategory(category)

  }

  render() {
    const { isLoading, isGrid, authentication } = this.props;
    const { products, isOpenModal } = this.state;


    const headerChildren = (
      <>
        <div className="header-menu">
          <div style={{ display: 'none' }}>
            <h1>
              Sản phẩm Amway
          </h1>

          </div>
          <div className="hamburger-menu">
            <IconHamburger onClick={this.openSidebar} />
          </div>
          <input type="password" style={{ display: 'none', position: 'absolute', left: '-999px' }} />
          <input
            className="input-search"
            placeholder="Tìm sản phẩm"
            onChange={this.onChangeInput}
            onFocus={(e) => { e.target.value = ''; this.onChangeInput({ target: { value: '' } }) }}
          />
          <div className="header-right">
            <IconDisplay onClick={this.props.switchDisplay} isGrid={!isGrid} />
            <IconCart amount={this.props.cartSelected.totalItem} onClick={() => navigate('/order')} />
          </div>
        </div>
        <div id="category" className="category">
          {
            CATEGORIES.map(item => <button key={item} onClick={this.onChangeCategory.bind(this, item)} className={`btn-group ${this.state.category === item ? 'active' : ''}`}>{item}</button>)
          }
        </div>
      </>
    )
    return (
      <Layout
        isGrid={isGrid}
        onChangeInput={this.onChangeInput}
        headerChildren={headerChildren}
      >
        {/* <button onClick={toggleDarkMode}>Click me</button> */}
        <SEO title="Sản phẩm Amway" keywords={[`Amway`, `Sản phẩm`]} products={products} />
        <Sidebar isShow={true}>
          <ul>
            {
              authentication ? <li onClick={this.logout}>Đăng xuất</li> : <li onClick={this.navigateToLogin}>Đăng nhập</li>
            }

          </ul>
        </Sidebar>
        <div className="product-body" >
        {
          isLoading ? <div> Đang tải sản phẩm...</div> :
            <div className={isGrid ? "product-container" : "product-container--simple"}>
              {
                products.map((product, index) =>
                  <Card
                    key={index}
                    product={product}
                    isSimpleDisplay={!isGrid}
                    onAddItemToCart={this.onItemProductCicked.bind(this, product)}
                    authentication={authentication}
                  />)
              }
            </div>
        }
        </div>
       
        <Modal isOpen={isOpenModal} onClose={() => this.setState({ isOpenModal: false })} title="Đăng nhập">
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

      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.productReducer.isDarkMode,
  products: state.productReducer.products,
  isLoading: state.productReducer.isLoading,
  isGrid: state.layoutReducer.isGrid,
  cartSelected: state.productReducer.cartSelected,
  authentication: state.userReducer.authentication,
  category: state.layoutReducer.category,
});

const mapDispatchToProps = dispatch => ({
  toggleDarkMode: bindActionCreators(toggleDarkMode, dispatch),
  getProducts: bindActionCreators(getProducts, dispatch),
  switchDisplay: bindActionCreators(switchDisplay, dispatch),
  pageProductLoaded: bindActionCreators(pageProductLoaded, dispatch),
  addProductToCart: bindActionCreators(addProductToCart, dispatch),
  logout: bindActionCreators(logout, dispatch),
  updateCategory: bindActionCreators(updateCategory, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
