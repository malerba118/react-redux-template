import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { timeout } from 'utils/other'
import { PulseLoader } from 'react-spinners'
import { configureController } from 'stories/utils'
import Loading from './'

const handleAndFulfill = async () => {
  await timeout(3000)
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
