import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import JobItemCard from '../JobItemCard'
import './index.css'

const apiCallStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiCallStatus.initial,
    jobDetailsDescription: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getSpecificJobDetails()
  }

  getSpecificJobDetails = async () => {
    this.setState({apiStatus: apiCallStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.job_details
      const similarData = data.similar_jobs
      const similarUpdatedData = similarData.map(eachDetail => ({
        id: eachDetail.id,
        title: eachDetail.title,
        companyLogoUrl: eachDetail.company_logo_url,
        employmentType: eachDetail.employment_type,
        jobDescription: eachDetail.job_description,
        location: eachDetail.location,
        rating: eachDetail.rating,
      }))
      const updatedJobDetailsData = {
        id: updatedData.id,
        title: updatedData.title,
        companyLogoUrl: updatedData.company_logo_url,
        employmentType: updatedData.employment_type,
        jobDescription: updatedData.job_description,
        companyWebsiteUrl: updatedData.company_website_url,
        lifeAtCompany: {
          description: updatedData.life_at_company.description,
          imageUrl: updatedData.life_at_company.image_url,
        },
        location: updatedData.location,
        packagePerAnnum: updatedData.package_per_annum,
        rating: updatedData.rating,
        skills: updatedData.skills.map(eachSkill => ({
          name: eachSkill.name,
          imageUrl: eachSkill.image_url,
        })),
      }

      this.setState({
        jobDetailsDescription: updatedJobDetailsData,
        similarJobsList: similarUpdatedData,
        apiStatus: apiCallStatus.success,
      })
    } else {
      this.setState({apiStatus: apiCallStatus.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobSuccessView = () => {
    const {jobDetailsDescription, similarJobsList} = this.state
    return (
      <>
        <JobItemCard
          jobItemDetailedList={jobDetailsDescription}
          similarJobDetailsList={similarJobsList}
        />
      </>
    )
  }

  renderJobFailureDescription = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <button
        className="retry-btn"
        type="button"
        onClick={this.getSpecificJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSpecificJobDetails = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiCallStatus.success:
        return this.renderJobSuccessView()
      case apiCallStatus.inProgress:
        return this.renderLoaderView()
      case apiCallStatus.failure:
        return this.renderJobFailureDescription()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-route-bg-container">
        <Header />
        {this.renderSpecificJobDetails()}
      </div>
    )
  }
}

export default JobItemDetails
