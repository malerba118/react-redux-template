import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import initStore from 'store/initStore'
import PromiseButtonBase from './PromiseButtonBase'
import { mount, shallow, render } from 'enzyme'
import { timeout } from 'utils/other'

const onClick= jest.fn()
const onClickPending = jest.fn().mockReturnValue(timeout(50000))
const onClickResolved = jest.fn().mockReturnValue(Promise.resolve())
const onClickRejected = jest.fn().mockReturnValue(Promise.reject())
const renderOnPending = () => <div className="pending"/>
const renderOnFulfilled = () => <div className="fulfilled"/>
const renderOnRejected = () => <div className="rejected"/>

describe('PromiseButtonBase', () => {
  it('should show children before onClick', () => {
    const component = mount(
      <PromiseButtonBase
        renderOnPending={renderOnPending}
        renderOnFulfilled={renderOnFulfilled}
        renderOnRejected={renderOnRejected}
        onClick={onClick}
      >
       <div className="before-click"/>
      </PromiseButtonBase>
    )
    expect(component.find('.before-click').length).toEqual(1);
  })
  it('should show renderOnFulfilled when onClick resolved', () => {
    const component = mount(
      <PromiseButtonBase
        renderOnPending={renderOnPending}
        renderOnFulfilled={renderOnFulfilled}
        renderOnRejected={renderOnRejected}
        onClick={onClickResolved}
      >
       <div className="before-click"/>
      </PromiseButtonBase>
    )
    component.find('PromiseButtonBase').simulate('click')
    return Promise.resolve().then(() => {
      component.update()
      expect(component.find('.rejected').length).toEqual(0);
      expect(component.find('.fulfilled').length).toEqual(1);
      expect(component.find('.pending').length).toEqual(0);
    })
  })
  it('should show renderOnRejected when onClick rejected', () => {
    const component = mount(
      <PromiseButtonBase
        renderOnPending={renderOnPending}
        renderOnFulfilled={renderOnFulfilled}
        renderOnRejected={renderOnRejected}
        onClick={onClickRejected}
      >
       <div className="before-click"/>
      </PromiseButtonBase>
    )
    component.find('PromiseButtonBase').simulate('click')
    return timeout(1000).then(() => {
      component.update()
      expect(component.find('.rejected').length).toEqual(1);
      expect(component.find('.fulfilled').length).toEqual(0);
      expect(component.find('.pending').length).toEqual(0);
    })
  })
  it('should show renderOnPending when onClick pending', () => {
    const component = mount(
      <PromiseButtonBase
        renderOnPending={renderOnPending}
        renderOnFulfilled={renderOnFulfilled}
        renderOnRejected={renderOnRejected}
        onClick={onClickPending}
      >
       <div className="before-click"/>
      </PromiseButtonBase>
    )
    component.find('PromiseButtonBase').simulate('click')
    return timeout(1000).then(() => {
      component.update()
      expect(component.find('.rejected').length).toEqual(0);
      expect(component.find('.fulfilled').length).toEqual(0);
      expect(component.find('.pending').length).toEqual(1);
    })
  })
});
