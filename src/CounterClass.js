import React, { Component } from 'react';

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if (storage) return JSON.parse(storage);
  return { count: 0 };
}

function storageInLocalStorage() {
  localStorage.setItem('counterState', JSON.stringify(this.state))
  console.log('after! ', this.state.count)
  document.title = `${this.state.count}`;
}

const decrement = (state, props) => {
  const { count } = state;
  const { step } = props;
  return { count: count - step }
};

document.title = 'Hello';

class CounterClass extends Component {
  constructor(props) {
    super(props);
    // this.state = { count: 3 };
    this.state = getStateFromLocalStorage();
    this.increment = this.increment.bind(this);
  }

  increment() {
    console.log(this.state.count); // print 3, because setState() is Asynchronous
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // print 3, because setState() is Asynchronous
    // this.setState({ count: this.state.count + 3 }, storageInLocalStorage.bind(this));
    this.setState({ count: this.state.count + 3 }, storageInLocalStorage); // Like in object merge, there's duplicate keys, the last one wins
    console.log(this.state.count); // print 3, because setState() is Asynchronous // Queuing upstate changes
    /*
      when this function finish, count will be 6, because react:
      1. will batch them up, (merge)
      2. figure out the result (calculate)
      3. efficiently make that change.
    */
  }

  decrement = () => {

    console.log(this.state.count); // print 3, because setState() is Asynchronous
    this.setState((state) => { return { count: state.count - 1 } });
    console.log(this.state.count); // print 3, because setState() is Asynchronous
    this.setState((state) => { return { count: state.count - 2 } });
    console.log(this.state.count); // print 3, because setState() is Asynchronous
    // this.setState(({ count }, { step }) => { return { count: count - step } });
    /*
    this.setState(decrement, () => { // the second argument is a callback, to be executed after state has been updated
      localStorage.setItem('counterState', JSON.stringify(this.state))
      console.log('after! ', this.state.count)
    });
    */
    this.setState(decrement, storageInLocalStorage)

    /*
    this.setState((state, props) => {
      const { count } = state;
      const { step } = props;
      return { count: count - step }
    });
    */
    console.log('Before! ', this.state.count); // print 3, because setState() is Asynchronous
    /*
      when this function finish, count will be -6, because functions dont will be batching (merged)
    */
  }

  /* But i think this.state.count dont change inside a functions is more because for scope,
  because i send a function using this.state.count, only will works the last */

  reset = () => {
    // this.setState({ count: 0 });
    this.setState(({ count }) => {
      // add conditionals
      // if (count <= 0) return { count: count};
      if (count <= 0) return; // this works, because when return udefined not update the state
      return { count: 0 }
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(`Count didMount: ${this.state.count}`) // will print the last number, because is a reference
    }, 3000);
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">CounterClass: {count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default CounterClass;