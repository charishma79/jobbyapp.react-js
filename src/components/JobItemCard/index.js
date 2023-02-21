import './index.css'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import SimilarJobCard from '../SimilarJobCard'

const JobItemCard = props => {
  const {jobItemDetailedList, similarJobDetailsList} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    companyWebsiteUrl,
    jobDescription,
    skills,
    lifeAtCompany,
  } = jobItemDetailedList
  const {description, imageUrl} = lifeAtCompany
  return (
    <>
      <div className="job-item-card">
        <div className="job-detail-list">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="link-container">
          <h1 className="job-text">Description</h1>
          <div className="visit-link">
            <a href={companyWebsiteUrl} className="website-url">
              Visit
            </a>
            <BiLinkExternal className="link-icon" />
          </div>
        </div>
        <p className="description-text">{jobDescription}</p>
        <h1 className="skills-text">Skills</h1>
        <ul className="skills-container">
          {skills.map(eachSkillItem => (
            <li className="skills-list" key={eachSkillItem.name}>
              <img
                src={eachSkillItem.imageUrl}
                className="skill-image"
                alt={eachSkillItem.name}
              />
              <p className="skill-name">{eachSkillItem.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="skills-text">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="company-text">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="company-life-image"
          />
        </div>
      </div>
      <div className="similar-job-container">
        <h1 className="similar-text">Similar Jobs</h1>
        <ul className="skill-jobs-container">
          {similarJobDetailsList.map(eachSimilarJob => (
            <SimilarJobCard
              key={eachSimilarJob.id}
              similarDetails={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default JobItemCard
