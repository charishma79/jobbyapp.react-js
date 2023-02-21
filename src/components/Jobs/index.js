import {Component} from 'react'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import './index.css'

import Header from '../Header'
import JobFiltersItem from '../JobFiltersItem'
import JobCard from '../JobCard'
import JobProfile from '../JobProfile'

const apiCallStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiCallStatus.initial,
    employmentList: [],
    salaryRange: 0,
    jobsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiCallStatus.inProgress})
    const {employmentList, salaryRange, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentList.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    console.log(url)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const jobData = data.jobs
      console.log(data)
      const updatedJobData = jobData.map(eachJob => ({
        id: eachJob.id,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
      }))
      console.log(updatedJobData)
      this.setState({
        jobsList: updatedJobData,
        apiStatus: apiCallStatus.success,
      })
    } else {
      this.setState({apiStatus: apiCallStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  enterKey = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeEmploymentType = type => {
    this.setState(
      prevState => ({
        employmentList: [...prevState.employmentList, type],
      }),
      this.getJobDetails,
    )
  }

  changeSalaryRange = salary => {
    this.setState({salaryRange: salary}, this.getJobDetails)
  }

  renderLoadingView = () => (
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

  renderJobPageFailureView = () => (
    <div className="job-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>

      <button className="retry-btn" type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderNoJobView = () => (
    <div className="no-job-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-img"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-job-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobPageSuccessView = () => {
    const {jobsList, searchInput} = this.state
    const jobsDisplay = jobsList.length > 0
    return jobsDisplay ? (
      <div className="search-container">
        <div className="input-container">
          <input
            type="search"
            value={searchInput}
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.enterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-details-container">
          {jobsList.map(eachDetail => (
            <JobCard key={eachDetail.id} jobDetails={eachDetail} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="search-container">
        <div className="input-container">
          <input
            type="search"
            value={searchInput}
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.enterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderNoJobView()}
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiCallStatus.inProgress:
        return this.renderLoadingView()
      case apiCallStatus.failure:
        return this.renderJobPageFailureView()
      case apiCallStatus.success:
        return this.renderJobPageSuccessView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-search-container">
          <div className="search-input-container">
            <input
              type="search"
              value={searchInput}
              className="search-text"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.enterKey}
            />

            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.getJobDetails}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="profile-details-container">
            <div className="profile-container">
              <JobProfile />
            </div>
            <hr className="seperator" />
            <JobFiltersItem
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              searchInput={searchInput}
              onChangeSearchInput={this.onChangeSearchInput}
              getJobDetails={this.getJobDetails}
            />
          </div>
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}

export default Jobs
