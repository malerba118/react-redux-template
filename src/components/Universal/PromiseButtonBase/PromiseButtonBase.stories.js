import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { timeout } from 'utils/other'
import { PulseLoader } from 'react-spinners'

import PromiseButtonBase from './';

const handleAndReject = async () => {
  await timeout(3000)
  return Promise.reject()
}

const handleAndFulfill = async () => {
  await timeout(3000)
  return Promise.resolve()
}

const handleAndReturnUndefined = () => {
  return undefined
}

storiesOf('PromiseButtonBase', module)
  .add('Rejected API call', () => (
    <div className="children-center overlay">
      <PromiseButtonBase
        renderOnPending={() => <PulseLoader color="#FF6663" size={6} margin="4px"/>}
        renderOnRejected={() => <span>Rejected</span>}
        renderOnFulfilled={() => <span>Fulfilled</span>}
        onClick={handleAndReject}
      >
        Make API Call
      </PromiseButtonBase>
    </div>
  ))
  .add('Fulfilled API call', () => (
    <div className="children-center overlay">
      <PromiseButtonBase
        renderOnPending={() => <PulseLoader color="#FF6663" size={6} margin="4px"/>}
        renderOnRejected={() => <span>Rejected</span>}
        renderOnFulfilled={() => <span>Fulfilled</span>}
        onClick={handleAndFulfill}
      >
        Make API Call
      </PromiseButtonBase>
    </div>
  ))
  .add('No promise returned from onClick', () => (
    <div className="children-center overlay">
      <PromiseButtonBase
        renderOnPending={() => <PulseLoader color="#FF6663" size={6} margin="4px"/>}
        renderOnRejected={() => <span>Rejected</span>}
        renderOnFulfilled={() => <span>Fulfilled</span>}
        onClick={handleAndReturnUndefined}
      >
        Make API Call
      </PromiseButtonBase>
    </div>
  ))
  .add('Disable onClick on rejected', () => (
    <div className="children-center overlay">
      <PromiseButtonBase
        renderOnPending={() => <PulseLoader color="#FF6663" size={6} margin="4px"/>}
        renderOnRejected={() => <span>Rejected</span>}
        renderOnFulfilled={() => <span>Fulfilled</span>}
        disableOnRejected
        onClick={handleAndReject}
      >
        Make API Call
      </PromiseButtonBase>
    </div>
  ))
  .add('Disable onClick on fulfilled', () => (
    <div className="children-center overlay">
      <PromiseButtonBase
        renderOnPending={() => <PulseLoader color="#FF6663" size={6} margin="4px"/>}
        renderOnRejected={() => <span>Rejected</span>}
        renderOnFulfilled={() => <span>Fulfilled</span>}
        disableOnFulfilled
        onClick={handleAndFulfill}
      >
        Make API Call
      </PromiseButtonBase>
    </div>
  ))
