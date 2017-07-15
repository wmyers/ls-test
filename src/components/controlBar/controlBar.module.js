import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './controlBar.css';
import {addCounter} from '../../redux-store/modules/timers';
import {getCountersLog} from '../../redux-store/selectors/timers';

const mapStateToProps = (state) => {
  return {
    countersLog: getCountersLog(state)
  };
};

const mapDispatchToProps = {
  addCounter
};

// ----------------------------------

export class ControlBar extends Component {
  static propTypes = {
    countersLog: PropTypes.string.isRequired,
    addCounter: PropTypes.func.isRequired
  }

  handleAdd = () => {
    this.props.addCounter();
  }

  render() {
    return (
      <div className={styles.controlBar}>
        <button name="addButton" type="button" onClick={this.handleAdd}>Add new counter</button>
        <textarea name="countersLog" readOnly value={this.props.countersLog} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);