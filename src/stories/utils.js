import React from 'react'

// Don't want config to be updateable which is
// why this is a component creator function
// This let's us create function as child components
// with transitionable state.
// config expects structure:
// {
//   [prop]: {
//     initialValue: any,
//     transitions: [{
//       nextValue: any,
//       duration: milliseconds
//     }]
//   }
// }
export const configureController = (config) => {
  return class extends React.Component {

    constructor(props) {
      super(props)
      this.state = {}
      Object.keys(config).forEach(prop => {
        this.state[prop] = config[prop].initialValue
        this.transition(prop, 0)
      })
    }

    componentDidMount() {
      this._ismounted = true
    }

    componentWillUnmount() {
       this._ismounted = false
    }

    transition (prop, index) {
      let nextTransition = config[prop].transitions && config[prop].transitions[index]
      if (nextTransition && nextTransition.duration !== undefined) {
        setTimeout(
          () => {
            if (!this._ismounted) {
              return
            }
            this.setState(
              {
                [prop]: nextTransition.nextValue
              },
              () => {
                this.transition(prop, index+1)
              }
            )
          },
          nextTransition.duration
        )
      }
    }

    render() {
      return this.props.children(this.state)
    }
  }
}
