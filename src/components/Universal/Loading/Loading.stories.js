import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import utils from 'services/utils'
import { PulseLoader } from 'react-spinners'
import { configureController } from 'stories/utils'
import Loading from './'


// class Controller extends React.Component {
//   state = {
//     loading: false
//   }
//
//   componentDidMount() {
//     this.setState({
//       loading: true
//     })
//     utils.timeout(this.props.loadingTime || 0)
//       .then(() => {
//         this.setState({
//           loading: false
//         })
//       })
//   }
//
//   render() {
//     return this.props.children(this.state.loading)
//   }
// }

const handleAndFulfill = async () => {
  await utils.timeout(3000)
  return Promise.resolve()
}

const handleAndReturnUndefined = () => {
  return undefined
}

storiesOf('Loading', module)
  .add('Loading time less than minTime', () => {
    const Controller = configureController({
      loading: {
        initialValue: true,
        transitions: [{
          nextValue: false,
          duration: 1000,
        }]
      }
    })
    return (
      <div className="children-center overlay">
        <div>
          <span>Loading time 1s, minTime 3s</span>
          <Controller>
            {({loading}) => (
              <Loading loading={loading} minTime={3000}>
                {(isReady) => {
                  if (!isReady) {
                    return (
                      <div>Not Ready</div>
                    )
                  }
                  else {
                    return (
                      <div>Ready</div>
                    )
                  }
                }}
              </Loading>
            )}
          </Controller>
        </div>
      </div>
    )
  })
  .add('Loading time greater than minTime', () => {
    const Controller = configureController({
      loading: {
        initialValue: true,
        transitions: [{
          nextValue: false,
          duration: 3000,
        }]
      }
    })
    return (
      <div className="children-center overlay">
        <div>
          <span>Loading time 3s, minTime 1s</span>
          <Controller>
            {({loading}) => (
              <Loading loading={loading} minTime={1000}>
                {(isReady) => {
                  if (!isReady) {
                    return (
                      <div>Not Ready</div>
                    )
                  }
                  else {
                    return (
                      <div>Ready</div>
                    )
                  }
                }}
              </Loading>
            )}
          </Controller>
        </div>
      </div>
    )
  })
  .add('No minTime', () => {
    const Controller = configureController({
      loading: {
        initialValue: true,
        transitions: [{
          nextValue: false,
          duration: 3000,
        }]
      }
    })
    return (
      <div className="children-center overlay">
        <div>
          <span>Loading time 3s, no minTime</span>
          <Controller>
            {({loading}) => (
              <Loading loading={loading}>
                {(isReady) => {
                  if (!isReady) {
                    return (
                      <div>Not Ready</div>
                    )
                  }
                  else {
                    return (
                      <div>Ready</div>
                    )
                  }
                }}
              </Loading>
            )}
          </Controller>
        </div>
      </div>
    )
  })
