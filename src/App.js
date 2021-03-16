import { useState } from 'react'
import { Button, ButtonGroup, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'
import Axios from 'axios'
import Display from './components/Display'

const useStyles = makeStyles((theme) => ({
  inputTextFieldStyle: {
    margin: '10px 0',
  },
  logoutStyle: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  deleteStyle: {
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: theme.spacing(2.5),
      right: theme.spacing(2.5),
    },
  },
  updateStyle: {
    [theme.breakpoints.up('md')]: {
      width: '30%',
    },
  },
}))

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)

  const [newWage, setNewWage] = useState(0)

  const [employeeList, setEmployeeList] = useState([])

  const classes = useStyles()

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log('success')
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ])
    })
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data)
    })
  }

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', { wage: newWage, id: id }).then(
      (response) => {
        getEmployees()
      }
    )
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id
        })
      )
    })
  }

  return (
    <div className="App">
      <div className="information">
        <Button
          className={classes.logoutStyle}
          variant="outlined"
          color="secondary"
        >
          Log out{' '}
        </Button>
        <Typography variant="h2">Welcome username</Typography>
        <TextField
          className={classes.inputTextFieldStyle}
          id="outlined-basic name"
          label="Name"
          variant="outlined"
          type="text"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />

        <TextField
          className={classes.inputTextFieldStyle}
          id="outlined-basic age"
          label="Number"
          variant="outlined"
          type="number"
          onChange={(e) => {
            setAge(e.target.value)
          }}
        />

        <TextField
          className={classes.inputTextFieldStyle}
          id="outlined-basic country"
          label="Country"
          variant="outlined"
          type="text"
          onChange={(e) => {
            setCountry(e.target.value)
          }}
        />

        <TextField
          className={classes.inputTextFieldStyle}
          id="outlined-basic position"
          label="Position"
          variant="outlined"
          type="text"
          onChange={(e) => {
            setPosition(e.target.value)
          }}
        />

        <TextField
          className={classes.inputTextFieldStyle}
          id="outlined-basic wage"
          label="Wage (year)"
          variant="outlined"
          type="number"
          onChange={(e) => {
            setWage(e.target.value)
          }}
        />
        <div className="addShowContainer">
          <Button variant="contained" onClick={addEmployee}>
            Add
          </Button>
          <Button variant="contained" onClick={getEmployees}>
            Show all
          </Button>
        </div>
      </div>
      <div className="employeeListContainer">
        {employeeList.map((val, key) => {
          return (
            <div className="employeeList">
              <div key={key}>
                <p>
                  <b>Name:</b> {val.name}
                </p>
                <p>
                  <b>Age:</b> {val.age}
                </p>
                <p>
                  <b>Country:</b> {val.country}
                </p>
                <p>
                  <b>Position:</b> {val.position}
                </p>
                <p>
                  <b>Wage:</b> {val.wage}
                </p>
              </div>
              <div className="updateDelete">
                <TextField
                  className={classes.updateStyle}
                  id="outlined-basic"
                  type="text"
                  label="New Wage"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setNewWage(e.target.value)
                  }}
                />
                <Button
                  className={classes.updateStyle}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    updateEmployeeWage(val.id)
                  }}
                >
                  Update
                </Button>
                <Button
                  className={classes.deleteStyle}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    deleteEmployee(val.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
