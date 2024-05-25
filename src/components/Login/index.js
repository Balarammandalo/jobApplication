import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', submitError: false, errorMessage: ''}

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errMsg => {
    this.setState({submitError: true, errorMessage: errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const userDetails = {username: userName, password: passWord}
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, option)

    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  renderUserName = () => {
    const {userName} = this.state

    return (
      <div className="username-container">
        <label htmlFor="userName" className="username-label">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={this.onChangeUserName}
          className="user-name"
          placeholder="Username"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {passWord} = this.state
    return (
      <div className="password-container">
        <label htmlFor="passWord" className="password-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="passWord"
          value={passWord}
          onChange={this.onChangePassword}
          className="passWord"
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {submitError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-img"
          />
          <div>{this.renderUserName()}</div>
          <div>{this.renderPassword()}</div>

          <button type="submit" className="login-buton">
            Login
          </button>
          {submitError && <p className="error-msg">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
