import * as React from "react";
import logo from '../../logo.svg';
import Counters from '../../components/Counter/Counter';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { counterActions } from './actions';

export interface Props {
  children?: React.ReactNode;
}

const Counter =  (Props:Props) => {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state: any) => state.counter);

  const increment = (): void => {
    dispatch(counterActions.increment());
  };
  const decrement = (): void => {
    dispatch(counterActions.decrement());
  };
  const incrementAsync = (): void => {
    dispatch(counterActions.incrementAsync());
  };
  const decrementAsync = (): void => {
    dispatch(counterActions.decrementAsync());
  };
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Counters
        onIncrement={increment}
        onDecrement={decrement}
        onIncrementAsync={incrementAsync}
        onDecrementAsync={decrementAsync}
        value={value}
      />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  )
}
export default Counter