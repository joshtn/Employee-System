import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

const Register = () => {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [regStatus, setRegStatus] = useState('')

  let history = useHistory()
  const classes = useStyles()

  const reg = () => {
    if (usernameReg === '' || passwordReg === '') {
      alert('Fields cannot be empty.')
      return
    }
    Axios.post('https://mysql-employee-system.herokuapp.com/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log('user registered')
      setRegStatus(response.data.messege)
    })
  }

  const goLogin = () => {
    history.push('/')
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

          <h2 className="register-status">{regStatus}</h2>

          <TextField
            className={classes.buttonStyle}
            id="outlined-basic user-reg"
            label="Username"
            variant="outlined"
            type="text"
            onChange={(e) => {
              setUsernameReg(e.target.value)
            }}
          />
          <TextField
            className={classes.buttonStyle}
            id="outlined-basic passw-reg"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPasswordReg(e.target.value)
            }}
          />

          <Button
            className={classes.buttonStyle}
            variant="contained"
            color="primary"
            onClick={reg}
          >
            Register
          </Button>

          <Box className={classes.box} component="span" m={1}>
            <Button
              className={classes.regStyle}
              color="primary"
              onClick={goLogin}
            >
              Login
            </Button>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Register
