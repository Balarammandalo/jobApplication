import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobItems} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItems
  return (
    <li className="li-container">
      <Link to={`jobs/${id}`} className="link-items">
        <div className="company-logo-title-rating">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="jobItemHeading">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="location-salary-items">
            <div className="location-container">
              <MdLocationOn className="location" />
              <p>{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill className="location" />
              <p>{employmentType}</p>
            </div>
          </div>
          <p className="package-para">{packagePerAnnum}</p>
        </div>
        <hr />
        <p className="job-item-des-heading">Description</p>
        <p className="job-item-des">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
