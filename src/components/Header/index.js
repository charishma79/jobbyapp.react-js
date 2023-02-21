import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div className="logo-items-container">
        <ul className="nav-list-container">
          <Link to="/" className="nav-link">
            <li className="nav-list-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-list-item">Jobs</li>
          </Link>
        </ul>
      </div>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
      <div className="logo-items-container-sm">
        <ul className="nav-list-header">
          <Link to="/" className="nav-link">
            <li className="list-item-sm">
              <AiFillHome className="icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="list-item-sm">
              <BsFillBriefcaseFill className="icon" />
            </li>
          </Link>
          <button className="logout-icon" type="button" onClick={onClickLogout}>
            <FiLogOut className="icon" />
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
