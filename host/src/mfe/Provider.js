import { createContext, useReducer } from "react";
const initMFEState = [];

const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REMOTE": {
      const existScope = state.find(
        (item) => item?.scope === action.payload?.scope
      );

      if (existScope) {
        return state.map((item) => {
          if (item?.scope === action.payload?.scope) {
            return {...item, ...action.payload};
          }
          return item;
        });
      }
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export const MFEContext = createContext(initMFEState);

export const MEFProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initMFEState);

  return (
    <MFEContext.Provider value={[state, dispatch]}>
      {children}
    </MFEContext.Provider>
  );
};
