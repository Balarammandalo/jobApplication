import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import Headers from '../Headers'
import SimilarJobItem from '../SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skills: fetchedData.job_details.skills,
        lifeAtCompany: fetchedData.job_details.life_at_company,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      const updatedSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updatedData,
        similarJobsData: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  onRetryButton = () => {
    this.getJobData()
  }

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        className="job-details-failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-details-failure-view-error">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-view-message">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-section-failure-retry-btn"
        onClick={this.onRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobsData} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="job-details-success-view">
        <div className="job-details-container">
          <div className="job-details-company-log-role-container">
            <img
              className="job-details-company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="job-details-role-container">
              <h1 className="job-details-role-title">{title}</h1>
              <div className="job-details-rating-container">
                <AiFillStar className="job-details-star-icon" />
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-other-details-container">
            <div className="job-details-location-and-type-container">
              <div className="job-details-location-container">
                <MdLocationOn className="job-details-location-icon" />
                <p className="job-details-location">{location}</p>
              </div>
              <div className="job-details-type-container">
                <BsBriefcaseFill className="job-details-type-icon" />
                <p className="job-details-type">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-package">{packagePerAnnum}</p>
          </div>
          <hr width="100%" />
          <div className="job-details-description-container">
            <div className="job-details-heading-and-link-container">
              <h1 className="job-details-description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="visit-link">
                Visit
                <BiLinkExternal />
              </a>
            </div>
            <p className="job-details-description">{jobDescription}</p>
          </div>
          <div className="job-details-skills-container">
            <h1 className="job-details-description-heading">Skills</h1>
            <ul className="job-details-skills-items-container">
              {skills.map(eachSkill => (
                <li key={eachSkill.name} className="skill-item">
                  <img
                    className="skill-img"
                    src={eachSkill.image_url}
                    alt={eachSkill.name}
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="job-details-life-at-company-container">
            <h1 className="job-details-description-heading">Life at Company</h1>
            <p className="job-details-description">
              {lifeAtCompany.description}
            </p>
            <img
              width="100%"
              height="400px"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              key={eachSimilarJob.id}
              jobDetails={eachSimilarJob}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails

// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'
// import {AiFillStar} from 'react-icons/ai'
// import {MdLocationOn} from 'react-icons/md'
// import {BsBriefcaseFill} from 'react-icons/bs'
// import {BiLinkExternal} from 'react-icons/bi'

// import Headers from '../Headers'
// import './index.css'
// const apiStatusContainer = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class JobsItemDetails extends Component {
//   state = {
//     similarJobs: [],
//     apiStatus: apiStatusContainer.initial,
//     jobDetails: {},
//   }

//   componentDidMount() {
//     this.getJobData()
//   }

//   getJobData = async () => {
//     const {match} = this.props
//     const {params} = match
//     const {id} = params

//     this.setState({
//       apiStatus: apiStatusConstants.inProgress,
//     })

//     const jwtToken = Cookies.get('jwt_token')
//     const apiUrl = `https://apis.ccbp.in/jobs/${id}`
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }

//     const response = await fetch(apiUrl, options)
//     if (response.ok === true) {
//       const fetchedData = await response.json()
//       console.log(fetchedData)

//       const updatedData = {
//         companyLogoUrl: fetchedData.job_details.company_logo_url,
//         companyWebsiteUrl: fetchedData.job_details.company_website_url,
//         employmentType: fetchedData.job_details.employment_type,
//         id: fetchedData.job_details.id,
//         jobDescription: fetchedData.job_details.job_description,
//         skills: fetchedData.job_details.skills,
//         lifeAtCompany: fetchedData.job_details.life_at_company,
//         location: fetchedData.job_details.location,
//         packagePerAnnum: fetchedData.job_details.package_per_annum,
//         rating: fetchedData.job_details.rating,
//         title: fetchedData.job_details.title,
//       }

//       const updatedSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
//         companyLogoUrl: eachJob.company_logo_url,
//         employmentType: eachJob.employment_type,
//         id: eachJob.id,
//         jobDescription: eachJob.job_description,
//         location: eachJob.location,
//         rating: eachJob.rating,
//         title: eachJob.title,
//       }))

//       this.setState({
//         jobDetails: updatedData,
//         similarJobsData: updatedSimilarJobs,
//         apiStatus: apiStatusContainer.success,
//       })
//     } else {
//       this.setState({
//         apiStatus: apiStatusContainer.failure,
//       })
//     }
//   }

//   renderJobSuccessView = () => {
//     const {jobDetails, similarJobs} = this.state
//     const {
//       companyLogoUrl,
//       employmentType,
//       companyWebsiteUrl,
//       id,
//       jobDescription,
//       skills,
//       location,
//       packagePerAnnum,
//       rating,
//       title,
//       lifeAtCompany,
//     } = jobDetails
//     return (
//       <div className='job-details-success-view'>
//         <div className='job-details-container'>
//           <div className='job-details-company-log-role-container'>
//             <img
//               className='job-details-company-logo'
//               src={companyLogoUrl}
//               alt='job details company logo'
//             />
//             <div className='job-details-role-container'>
//               <h1 className='job-details-role-title'>{title}</h1>
//               <div className='job-details-rating-container'>
//                 <AiFillStar className='job-details-star-icon' />
//                 <p className='job-details-rating'>{rating}</p>
//               </div>
//             </div>
//           </div>
//           <div className='job-details-other-details-container'>
//             <div className='job-details-location-and-type-container'>
//               <div className='job-details-location-container'>
//                 <MdLocationOn className='job-details-location-icon' />
//                 <p className='job-details-location'>{location}</p>
//               </div>
//               <div className='job-details-type-container'>
//                 <BsBriefcaseFill className='job-details-type-icon' />
//                 <p className='job-details-type'>{employmentType}</p>
//               </div>
//             </div>
//             <p className='job-details-package'>{packagePerAnnum}</p>
//           </div>
//           <hr width='100%' />
//           <div className='job-details-description-container'>
//             <div className='job-details-heading-and-link-container'>
//               <h1 className='job-details-description-heading'>Description</h1>
//               <a href={companyWebsiteUrl} className='visit-link'>
//                 Visit
//                 <BiLinkExternal />
//               </a>
//             </div>
//             <p className='job-details-description'>{jobDescription}</p>
//           </div>
//           <div className='job-details-skills-container'>
//             <h1 className='job-details-description-heading'>Skills</h1>
//             <ul className='job-details-skills-items-container'>
//               {skills.map(eachSkill => (
//                 <li key={eachSkill.name} className='skill-item'>
//                   <img
//                     className='skill-img'
//                     src={eachSkill.image_url}
//                     alt={eachSkill.name}
//                   />
//                   <p className='skill-name'>{eachSkill.name}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className='job-details-life-at-company-container'>
//             <h1 className='job-details-description-heading'>Life at Company</h1>
//             <div className='job-details-life-at-company'>
//               <p className='life-at-company-paragraph'>
//                 {lifeAtCompany.description}
//               </p>
//               <img
//                 width='100%'
//                 height='400px'
//                 src={lifeAtCompany.image_url}
//                 alt='life at company'
//                 className='life-at-img'
//               />
//             </div>
//           </div>
//         </div>
//         <div className='jobs-similar'>
//           <h1 className='job-details-description-heading'>Similar Jobs</h1>
//           <ul className='similar-jobs-list'>
//             {similarJobs.map(eachJobs => (
//               <SimilarJobItem key={eachJobs.id} jobDetails={eachJobs} />
//             ))}
//           </ul>
//         </div>
//       </div>
//     )
//   }

//   renderJobLoadingView = () => (
//     <div className='job-details-loader-container' data-testid='loader'>
//       <Loader type='ThreeDots' color='#ffffff' height={50} width={50} />
//     </div>
//   )

//   onRetryButton = () => {}

//   renderJobFailureView = () => (
//     <div className='job-details-failure-view-container'>
//       <img
//         className='job-details-failure-view-image'
//         src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
//         alt='failure view'
//       />
//       <h1 className='job-details-failure-view-error'>
//         Oops! Something Went Wrong
//       </h1>
//       <p className='job-details-failure-view-message'>
//         We cannot seem to find the page you are looking for.
//       </p>
//       <button
//         type='button'
//         className='retry-button'
//         onClick={this.onRetryButton}
//       >
//         Retry
//       </button>
//     </div>
//   )

//   renderJobsDetails = () => {
//     const {apiStatus} = this.state
//     switch (apiStatus) {
//       case apiStatusContainer.inProgress:
//         return this.renderJobLoadingView()
//       case apiStatusContainer.failure:
//         return this.renderJobFailureView()
//       case apiStatusContainer.success:
//         return this.renderJobSuccessView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <>
//         <Headers />
//         <div className='jobs-details-container'>{this.renderJobsDetails()}</div>
//       </>
//     )
//   }
// }
// export default JobsItemDetails

// if (response.ok) {
//       const newJobUpdate = {
// companyLogoUrl: fetchedData.job_details.company_logo_url,
// companyWebsiteUrl: fetchedData.job_details.company_website_url,
// employmentType: fetchedData.job_details.employment_type,
// id: fetchedData.job_details.id,
// jobDescription: fetchedData.job_details.job_description,
// skills: fetchedData.job_details.skills,
// location: fetchedData.job_details.location,
// packagePerAnnum: fetchedData.job_details.package_per_annum,
// rating: fetchedData.job_details.rating,
// title: fetchedData.job_details.title,
// lifeAtCompany: fetchedData.job_details.life_at_company,
//       }

// const updateSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
//   companyLogoUrl: eachJob.company_logo_url,
//   employmentType: eachJob.employment_type,
//   id: eachJob.id,
//   jobDescription: eachJob.job_description,
//   location: eachJob.location,
//   rating: eachJob.rating,
//   title: eachJob.title,
// }))

//       this.setState({
//         similarJobs: updateSimilarJobs,
//         jobDetails: newJobUpdate,
//         apiStatus: apiStatusContainer.success,
//       })
//     }

// data.job_details.map(eachJobs => ({
//   companyLogoUrl: eachJobs.company_logo_url,
//   companyWebsiteUrl: eachJobs.company_website_url,
//   employmentType: eachJobs.employment_type,
//   id: eachJobs.id,
//   jobDescription: eachJobs.job_description,
//   skills: eachJobs.skills,
//   location: eachJobs.location,
//   packagePerAnnum: eachJobs.package_per_annum,
//   rating: eachJobs.rating,
//   title: eachJobs.title,
//   lifeAtCompany: eachJobs.life_at_company,
// }))

// companyLogoUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png',
//       companyWebsiteUrl: 'https://about.netflix.com/en',
//       employmentType: 'Internship',
//       id: 'bb95e51b-b1b2-4d97-bee4-1d5ec2b96751',
//       jobDescription:
//         'We are looking for a DevOps Engineer with a minimum of 5 years of industry experience, preferably working in the financial IT community. The position in the team is focused on delivering exceptional services to both BU and Dev',
//       skills: [
//         {
//           image_url:
//             'https://assets.ccbp.in/frontend/react-js/jobby-app/docker-img.png',
//           name: 'Docker',
//         },
//       ],
//       lifeAtCompany: {
//         description:
//           'Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.',
//         image_url:
//           'https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png',
//       },
//       location: 'Delhi',
//       packagePerAnnum: '10 LPA',
//       rating: 4,

// {
//       companyLogoUrl:
//         'https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png',
//       employmentType: 'Freelance',
//       id: '2b40029d-e5a5-48cc-84a6-b6e12d25625d',
//       jobDescription:
//         'The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.',
//       location: 'Delhi',
//       rating: 4,
//       title: 'Frontend Engineer',
//     },
