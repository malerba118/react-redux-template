import React, { Component } from 'react'

import styles from './Forbidden.module.css'

class Forbidden extends Component {

  render() {
    return (
      <div className={styles.pageContainer}>
        <span>Forbidden</span>
      </div>
    )
  }
}

export default Forbidden
