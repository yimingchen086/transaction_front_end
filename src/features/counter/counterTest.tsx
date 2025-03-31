import React, { useReducer } from 'react';

// 定義計數器的狀態類型
interface CounterState {
  count: number;
}

// 定義可用的動作類型
type CounterAction =
  | { type: 'increment'; payload?: number }
  | { type: 'decrement'; payload?: number }
  | { type: 'reset' };

// 初始狀態
const initialState: CounterState = {
  count: 0,
};

// Reducer 函數
const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.payload || 1) };
    case 'decrement':
      return { count: state.count - (action.payload || 1) };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
};

const Counter: React.FC = () => {
  // 明確指定 useReducer 的類型
  const [state, dispatch] = useReducer<typeof counterReducer>(
    counterReducer,
    initialState
  );

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment', payload: 1 })}>
        +1
      </button>
      <button onClick={() => dispatch({ type: 'decrement', payload: 1 })}>
        -1
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};

export default Counter;
