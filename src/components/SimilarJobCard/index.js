import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {similarDetails} = props
  const {
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    jobDescription,
  } = similarDetails
  return (
    <div className="similar-job-card">
      <div className="job-detail-list">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="description-para">{jobDescription}</p>
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
      </div>
    </div>
  )
}

export default SimilarJobCard
