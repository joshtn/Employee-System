const InputField = () => {
  return (
    <div className="information">
      <label>Name: </label>
      <input type="text" />

      <label>Age: </label>
      <input type="number" />

      <label>Country: </label>
      <input type="text" />

      <label>Position: </label>
      <input type="text" />

      <label>Wage (year): </label>
      <input type="number" />
      <button>Add Employee</button>
    </div>
  )
}

export default InputField
