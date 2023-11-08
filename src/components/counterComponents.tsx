// CounterComponent.js
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../store/Reducers/actionReaducers';

const CounterComponent = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: any) => state.counter.count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default CounterComponent;