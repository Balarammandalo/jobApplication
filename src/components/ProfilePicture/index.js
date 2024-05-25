import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfilePicture extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    profileDetails: [],
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const newProfileData = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstant.success,
        profileDetails: newProfileData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImgUrl, shortBio} = profileDetails
    return (
      <div className="profile-success-container">
        <img src={profileImgUrl} alt="company logo" className="profileImg" />
        <h1 className="profile-head">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  renderProfileLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => this.getProfile()

  renderProfileFailure = () => (
    <button type="button" className="retry-buton" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderProfileLoader()
      case apiStatusConstant.success:
        return this.renderProfileSuccess()
      case apiStatusConstant.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-container">{this.renderProfileDetails()}</div>
    )
  }
}

export default ProfilePicture
