import './index.css'

const FilterGroups = props => {
  const {
    salaryRange,
    employmentType,
    salaryRangesList,
    employmentTypesList,
    selectSalaryRange,
    selectEmploymentType,
  } = props

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
              checked={employmentType.includes(eachEmploy.employmentTypeId)}
              onChange={selectEmploymentType}
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

  return (
    <div>
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroups
