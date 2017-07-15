import React, {Component, PropTypes} from 'react';
import styles from './counters.css';
import {editCounter, deleteCounter} from '../../redux-store/selectors/timers';
import {getCounters} from '../../redux-store/modules/timers';

// NB normally this would be an SFC, with state controlled entirely on redux or a parent
// component. But you are using an editable text field to change state, which means you need
// to explicity override DOM state with react component state.
// https://facebook.github.io/react/docs/forms.html#controlled-components
class Counter extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired
    editCounter: PropTypes.func.isRequired
    deleteCounter: PropTypes.func.isRequired
  }

  // just in case you are wondering about this:
  // https://facebook.github.io/react/docs/react-without-es6.html#setting-the-initial-state
  constructor({value}) {
    this.state = {value};
  }
  
  handleChange(event) {
    const {
      id, 
      value, 
      editCounter
    } = this.props;

    // optimistically update locally
    this.setState({value: event.target.value});

    editCounter({
      id,
      value: event.target.value
    });
  }

  handleDelete(event) {
    const {
      id, 
      deleteCounter
    } = this.props;
    
    deleteCounter({id});
  }

  render() {
    const {
      id
    } =  this.props;

    return (
      <div className={styles.counter} >
        <label>
          {id}:
          <input type="number" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button name="deleteButton" type="button" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

// ----------------------------------

const mapStateToProps = (state) => {
  return {
    counters: getCounters(state)
  };
};

const mapDispatchToProps = {
  editCounter, 
  deleteCounter
}

// ----------------------------------

export class Counters extends Component {
  static propTypes = {
    counters: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className={styles.counters}>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counters);




