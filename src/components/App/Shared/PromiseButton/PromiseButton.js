import React from "react";
import { PromiseButtonBase } from 'components/Universal'
import { PulseLoader } from 'react-spinners'

/*
  This component is in App/Shared as opposed to Universal because
  it depends on react-spinners and because it is aware of the app's
  primary color.
*/

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
            <PulseLoader color="#FF6663" size={6} margin="4px"/>
          )}
          renderOnFulfilled={() => children}
          renderOnRejected={() => children}
        >
          {children}
        </PromiseButtonBase>
    )
  }
}

export default PromiseButton
