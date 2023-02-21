import './index.css'

const JobFiltersItem = props => {
  const renderEmploymentsList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(employment => {
      const {changeEmploymentType} = props
      const changeEmployType = event => changeEmploymentType(event.target.value)

      return (
        <li
          key={employment.employmentTypeId}
          className="list-item"
          onClick={changeEmployType}
        >
          <input
            type="checkbox"
            id={employment.employmentTypeId}
            className="checkbox"
            value={employment.employmentTypeId}
          />
          <label htmlFor={employment.employmentTypeId} className="text-label">
            {employment.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div>
      <h1 className="employment-type">Type of Employment</h1>
      <ul className="filters-group-container">{renderEmploymentsList()}</ul>
    </div>
  )

  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {changeSalaryRange} = props
      const changeSalaryId = () => changeSalaryRange(salary.salaryRangeId)

      return (
        <li
          key={salary.salaryRangeId}
          className="list-item"
          onClick={changeSalaryId}
        >
          <input
            type="radio"
            id={salary.salaryRangeId}
            className="radiobox"
            value={salary.employmentTypeId}
          />
          <label htmlFor={salary.salaryRangeId} className="text-label">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalariesList = () => (
    <div>
      <h1 className="employment-type">Salary Range</h1>
      <ul className="filters-group-container">{renderSalaryRange()}</ul>
    </div>
  )

  return (
    <>
      {renderEmploymentType()}
      <hr className="seperator" />
      {renderSalariesList()}
    </>
  )
}

export default JobFiltersItem
