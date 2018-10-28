import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

import './FadeIn.scss'

const FadeIn = (props) => (
  <CSSTransitionGroup
    className="react-transition-group-fade-in"
    transitionName="fade-in"
    transitionAppear={true}
    transitionEnter={false}
    transitionLeave={false}
    transitionAppearTimeout={350}
  >
    {props.children}
  </CSSTransitionGroup>
);

export default FadeIn
