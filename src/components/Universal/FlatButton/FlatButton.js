import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    cursor: 'pointer',
  },
  fitParent: {
    height: '100%',
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    boxSizing: 'border-box'
  },
  darkTone: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)'
    }
  },
  lightTone: {
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)'
    }
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    transition: 'background-color .25s'
  }
}

class FlatButton extends Component {
  render () {
    const { classes, hoverTone, className, ...other } = this.props
    let hoverClass = ''
    if (hoverTone === 'light') {
      hoverClass = classes.lightTone    }
    else if (hoverTone === 'dark') {
      hoverClass = classes.darkTone
    }
    return (
      <div
        className={[classes.root, className].join(' ')}
        role="button"
        {...other}
      >
        <div className={classes.fitParent}>
          <div className={[classes.overlay, hoverClass].join(' ')}></div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

FlatButton.defaultProps = {
  onClick: () => {}
}

export default withStyles(styles)(FlatButton)
