import './index.css'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="item-link">
      <li className="job-list-item">
        <div className="job-detail-list">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-image"
          />
          <div className="company-details">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating} </p>
            </div>
          </div>
        </div>
        <div className="location-details">
          <div className="place-container">
            <div className="location-list">
              <MdLocationOn className="location-icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="location-list">
              <BsBriefcaseFill className="brief-icon" />
              <p className="brief-text">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separate-line" />
        <h1 className="job-description">Description</h1>
        <p className="text-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
