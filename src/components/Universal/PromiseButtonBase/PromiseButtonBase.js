import React from "react";
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button'


/*
  This is a nifty component that allows you to build promise buttons.
  It's a standard material ui Button that expects a promise to be returned
  from the onClick handler. It provide render props to show different button
  content during the different promise states. It also allows you to short-circuit
  the button during the different promise states.

  Example Usage:

  class PromiseButton extends React.Component {

    render() {
      const {
        children,
        ...other
      } = this.props
      return (
          <PromiseButtonBase
            {...other}
            renderOnPending={() => (
              <PulseLoader size={6} margin="4px"/>
            )}
            renderOnFulfilled={() => children}
            renderOnRejected={() => children}
          >
            {children}
          </PromiseButtonBase>
      )
    }
  }
*/
class PromiseButtonBase extends React.Component {

  state = {
    promiseState: 'before'
  }

  componentWillUnmount() {
    delete this.currentPromise
  }

  onClick = (e) => {
    if (this.state.promiseState === 'pending' && this.props.disableOnPending) {
      return
    }
    if (this.state.promiseState === 'fulfilled' && this.props.disableOnFulfilled) {
      return
    }
    if (this.state.promiseState === 'rejected' && this.props.disableOnRejected) {
      return
    }
    let promise = this.props.onClick(e)
    this.currentPromise = promise
    if (!promise || !typeof promise.then === 'function') {
      return //not a promise
    }
    this.setState({
      promiseState: 'pending'
    })
    promise
      .then(() => {
        if (promise !== this.currentPromise) {
          return //promise has changed
        }
        this.setState({
          promiseState: 'fulfilled'
        })
      })
      .catch(() => {
        if (promise !== this.currentPromise) {
          return //promise has changed
        }
        this.setState({
          promiseState: 'rejected'
        })
      })
  }

  render() {
    const {
      renderOnPending,
      renderOnFulfilled,
      renderOnRejected,
      disableOnPending,
      disableOnFulfilled,
      disableOnRejected,
      ...other
    } = this.props
    return (
      <Button {...other} onClick={this.onClick}>
        {this.state.promiseState === 'before' && this.props.children}
        {this.state.promiseState === 'pending' && this.props.renderOnPending()}
        {this.state.promiseState === 'fulfilled' && this.props.renderOnFulfilled()}
        {this.state.promiseState === 'rejected' && this.props.renderOnRejected()}
      </Button>
    )
  }
}

PromiseButtonBase.defaultProps = {
  renderOnPending: () => {},
  renderOnFulfilled: () => {},
  renderOnRejected: () => {},
  disableOnPending: true,
  disableOnFulfilled: false,
  disableOnRejected: false,
}

export default PromiseButtonBase
