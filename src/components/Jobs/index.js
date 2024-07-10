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

const employeeLocationList = [
  {
    locationId: 'HYDERABAD',
    displayLocation: 'Hyderabad',
  },
  {
    locationId: 'CHENNAI',
    displayLocation: 'Chennai',
  },
  {
    locationId: 'BANGALORE',
    displayLocation: 'Bangalore',
  },
  {
    locationId: 'DELHI',
    displayLocation: 'Delhi',
  },
  {
    locationId: 'MUMBAI',
    displayLocation: 'Mumbai',
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
    employmentLocation: [],
    salaryRange: '',
    allJobs: [],
  }

  componentDidMount() {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    this.setState({apiStatus: apiStatusContainer.inProgress})
    const {
      searchInput,
      salaryRange,
      employmentType,
      employmentLocation,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}&location=${employmentLocation}`
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
          type="search"
          className="search-input"
          placeholder="search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button
          type="button"
          label="text"
          data-testid="searchButton"
          className="button-icon"
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
      <div className="no-job-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="noJobImg"
        />
        <h1 className="noJobHead">No Jobs Founds</h1>
        <p className="noJobPara">
          we could not find any jobs. Try Other filters.
        </p>
      </div>
    )
  }

  jobLoaderView = () => (
    <div className="loader-container loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => this.getAllJobs()

  jobsFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failureImg"
      />
      <h1 className="head">Oops! something Went Wrong</h1>
      <p className="para">We cannot seem to find page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
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

  onSelectEmploymentType = type => {
    const {employmentType} = this.state

    const inputNotInList = employmentType.filter(eachItem => eachItem === type)
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, type],
        }),
        this.getJobs,
      )
    } else {
      const filteredData = employmentType.filter(eachItem => eachItem !== type)
      this.setState({employmentType: filteredData}, this.getJobs)
    }
  }

  onSelectEmploymentLocation = value => {
    const {employmentLocation} = this.state

    const inputNotInLocation = employmentLocation.filter(
      eachLocted => eachLocted === value,
    )
    if (inputNotInLocation === 0) {
      this.setState(prevState => ({
        employmentLocation: [...prevState.employmentLocation, value],
      }))
    } else {
      const updateLocation = employmentLocation.filter(
        eachLocation => eachLocation !== value,
      )
      this.setState({employmentLocation: updateLocation}, this.getAllJobs)
    }
  }

  render() {
    const {salaryRange} = this.state
    return (
      <div className="job-container">
        <Headers />
        <div className="job-container-items">
          <div className="profile-container">
            <ProfilePicture />
            <hr className="hr-line" />
            <FilterGroups
              salaryRange={salaryRange}
              salaryRangesList={salaryRangesList}
              selectSalaryRange={this.onSelectSalaryRange}
              employmentTypesList={employmentTypesList}
              selectEmploymentType={this.onSelectEmploymentType}
              employeeLocationList={employeeLocationList}
              selectEmploymentLocation={this.onSelectEmploymentLocation}
            />
          </div>
          <div className="job-search-container">
            {this.renderSearchBar()}
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
