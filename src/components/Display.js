const Display = ({ getEmployees }) => {
  return (
    <div className="employees">
      <button className="btn" onClick={getEmployees}>
        Show Employees
      </button>
    </div>
  )
}

export default Display
