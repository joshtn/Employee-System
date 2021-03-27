import { useEffect, useState } from 'react'
import { Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom'

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
  typoStyle: {
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      fontSize: '2rem',
    },
  },
}))

const System = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)

  const [newWage, setNewWage] = useState(0)
  const [employeeList, setEmployeeList] = useState([])
  const [loginStatus, setLoginStatus] = useState('')

  const [loggedOut, setLoggedOut] = useState(false)

  let history = useHistory()
  const classes = useStyles()
  Axios.defaults.withCredentials = true

  const addEmployee = () => {
    if (
      name === '' ||
      age === '' ||
      country === '' ||
      position === '' ||
      wage === ''
    ) {
      alert('Cannot have empty fields.')
      return
    }
    Axios.post('https://mysql-employee-system.herokuapp.com/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      Array.from(document.querySelectorAll('input')).forEach(
        (input) => (input.value = '')
      )
      alert('Employee Added.')
      getEmployees()
    })
  }

  const getEmployees = () => {
    Axios.get('https://mysql-employee-system.herokuapp.com/employees').then(
      (response) => {
        setEmployeeList(response.data)
      }
    )
  }

  const updateEmployeeWage = (id) => {
    Axios.put('https://mysql-employee-system.herokuapp.com/update', {
      wage: newWage,
      id: id,
    }).then((response) => {
      getEmployees()
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(
      `https://mysql-employee-system.herokuapp.com/delete/${id}`
    ).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id
        })
      )
    })
  }

  const logout = () => {
    // console.log('logout')
    // Axios.get('https://mysql-employee-system.herokuapp.com/logout').then(
    //   (response) => {
    //     if (response.data.loggedIn === false) {
    //       setLoggedOut(true)
    //     } else {
    //       console.log('not logged in')
    //     }
    //   }
    // )
    setLoggedOut(true)
  }

  // useEffect(() => {
  //   console.log('useeffect b4')
  //   Axios.get('https://mysql-employee-system.herokuapp.com/login').then(
  //     (response) => {
  //       console.log('useeffect resp')
  //       if (response.data.loggedIn === true) {
  //         console.log('useeffect inside inside')
  //         setLoginStatus(response.data.user[0].username)
  //       }
  //       // else {
  //       //   console.log('please log in first!')
  //       //   history.push('/')
  //       // }
  //     }
  //   )
  // })

  if (loggedOut) {
    return <Redirect to="/" push={true} />
  }

  return (
    <>
      <div className="information">
        <Button
          className={classes.logoutStyle}
          variant="outlined"
          color="secondary"
          onClick={logout}
        >
          Log out{' '}
        </Button>
        <Typography className={classes.typoStyle} variant="h2">
          Welcome!
        </Typography>
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
          label="Age"
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
            <div className="employeeList" key={key}>
              <div>
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
    </>
  )
}

export default System
