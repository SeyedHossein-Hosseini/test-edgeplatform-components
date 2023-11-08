import { INCREMENT, DECREMENT } from "./actionReaducers";

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
      };

    case DECREMENT:
      return {
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default counterReducer;
