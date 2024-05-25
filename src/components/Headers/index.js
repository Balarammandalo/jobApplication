import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-mobile-view-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-bar-website-logo"
            />
          </Link>
          <ul className="nav-mobile-button-container">
            <li className="nav-mobile-link-item">
              <Link to="/">
                <button type="button" className="nav-mobile-button">
                  <AiFillHome className="nav-mobile-image" />
                </button>
              </Link>
            </li>
            <li className="nav-mobile-link-item">
              <Link to="/jobs">
                <button type="button" className="nav-mobile-button">
                  <BsBriefcaseFill className="nav-mobile-image" />
                </button>
              </Link>
            </li>
            <li className="nav-mobile-link-item">
              <button
                type="button"
                onClick={onClickLogout}
                className="nav-mobile-button"
              >
                <FiLogOut className="nav-mobile-image" />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-desktop-view-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-bar-website-logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-menu-item">
              <button onClick={onClickLogout} className="logout-desktop-button">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
