import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Axios from 'axios'
import '../App.css'

const useStyles = makeStyles((theme) => ({
  logoStyle: {
    margin: '15px 0',
  },

  buttonStyle: {
    margin: '5px 0',
    width: '100%',
  },

  regStyle: {
    [theme.breakpoints.up('md')]: {
      margin: '5px 0',
      float: 'left',
      padding: 0,
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: 'unset',
    },
  },
  box: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
}))

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [loginStatus, setLoginStatus] = useState('')

  let history = useHistory()
  const classes = useStyles()

  Axios.defaults.withCredentials = true

  const login = (e) => {
    e.preventDefault()
    Axios.post('https://mysql-employee-system.herokuapp.com/login', {
      username: usernameLogin,
      password: passwordLogin,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        history.push('/system')
      }
    })
  }

  const register = () => {
    history.push('/register')
  }

  return (
    <div className="login">
      <div className="art">
        <img
          alt="beach"
          src="https://images.unsplash.com/photo-1444044205806-38f3ed106c10?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
      </div>

      <div className="login-container">
        <div className="login-content">
          <Typography className={classes.logoStyle} variant="h2">
            EMPLOYEE SYSTEM
          </Typography>

          <h2 className="wrong">{loginStatus}</h2>

          <form
            onSubmit={(e) => {
              login(e)
            }}
          >
            <TextField
              className={classes.buttonStyle}
              id="outlined-basic user-login"
              label="Username"
              variant="outlined"
              type="text"
              onChange={(e) => {
                setUsernameLogin(e.target.value)
              }}
            />
            <TextField
              className={classes.buttonStyle}
              id="outlined-basic passw-login"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => {
                setPasswordLogin(e.target.value)
              }}
            />

            <Button
              type="submit"
              className={classes.buttonStyle}
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>

          <Box className={classes.box} component="span" m={1}>
            <Button
              className={classes.regStyle}
              color="primary"
              onClick={register}
            >
              Register
            </Button>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Login
