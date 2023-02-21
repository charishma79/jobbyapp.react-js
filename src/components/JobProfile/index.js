import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiCall = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobProfile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiCall.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiCall.inProgress})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const responseData = data.profile_details
      const updatedData = {
        name: responseData.name,
        profileImageUrl: responseData.profile_image_url,
        shortBio: responseData.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiCall.success,
      })
    } else {
      this.setState({apiStatus: apiCall.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        className="on-retry-btn"
        type="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderProfileView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileViewContainer = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiCall.success:
        return this.renderProfileView()
      case apiCall.inProgress:
        return this.renderLoaderProfileView()
      case apiCall.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div> {this.renderProfileViewContainer()}</div>
  }
}
export default JobProfile
