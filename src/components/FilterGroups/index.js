import './index.css'

const FilterGroups = props => {
  const {
    salaryRange,
    salaryRangesList,
    employmentTypesList,
    selectSalaryRange,
    selectEmploymentType,

    employeeLocationList,
    selectEmploymentLocation,
  } = props

  const onSelectEmploymentType = event => {
    selectEmploymentType(event.target.value)
  }

  const renderTypeOfEmployment = () => (
    <div className="employment-type-container">
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachEmploy => (
          <li key={eachEmploy.employmentTypeId} className="employment-list">
            <input
              id={eachEmploy.employmentTypeId}
              type="checkbox"
              value={eachEmploy.employmentTypeId}
              onChange={onSelectEmploymentType}
            />
            <label
              htmlFor={eachEmploy.employmentTypeId}
              className="filter-input-label"
            >
              {eachEmploy.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="employment-type-container">
      <h1 className="employment-heading salary">Salary Range</h1>
      <ul className="employment-list-container">
        {salaryRangesList.map(eachSalary => (
          <li key={eachSalary.salaryRangeId} className="employment-list">
            <input
              id={eachSalary.salaryRangeId}
              type="radio"
              value={eachSalary.salaryRangeId}
              onChange={selectSalaryRange}
              checked={salaryRange === eachSalary.salaryRangeId}
            />
            <label
              htmlFor={eachSalary.salaryRangeId}
              className="filter-input-label"
            >
              {eachSalary.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const onSelectEmploymentLocation = event => {
    selectEmploymentLocation(event.target.value)
  }

  const renderLocationBased = () => (
    <div className="employment-type-container">
      <h1 className="employment-heading">Location</h1>
      <ul className="employment-list-container">
        {employeeLocationList.map(eachEmploy => (
          <li key={eachEmploy.locationId} className="employment-list">
            <input
              id={eachEmploy.locationId}
              type="checkbox"
              value={eachEmploy.locationId}
              onChange={onSelectEmploymentLocation}
            />
            <label
              htmlFor={eachEmploy.locationId}
              className="filter-input-label"
            >
              {eachEmploy.displayLocation}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div>
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
      <hr />
      {renderLocationBased()}
    </div>
  )
}

export default FilterGroups
