import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  actions as apiActions,
  selectors as apiSelectors
} from 'store/api'
import { EntitySnapshot } from 'store/db'
import { selectors as sessionSelectors } from 'store/other/session'
import { Redirect } from 'react-router-dom'
import { Grid, TextField, Button } from '@material-ui/core'


class LoginPage extends Component {

  state = {
    email: '',
    password: ''
  }

  onInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  logIn = () => {
    return this.props.logIn(
      this.state.email,
      this.state.password
    )
  }

  render() {
    if (this.props.session !== null) {
      return <Redirect to="/"/>
    }
    return (
      <div style={{height: '100vh'}} >
        <Grid style={{height: '100%'}} container justify="center" alignItems="center">
          <Grid item xs={12}>
            <form>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <TextField
                    id="standard-password-input"
                    label="Email"
                    type="email"
                    margin="normal"
                    value={this.state.email}
                    onChange={(e) => this.onInputChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    margin="normal"
                    value={this.state.password}
                    onChange={(e) => this.onInputChange('password', e.target.password)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={this.logIn}>Log In</Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    session: sessionSelectors.getSession(state)
  }
}

const mapDispatchToProps = {
  logIn: apiActions.logIn,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
