import React, {Component} from 'react';
import styles from './app.css';

import ControlBar from '../controlBar/controlBar.module';
import Counters from '../counters/counters.module';

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <ControlBar />
        <Counters />
      </div>
    );
  }
}

export default App;