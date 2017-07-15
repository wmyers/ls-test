import React, {Component} from 'react';
import styles from './app.css';

import Counters from '../counters/counters.module'

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Counters />
      </div>
    );
  }
}

export default App;