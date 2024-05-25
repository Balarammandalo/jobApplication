import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSearch} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Headers from '../Headers'
import JobItem from '../JobItem'
import ProfilePicture from '../ProfilePicture'
import FilterGroups from '../FilterGroups'

import './index.css'

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

const apiStatusContainer = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusContainer.success,
    employmentType: [],
    salaryRange: '',
    allJobs: [],
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusContainer.inProgress})
    const {searchInput, salaryRange, employmentType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const newUpdateData = data.jobs.map(eachJobs => ({
        id: eachJobs.id,
        companyLogoUrl: eachJobs.company_logo_url,
        employmentType: eachJobs.employment_type,
        jobDescription: eachJobs.job_description,
        location: eachJobs.location,
        packagePerAnnum: eachJobs.package_per_annum,
        rating: eachJobs.rating,
        title: eachJobs.title,
      }))
      this.setState({
        apiStatus: apiStatusContainer.success,
        allJobs: newUpdateData,
      })
    } else {
      this.setState({apiStatus: apiStatusContainer.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => this.getAllJobs()

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div>
        <input
          type='search'
          className='search-input'
          placeholder='search'
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button
          type='button'
          data-testid='searchButton'
          className='button-icon'
          onClick={this.onClickSearchIcon}
        >
          <MdSearch />
        </button>
      </div>
    )
  }

  jobSuccessView = () => {
    const {allJobs} = this.state
    const jobLength = allJobs.length > 0

    return jobLength ? (
      <div>
        <ul>
          {allJobs.map(eachJob => (
            <JobItem jobItems={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className='no-job-container'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'
          alt='no jobs'
          className='noJobImg'
        />
        <h1 className='noJobHead'>No Jobs Founds</h1>
        <p className='noJobPara'>
          we could not find any jobs. Try Other filters.
        </p>
      </div>
    )
  }

  jobLoaderView = () => (
    <div className='loader-container loader' data-testid='loader'>
      <Loader type='ThreeDots' color='#ffffff' height='50' width='50' />
    </div>
  )

  onClickRetry = () => this.getAllJobs()

  jobsFailureView = () => (
    <div className='failure-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png '
        alt='failure view'
        className='failureImg'
      />
      <h1 className='head'>Oops! something Went Wrong</h1>
      <p className='para'>We cannot seem to find page you are looking for.</p>
      <button
        type='button'
        className='retry-button'
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContainer.inProgress:
        return this.jobLoaderView()
      case apiStatusContainer.success:
        return this.jobSuccessView()
      case apiStatusContainer.failure:
        return this.jobsFailureView()
      default:
        return null
    }
  }

  onSelectSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getAllJobs)
  }

  selectEmploymentType = event => {
    const {value, checked} = event.target
    const {employmentType} = this.state
    if (checked) {
      this.setState(prevState => ({
        employmentType: [...prevState.employmentType, value],
      })),
        this.getAllJobs
    } else {
      const updateType = employmentType.filter(eachType => eachType !== value)
      this.setState({employmentType: updateType}, this.getAllJobs)
    }
  }

  render() {
    const {employmentType, salaryRange} = this.state
    return (
      <div className='job-container'>
        <Headers />
        <div className='job-container-items'>
          <div className='profile-container'>
            <ProfilePicture />
            <hr className='hr-line' />
            <FilterGroups
              salaryRange={salaryRange}
              employmentType={employmentType}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              selectEmploymentType={this.onSelectEmploymentType}
              selectSalaryRange={this.onSelectSalaryRange}
            />
          </div>
          <div className='job-search-container'>
            {this.renderSearchBar()}
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
