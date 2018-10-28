import React from "react";
import ReactDOM from "react-dom";
import Img from 'react-image'
import { FadeIn } from 'components/Universal/Transitions'

import styles from './Image.module.css'

/*

*/
class Image extends React.Component {

  render() {
    const {
      style,
      className,
      zoomOnHover,
      ...other
    } = this.props
    return (
      <Img
        {...other}
        container={children => {
          return (
            <div
              className={[
                styles.imgContainer,
                zoomOnHover ? styles.zoomImgOnHover : '',
                this.props.className || ''
              ].join(' ')}
              style={this.props.style}
            >
              {children.type === 'div' && (
                // A bit of a hack, this 'div' value
                // comes from the loader prop below
                <div className={styles.loader}></div>
              )}
              {children.type === 'img' && (
                <FadeIn>
                  {children}
                </FadeIn>
              )}
            </div>
          )
        }}
        loader={<div></div>}
      />
    )
  }
}

Image.defaultProps = {

}

export default Image
