import React from "react";
import ReactDOM from "react-dom";


/*
  This component is designed to provide consistent loading experiences.
  A big problem with spinners is that short loading times leads to flickering.
  This component provides an adjusted boolean isReady which will not be true
  until the minTime has elapsed.
 */
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minTimeElapsed: true
    };
  }

  clear() {
    return new Promise(resolve => {
      clearTimeout(this.minTimeTimeout);
      this.setState(
        {
          minTimeElapsed: false
        },
        resolve
      );
    });
  }

  start() {
    this.clear().then(() => {
      this.minTimeTimeout = setTimeout(() => {
        this.setState({
          minTimeElapsed: true
        });
      }, this.props.minTime);
    });
  }

  componentDidMount() {
    if (this.props.loading === true) {
      this.start();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading === true) {
        this.start();
      }
    }
  }

  render() {
    let isReady = this.state.minTimeElapsed && !this.props.loading;
    return this.props.children(isReady);
  }
}

Loading.defaultProps = {
  loading: false,
  minTime: 500
}

export default Loading
