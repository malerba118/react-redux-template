import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './FadeOut.scss'

const FadeOut = (props) => (
  <CSSTransitionGroup
    className="react-transition-group-fade-out"
    transitionName="fade-out"
    transitionEnterTimeout={0}
    transitionLeaveTimeout={350}
  >
    {props.children}
  </CSSTransitionGroup>
);

export default FadeOut
